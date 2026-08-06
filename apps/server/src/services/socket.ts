import Groq from "groq-sdk";
import { Server } from "socket.io";

// import Redis from "ioredis";
// import { createAdapter } from "@socket.io/redis-adapter";

// const pub = new Redis(process.env.REDIS_URL!);
// const sub = pub.duplicate();
const groq = new Groq({
  apiKey: process.env.AI_API_KEY!,
});

class SocketService {
  private _io: Server;

  constructor() {
    this._io = new Server();
  }

  public initListeners() {
    const io = this.io;
    // io.adapter(createAdapter(pub, sub));
    const getDuration = (expiresAt: string) => {
      switch (expiresAt) {
        case "1m":
          return 1 * 60 * 1000;
        case "30m":
          return 30 * 60 * 1000; // 30 minutes
        case "1h":
          return 60 * 60 * 1000; // 1 hour
        case "6h":
          return 6 * 60 * 60 * 1000; // 6 hours
        default:
          return Infinity;
      }
    };

    const users = new Map();
    const rooms = new Map();
    io.on("connection", (socket) => {
      // ------ CREATE ROOM ------------- //
      socket.on("room:create", ({ roomId, user, duration, withBot }) => {
        rooms.set(roomId, {
          members: [user],
          adminId: user.id,
          duration,
          expiresAt: Date.now() + getDuration(duration),
          withBot,
        });
        console.log("create", rooms);

        users.set(socket.id, {
          user,
          roomId,
        });
        socket.join(roomId);
        io.to(roomId).emit("members", rooms.get(roomId).members);
        console.log("members", rooms.get(roomId).members);
        io.to(roomId).emit("room:created", {
          expiresAt: rooms.get(roomId).expiresAt,
        });
      });
      // ------ JOIN ROOM ------------- //

      socket.on("room:join", ({ roomId, user }) => {
        console.log(roomId, user);
        const room = rooms.get(roomId);
        console.log(rooms.get(roomId));

        if (!room) {
          console.log("server", rooms);
          socket.emit("room:not-found");
          return;
        }

        if (Date.now() >= room.expiresAt) {
          rooms.delete(roomId);
          socket.emit("room:not-found");
          return;
        }

        users.set(socket.id, {
          user,
          roomId,
        });

        rooms.get(roomId).members.push(user);

        socket.join(roomId);

        io.to(roomId).emit("members", rooms.get(roomId).members);

        io.to(roomId).emit("room:joined", rooms.get(roomId));
        console.log("members", rooms.get(roomId).members);
      });
      // ------ DESTORY ROOM ------------- //
      socket.on("room:destroy", ({ roomId }) => {
        const room = rooms.get(roomId);
        console.log(room);
        if (!room) return;

        for (const [socketId, user] of users) {
          if (user.roomId === roomId) {
            users.delete(socketId);
          }
        }

        rooms.delete(roomId);
        io.to(roomId).emit("room:expired");

        console.log(`${roomId} destroyed`);
      });
      // ------  ROOM EXPIRY INTERVAL ------------- //
      const time = setInterval(() => {
        const now = Date.now();

        for (const [roomId, room] of rooms) {
          if (now >= room.expiresAt) {
            rooms.delete(roomId);
            console.log("expired", rooms);
            io.to(roomId).emit("room:expired");
          }
        }
      }, 1000);

      // ------  USER LEFT ROOM ------------- //
      socket.on("room:leave", ({ roomId }) => {
        socket.leave(roomId);

        users.delete(socket.id);

        const members = [...users.values()]
          .filter((m) => m.roomId === roomId)
          .map((m) => m.user);

        io.to(roomId).emit("members", members);

        if (members.length === 0) {
          rooms.delete(roomId);
        }
      });
      // ------ TYPING ------------- //
      socket.on("typing", ({ roomId, user }) => {
        socket.to(roomId).emit("typing", { event: "typing", user });
      });

      socket.on("stop-typing", ({ roomId, user }) => {
        socket.to(roomId).emit("stop-typing", { event: "stop-typing", user });
      });

      // ------ MESSAGEING ------------- //
      socket.on("message", ({ roomId, message, user }) => {
        console.log("message ", { roomId, message, user });
        io.to(roomId).emit("message", {
          message,
          user,
        });
      });

      // ------ AI CHAT RESPONSE  ------------- //
      socket.on("ai:chat", async ({ roomId, message }) => {
        const stream = await groq.chat.completions.create({
          model: process.env.AI_MODEL!,
          messages: [
            {
              role: "user",
              content: message,
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
      });

      // -------- USER AWERENECE ------------- //

      socket.on("member:mute", ({ roomId, memberId, muted }) => {
        // update member
        console.log("mute", { roomId, memberId, muted });
        io.to(roomId).emit("member:mute", {
          memberId,
          muted,
        });
      });

      socket.on("member:deafen", ({ roomId, memberId, deafened }) => {
        console.log("deafened", { roomId, memberId, deafened });
        io.to(roomId).emit("member:deafen", {
          memberId,
          deafened,
        });
      });

      // -------------- SIGNALING MEDIASOUP ------------------ //
      socket.on("receiver", ({ roomId }) => {
        socket.to(roomId).emit("transport", {});
      });

      socket.on("disconnect", () => {
        const member = users.get(socket.id);

        if (!member) return;

        users.delete(socket.id);

        const members = [...users.values()]
          .filter((m) => m.roomId === member.roomId)
          .map((m) => m.user);

        io.to(member.roomId).emit("members", members);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
