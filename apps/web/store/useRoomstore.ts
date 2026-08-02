import { create } from "zustand";

type Room = {
  roomId: string;
  duration: string;
  visibility: string;
};
interface RoomStoreType {
  room: Room;
  setRoom: (details: Room) => void;
}

export const useRoomStore = create<RoomStoreType>((set) => ({
  room: {},
  setRoom: (details) => {
    set(() => ({
      room: {
        ...details,
      },
    }));
  },
}));
