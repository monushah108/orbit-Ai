"use client";
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { handleMembers, handleMessage, useEmitter } from "../socket/chat";
import { socket } from "../socket/socket";
import { useRoomStore } from "../store/useRoomstore";
import { useMemberStore } from "../store/useMemberstore";

type SocketContextType = {
  sendMessage: (message: string) => void;
};

const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const roomId = "super man";
  const user = "tony";
  useEffect(() => {
    socket.connect();

    socket.emit("room:join", { roomId, user });

    socket.on("members", handleMembers);

    socket.on("message", handleMessage);

    return () => {
      socket.disconnect();
      socket.off("message", handleMessage);
      socket.off("members", handleMembers);
    };
  }, []);

  const Emitters = useEmitter(roomId);

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
