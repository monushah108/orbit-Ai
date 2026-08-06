import { useCallback } from "react";
import { socket } from "./socket";
import { useMemberStore } from "@/store/useMemberstore";
import { useRoomStore, type Room } from "@/store/useRoomstore";

export const handleExpiry = () => {
  console.log("room:expired");
  useRoomStore.getState().destroyRoom();
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
        socket.emit("room:join", {
          roomId,
          user,
        });

        socket.once("room:joined", (data) => {
          useRoomStore.getState().setRoom({ id: roomId, ...data });
          resolve();
        });
        socket.once("room:not-found", () => {
          useRoomStore.getState().setError("room not found");
          reject(new Error("Room not found"));
        });
      });
    },
    [user],
  );

  const DestroyRoom = useCallback((roomId: string) => {
    socket.emit("room:destroy", { roomId });
  }, []);

  return {
    createRoom,
    joinRoom,
    DestroyRoom,
  };
}
