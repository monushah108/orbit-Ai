"use client";

import React, { createContext, useContext, useEffect } from "react";
import {
  handleMembers,
  handleMessage,
  handleTyping,
  useChatEmitter,
} from "../socket/chat";
import { socket } from "../socket/socket";
import { Room, useRoomStore } from "@/store/useRoomstore";
import { handleExpiry, useRoomEmitter } from "@/socket/room";
import { handleDeafened, handleMute, useVoiceEmitter } from "@/socket/voice";
import { useMemberStore } from "@/store/useMemberstore";

type SocketContextType = {
  sendMessage: (message: string) => void;
  joinRoom: (roomId: string) => Promise<void>;
  createRoom: (room: Room) => Promise<void>;
  DestroyRoom: (roomId: string) => void;

  Onmute: (isMuted: boolean) => void;
  Ondeafened: (isDeafened: boolean) => void;

  typing: () => void;
  stopTyping: () => void;
};

const SocketContext = createContext<SocketContextType | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const room = useRoomStore((state) => state.room);

  useEffect(() => {
    socket.connect();

    socket.on("members", handleMembers);

    socket.on("message", handleMessage);

    socket.on("typing", handleTyping);
    socket.on("stop-typing", handleTyping);

    socket.on("member:mute", handleMute);
    socket.on("member:deafen", handleDeafened);

    socket.on("room:expired", handleExpiry);

    return () => {
      socket.off("members", handleMembers);
      socket.off("message", handleMessage);
      socket.off("typing", handleTyping);
      socket.off("stop-typing", handleTyping);
      socket.off("member:mute", handleMute);
      socket.off("member:deafen", handleDeafened);
      socket.off("room:expired", handleExpiry);

      socket.disconnect();
    };
  }, []);

  const chatEmitter = useChatEmitter(room?.id ?? "");
  const roomEmitter = useRoomEmitter();
  const voiceEmitter = useVoiceEmitter(room?.id ?? "");

  const value = {
    ...chatEmitter,
    ...roomEmitter,
    ...voiceEmitter,
  };

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
