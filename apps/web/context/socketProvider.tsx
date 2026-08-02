"use client";
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { handleMembers, handleMessage, useEmitter } from "../socket/chat";
import { socket } from "../socket/socket";
import { useRoomStore } from "../store/useRoomstore";

type SocketContextType = {
  sendMessage: (message: string) => void;
};

const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const roomId = useRoomStore((s) => s.room.id);
  useEffect(() => {
    socket.connect();

    socket.emit("room:join", { roomId });

    socket.on("member", handleMembers);

    socket.on("message", handleMessage);

    return () => {
      socket.disconnect();
      socket.off("message", handleMessage);
      socket.off("member", handleMembers);
    };
  }, []);

  const Emitters = useEmitter();

  const value = useMemo(() => {
    return {
      ...Emitters,
    };
  }, []);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export default function useSocket() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used inside SocketProvider");
  }

  return context;
}
