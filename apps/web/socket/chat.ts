import { useCallback } from "react";
import { useChatStore } from "../store/useChatstore";
import { Member, useMemberStore } from "../store/useMemberstore";
import { socket } from "./socket";

export const handleMessage = (message: string) => {
  useChatStore
    .getState()
    .setMessages([...useChatStore.getState().messages, message]);
};

export const handleMembers = (members: Member[]) => {
  useMemberStore.getState().setMembers(members);
};

export const useEmitter = () => {
  const sendMessage = useCallback((message: string) => {
    socket.emit("message", message);
  }, []);

  return { sendMessage };
};
