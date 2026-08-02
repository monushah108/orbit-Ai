import { create } from "zustand";

export type ChatItem = {
  id: string;
  message: string;
  timeStamp: Date;
};

interface ChatStore {
  chats: ChatItem[];

  addMessage: (message: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],

  addMessage: (message) =>
    set((state) => ({
      chats: [
        ...state.chats,
        {
          id: crypto.randomUUID(),
          message,
          timeStamp: new Date(),
        },
      ],
    })),
}));
