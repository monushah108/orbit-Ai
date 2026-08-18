import "dotenv/config";
import http from "http";
import SocketService from "./services/socket";
import { Server } from "socket.io";

function init() {
  const httpServer = http.createServer((req, res) => {
    if (req.url === "/health" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: "ok",
          socket: "running",
          timestamp: new Date().toISOString(),
        }),
      );
      return;
    }

    res.writeHead(404);
    res.end();
  });

  const PORT = Number(process.env.PORT) || 8000;

  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  const socketService = new SocketService(io);

  socketService.initListeners();

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`HTTP + Socket.IO server running on port ${PORT}`);
  });
}

init();
