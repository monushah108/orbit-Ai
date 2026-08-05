import { create } from "zustand";
import { persist } from "zustand/middleware";

type CreateRoomPayload = {
  id: string;
  duration: "1" | "30m" | "1h" | "6h" | "12h" | "24h" | "Never";
  withBot: boolean;
};

export type Room = {
  id: string;
  duration: "1" | "30m" | "1h" | "6h" | "12h" | "24h" | "Never";
  withBot: boolean;
  expiresAt: number;
  adminId: string;
};

interface RoomStore {
  room: Room | null;
  error: string | null;
  destroyed: boolean;

  setRoom: (room: Room) => void;
  setExpiry: (expiresAt: Room["expiresAt"]) => void;
  setError: (error: string | null) => void;
  destroyRoom: () => void;
  clearRoom: () => void;
}

export const useRoomStore = create<RoomStore>()(
  persist(
    (set) => ({
      room: null,
      error: null,
      destroyed: false,

      setRoom: (room) =>
        set({
          room,
          destroyed: false,
          error: null,
        }),

      setExpiry: (expiresAt) =>
        set((state) => ({
          room: state.room
            ? {
                ...state.room,
                expiresAt,
              }
            : null,
        })),

      setError: (error) => set({ error }),

      destroyRoom: () =>
        set({
          room: null,
          destroyed: true,
          error: null,
        }),

      clearRoom: () =>
        set({
          room: null,
          destroyed: false,
          error: null,
        }),
    }),
    {
      name: "orbit-room-store",
    },
  ),
);
