import { useCallback } from "react";
import { socket } from "./socket";
import { useMemberStore } from "@/store/useMemberstore";
import { useRoomStore, type Room } from "@/store/useRoomstore";
import { useChatStore } from "@/store/useChatstore";

export const handleExpiry = () => {
  useRoomStore.getState().destroyRoom();
  useMemberStore.getState().clearMember();
  useChatStore.getState().clearMessages();
};

export function useRoomEmitter() {
  const user = useMemberStore((s) => s.user);

  const createRoom = useCallback(
    (room: Room) => {
      if (!user) {
        return Promise.reject(new Error("User not found"));
      }

      return new Promise<void>((resolve, reject) => {
        socket.emit("room:create", {
          roomId: room.id,
          duration: room.duration,
          withBot: room.withBot,
          user,
        });

        socket.once("room:created", ({ expiresAt }) => {
          useRoomStore.getState().setExpiry(expiresAt);
          resolve();
        });
        socket.once("room:blocked", ({ message }) => {
          useRoomStore.getState().setError(message || "Room not found");

          reject(new Error(message || "Room not found"));
        });
        socket.once("room:error", (message: string) => {
          reject(new Error(message));
          useRoomStore.getState().setError("room creation failed !!");
        });
      });
    },
    [user],
  );

  const joinRoom = useCallback(
    (roomId: string) => {
      if (!user) {
        return Promise.reject(new Error("User not found"));
      }

      return new Promise<void>((resolve, reject) => {
        socket.once("room:joined", (data) => {
          console.log("ROOM JOINED:", data);

          useRoomStore.getState().setRoom({
            id: roomId,
            ...data,
          });

          resolve();
        });

        socket.once("room:error", ({ err }) => {
          console.error("ROOM JOIN FAILED:", err);

          useRoomStore.getState().setError(err || "Room not found");

          reject(new Error(err || "Room not found"));
        });

        socket.once("room:blocked", ({ message }) => {
          useRoomStore.getState().setError(message || "Room not found");

          reject(new Error(message || "Room not found"));
        });

        console.log("joining room:", roomId);

        socket.emit("room:join", {
          roomId,
          user,
        });
      });
    },
    [user],
  );

  const DestroyRoom = useCallback((roomId: string) => {
    socket.emit("room:destroy", { roomId });
  }, []);

  const checkRoomExists = useCallback((roomId: string) => {
    socket.emit("room:check", { roomId });
  }, []);

  const LeaveRoom = useCallback((roomId: string) => {
    socket.emit("room:leave", { roomId });
  }, []);

  return {
    createRoom,
    joinRoom,
    DestroyRoom,
    checkRoomExists,
    LeaveRoom,
  };
}
