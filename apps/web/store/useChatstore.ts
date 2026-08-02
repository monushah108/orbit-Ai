import { create } from "zustand";

interface ChatStore {
  messages: string[];
  setMessages: (messages: string[]) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],

  setMessages: (messages: string[]) => set({ messages }),
}));
