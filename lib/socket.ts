// lib/socket.ts

import { io } from "socket.io-client";

export const socket = io("http://localhost:4000", {
  withCredentials: true,
  autoConnect: false,
});
