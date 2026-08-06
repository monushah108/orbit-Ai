import http from "http";
import SocketService from "./services/socket";
// import Redis from "ioredis";
// import { createAdapter } from "@socket.io/redis-adapter";

// const pub = new Redis(process.env.REDIS_URL!);
// const sub = pub.duplicate();

function init() {
  const io = new SocketService().io;
  const httpServer = http.createServer();

  const PORT = process.env.PORT ? process.env.PORT : 8000;

  // io.adapter(createAdapter(pub, sub));
  io.attach(httpServer);

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
      console.log("create", { roomId, user, duration, withBot });
      rooms.set(roomId, {
        members: [user],
        adminId: user.id,
        duration,
        expiresAt: Date.now() + getDuration(duration),
        withBot,
      });
      users.set(socket.id, {
        user,
        roomId,
      });
      socket.join(roomId);
      const members = [...users.values()]
        .filter((m) => m.roomId == roomId)
        .map((m) => m.user);
      io.to(roomId).emit("members", members);
      console.log("members", members);
      io.to(roomId).emit("room:created", {
        expiresAt: rooms.get(roomId).expiresAt,
      });
    });
    // ------ JOIN ROOM ------------- //
    socket.on("room:join", ({ roomId, user }) => {
      console.log(roomId, user);
      const room = rooms.get(roomId);
      console.log(room);

      if (!room) {
        console.log("server", room);
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

      const members = [...users.values()]
        .filter((m) => m.roomId == roomId)
        .map((m) => m.user);
      io.to(roomId).emit("members", members);

      io.to(roomId).emit("room:joined", {
        duration: rooms.get(roomId).duration,
        expiresAt: rooms.get(roomId).expiresAt,
      });
      console.log("members", members);
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

  httpServer.listen(PORT, () => console.log("http server at port:8000"));
}

init();

// TODO implement redis for creating user and room with ttl per rooms and for destory rooms
