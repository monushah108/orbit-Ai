import { io } from "socket.io-client";

const url = process.env.NEXT_PUBLIC_SOCKET_URL as string;

export const socket = io(url, {
  transports: ["websocket"],
  autoConnect: false,
});
