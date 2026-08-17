import Groq from "groq-sdk";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import Redis from "ioredis";
import { getDuration, ORBIT_AI_INSTRUCTIONS } from "../helper";

const groq = new Groq({
  apiKey: process.env.AI_API_KEY!,
});

type User = {
  id: string;
  name: string;
  avatar?: string;
};

type Room = {
  roomId: string;
  adminId: string;
  members: User[];
  duration: string;
  expiresAt: number;
  withBot: boolean;
};

type UserSession = {
  user: User;
  roomId: string;
};

class SocketService {
  private _io: Server;
  private redisReady = false;
  private redisErrorLogged = false;
  private subscriberReady = false;
  private subscriberErrorLogged = false;
  private redis: Redis;
  private redisSubscriber: Redis;

  // Socket connection -> user information
  private users = new Map<string, UserSession>();

  constructor() {
    this._io = new Server({
      cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
      },
    });
    this.redis = new Redis(process.env.REDIS_URL!);

    this.redisSubscriber = this.redis.duplicate();

    this.redis.on("ready", () => {
      this.redisReady = true;

      if (this.redisErrorLogged) {
        console.log("Redis connection restored");
        this.redisErrorLogged = false;
      }
    });

    this.redis.on("error", (error) => {
      this.redisReady = false;

      if (!this.redisErrorLogged) {
        console.error("Redis connection lost:", error);
        this.redisErrorLogged = true;

        this.io.emit("server:error", {
          message: "Server connection lost. Reconnecting...",
        });
      }
    });

    this.redisSubscriber.on("ready", () => {
      this.subscriberReady = true;

      if (this.subscriberErrorLogged) {
        console.log("Redis subscriber connection restored");
        this.subscriberErrorLogged = false;
      }
    });

    this.redisSubscriber.on("error", (error) => {
      this.subscriberReady = false;

      if (!this.subscriberErrorLogged) {
        console.error("Redis subscriber connection lost:", error);
        this.subscriberErrorLogged = true;
      }
    });

    this.setupRedis();
  }

  private async setupRedis() {
    try {
      await this.redisSubscriber.psubscribe("__keyevent@0__:expired");

      this.redisSubscriber.on("pmessage", async (_pattern, _channel, key) => {
        await this.handleRedisExpiration(key);
      });

      console.log("Redis expiration listener started");
    } catch (error) {
      console.error("Redis subscription error:", error);
    }
  }

  private async handleRedisExpiration(key: string) {
    if (!key.startsWith("orbit:room:")) {
      return;
    }

    const roomId = key.replace("orbit:room:", "");

    console.log(`Room expired: ${roomId}`);

    // Remove users belonging to this room
    for (const [socketId, session] of this.users) {
      if (session.roomId === roomId) {
        this.users.delete(socketId);
      }
    }

    // Notify everyone in the Socket.IO room
    this.io.to(roomId).emit("room:expired");
  }

  public initListeners() {
    const io = this.io;

    // Socket.IO Redis adapter

    const pubClient = this.redis;
    const subClient = this.redisSubscriber;

    io.adapter(createAdapter(pubClient, subClient));

    io.on("connection", (socket) => {
      // --------------------------------
      // CREATE ROOM
      // --------------------------------

      socket.on("room:create", async ({ roomId, user, duration, withBot }) => {
        const existingSession = this.users.get(socket.id);

        if (existingSession?.roomId) {
          socket.emit("room:blocked", {
            roomId: existingSession.roomId,
            message: "You are already in a room. Leave it first.",
          });

          return;
        }

        try {
          const expiresIn = getDuration(duration);
          const expiresAt = Date.now() + expiresIn;

          const room: Room = {
            roomId,
            adminId: user.id,
            members: [user],
            duration,
            expiresAt,
            withBot,
          };

          const key = `orbit:room:${roomId}`;

          await this.redis.set(key, JSON.stringify(room), "PX", expiresIn);

          this.users.set(socket.id, {
            user,
            roomId,
          });

          socket.join(roomId);

          io.to(roomId).emit("members", room.members);

          io.to(roomId).emit("room:created", {
            expiresAt,
          });
        } catch (error) {
          socket.emit("room:error", {
            err: "Failed to create room",
          });
        }
      });

      // --------------------------------
      // JOIN ROOM
      // --------------------------------

      socket.on("room:join", async ({ roomId, user }) => {
        const existingSession = this.users.get(socket.id);

        if (existingSession?.roomId) {
          socket.emit("room:blocked", {
            roomId: existingSession.roomId,
            message: "You are already in a room. Leave it first.",
          });

          return;
        }

        const key = `orbit:room:${roomId}`;

        const roomData = await this.redis.get(key);

        if (!roomData) {
          socket.emit("room:failed", {
            err: "Room not found or expired",
          });

          return;
        }

        const room = JSON.parse(roomData);

        if (Date.now() >= room.expiresAt) {
          await this.redis.del(key);

          socket.emit("room:error", {
            err: "Room has already expired",
          });

          return;
        }

        // Prevent duplicate join
        const alreadyJoined = room.members.some(
          (member: User) => member.id === user.id,
        );

        if (!alreadyJoined) {
          room.members.push(user);
        }

        await this.redis.set(
          key,
          JSON.stringify(room),
          "PX",
          room.expiresAt - Date.now(),
        );

        this.users.set(socket.id, {
          user,
          roomId,
        });

        socket.join(roomId);

        // Update everyone
        io.to(roomId).emit("members", room.members);

        // Tell ONLY the joining socket
        socket.emit("room:joined", room);
      });

      // --------------------------------
      // DESTROY ROOM
      // --------------------------------

      socket.on("room:destroy", async ({ roomId }) => {
        try {
          const key = `orbit:room:${roomId}`;

          const roomData = await this.redis.get(key);

          if (!roomData) {
            return;
          }

          await this.redis.del(key);

          for (const [socketId, session] of this.users) {
            if (session.roomId === roomId) {
              this.users.delete(socketId);
            }
          }

          io.to(roomId).emit("room:expired");
        } catch (error) {
          socket.emit("room:error", {
            err: "failed to destory room",
          });
        }
      });

      // --------------------------------
      // CHECK ROOM
      // --------------------------------
      socket.on("room:check", async ({ roomId }) => {
        const exists = await this.redis.exists(`orbit:room:${roomId}`);

        if (!exists) {
          this.users.delete(socket.id);
          io.to(roomId).emit("room:expired");
          return;
        }

        socket.emit("room:still-active");
      });

      // --------------------------------
      // LEAVE ROOM
      // --------------------------------

      socket.on("room:leave", async ({ roomId }) => {
        try {
          const session = this.users.get(socket.id);

          socket.leave(roomId);

          this.users.delete(socket.id);

          const key = `orbit:room:${roomId}`;

          const roomData = await this.redis.get(key);

          if (!roomData) {
            return;
          }

          const room: Room = JSON.parse(roomData);

          if (session) {
            room.members = room.members.filter(
              (member) => member.id !== session.user.id,
            );
          }

          const ttl = room.expiresAt - Date.now();

          if (ttl > 0) {
            await this.redis.set(key, JSON.stringify(room), "PX", ttl);
          }

          this.io.to(roomId).emit("members", room.members);

          if (room.members.length === 0) {
            await this.redis.del(key);
          }
        } catch (error) {
          socket.emit("room:error", {
            err: "something went wrong !!",
          });
        }
      });
      // --------------------------------
      // TYPING
      // --------------------------------

      socket.on("typing", ({ roomId, user }) => {
        socket.to(roomId).emit("typing", {
          event: "typing",
          user,
        });
      });

      socket.on("stop-typing", ({ roomId, user }) => {
        socket.to(roomId).emit("stop-typing", {
          event: "stop-typing",
          user,
        });
      });

      // --------------------------------
      // MESSAGE
      // --------------------------------

      socket.on("message", ({ roomId, message, user }) => {
        io.to(roomId).emit("message", {
          message,
          user,
        });
      });

      // --------------------------------
      // AI CHAT
      // --------------------------------

      socket.on("ai:chat", async ({ roomId, message, user }) => {
        io.to(roomId).emit("ai:loading", true);

        try {
          const stream = await groq.chat.completions.create({
            model: process.env.AI_MODEL!,
            messages: [
              {
                role: "system",
                content: ORBIT_AI_INSTRUCTIONS,
              },
              {
                role: "user",
                content: `
The current message was sent by ${user.name}.

Message:
${message}
`,
              },
            ],
            stream: true,
          });

          for await (const chunk of stream) {
            const token = chunk.choices[0]?.delta?.content;

            if (token) {
              io.to(roomId).emit("ai:token", token);
            }
          }

          io.to(roomId).emit("ai:done");
        } catch (error) {
          io.to(roomId).emit("ai:error", {
            message: "Something went wrong while generating the response.",
          });
        } finally {
          io.to(roomId).emit("ai:loading", false);
        }
      });

      // --------------------------------
      // DISCONNECT
      // --------------------------------

      socket.on("disconnect", async () => {
        const session = this.users.get(socket.id);

        if (!session) {
          return;
        }

        const { roomId } = session;

        this.users.delete(socket.id);

        const key = `orbit:room:${roomId}`;

        const roomData = await this.redis.get(key);

        if (!roomData) {
          return;
        }

        const room: Room = JSON.parse(roomData);

        room.members = room.members.filter(
          (member) => member.id !== session.user.id,
        );

        const ttl = room.expiresAt - Date.now();

        if (ttl > 0) {
          await this.redis.set(key, JSON.stringify(room), "PX", ttl);
        }

        io.to(roomId).emit("members", room.members);

        if (room.members.length === 0) {
          await this.redis.del(key);
        }
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
