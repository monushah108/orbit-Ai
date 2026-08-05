import { useCallback } from "react";
import { useChatStore } from "../store/useChatstore";
import { Member, useMemberStore, User } from "../store/useMemberstore";
import { socket } from "./socket";

export const handleTyping = ({
  event,
  user,
}: {
  event: string;
  user: User;
}) => {
  switch (event) {
    case "typing":
      console.log(user, event);
      useChatStore.getState().addTypingUser(user);
      break;
    case "stop-typing":
      useChatStore.getState().removeTypingUser(user.id);
      break;
  }
};

export const handleMessage = ({
  message,
  user,
}: {
  message: string;
  user: User;
}) => {
  console.log("receiver ", message);
  useChatStore.getState().addMessage(message, user);
};

export const handleMembers = (members: Member[]) => {
  console.log("member handler ", members);
  useMemberStore.getState().addMembers(members);
};

export const useChatEmitter = (roomId: string) => {
  const user = useMemberStore((s) => s.user);
  const sendMessage = useCallback(
    (message: string) => {
      if (!roomId || !user?.id) return;
      console.log("emitter ", message);
      socket.emit("message", {
        message,
        roomId,
        user,
      });
    },
    [roomId, user],
  );

  const typing = useCallback(() => {
    if (!roomId || !user?.id) return;
    socket.emit("typing", {
      roomId,
      user,
    });
  }, [roomId, user]);

  const stopTyping = useCallback(() => {
    if (!roomId || !user?.id) return;
    socket.emit("stop-typing", {
      roomId,
      user,
    });
  }, [roomId, user]);

  return { sendMessage, typing, stopTyping };
};
