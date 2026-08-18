import { io } from "socket.io-client";

const url = process.env.SOCKET_URL as string;

export const socket = io(url, {
  transports: ["websocket"],
  autoConnect: false,
});
