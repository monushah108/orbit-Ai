import { create } from "zustand";

export const useChatStore = create((set, get) => {
  cache: {
  }

  return {
    loadMessages : (msgId , data) => {
            set((state) => ({
                ...state.cache
            }))
    },

    sendMessage: (msgId, msg) => {
      set((state) => ({
        ...state.cache,
        cache: [
          ...state.cache,
          {
            id: crypto.randomUUID,
            message: msg,
            createdAt: new Date().toLocaleTimeString(),
          },
        ],
      }));
    },
  };
});
