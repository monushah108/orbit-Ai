import http from "http";
import SocketService from "./services/socket";

function init() {
  const socketService = new SocketService();
  const httpServer = http.createServer();

  const PORT = process.env.PORT ? process.env.PORT : 8000;

  socketService.io.attach(httpServer);

  const users = new Map();
  socketService.io.on("connection", (socket) => {
    socket.on("room:join", (roomId, user) => {
      users.set(socket.id, {
        user,
        roomId,
      });

      socket.join(roomId);

      const members = [...users.values()]
        .filter((m) => m.roomId == roomId)
        .map((m) => m.user);
      socket.to(roomId).emit("members", members);
    });

    socket.on("disconnect", () => {
      const member = users.get(socket.id);

      if (!member) return;

      users.delete(socket.id);

      const members = [...users.values()]
        .filter((m) => m.roomId === member.roomId)
        .map((m) => m.user);

      socket.to(member.roomId).emit("members", members);
    });
  });

  httpServer.listen(PORT, () => console.log("http server at port:8000"));
}

init();
