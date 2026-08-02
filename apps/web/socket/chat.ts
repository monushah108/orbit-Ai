import { useCallback } from "react";
import { useChatStore } from "../store/useChatstore";
import { Member, useMemberStore } from "../store/useMemberstore";
import { socket } from "./socket";

export const handleMessage = (message: string) => {
  console.log("receiver ", message);
  useChatStore.getState().addMessage(message);
};

export const handleMembers = (members: Member[]) => {
  console.log("member handler ", members);
  useMemberStore.getState().setMembers(members);
};

export const useEmitter = (roomId: string) => {
  const sendMessage = useCallback((message: string) => {
    console.log("emitter ", message);
    socket.emit("message", {
      message,
      roomId,
    });
  }, []);

  return { sendMessage };
};
