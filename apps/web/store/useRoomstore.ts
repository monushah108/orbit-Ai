import { create } from "zustand";

type Room = {
  id: string;
  duration: string;
  visibility: string;
};
interface RoomStoreType {
  room: Room;
  generateRoom: (details: Room) => void;
}

export const useRoomStore = create<RoomStoreType>((set) => ({
  room: {},
  generateRoom: (details) => {
    set(() => ({
      room: {
        ...details,
      },
    }));
  },
}));
