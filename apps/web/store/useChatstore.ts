import { create } from "zustand";
import { User } from "./useMemberstore";

export type ChatItem = {
  id: string;
  message: string;
  sender: User;
  timestamp: Date;
};

interface ChatStore {
  chats: ChatItem[];
  typingUsers: User[];
  addTypingUser: (user: User) => void;
  removeTypingUser: (id: string) => void;
  addMessage: (message: string, sender: User) => void;
  botMessage: (chunk: string) => void;
  setMessages: (messages: ChatItem[]) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  typingUsers: [],
  addTypingUser: (user) =>
    set((state) => ({
      typingUsers: state.typingUsers.some((u) => u.id === user.id)
        ? state.typingUsers
        : [...state.typingUsers, user],
    })),

  removeTypingUser: (id) =>
    set((state) => ({
      typingUsers: state.typingUsers.filter((u) => u.id !== id),
    })),
  addMessage: (message, sender) =>
    set((state) => ({
      chats: [
        ...state.chats,
        {
          id: crypto.randomUUID(),
          message,
          sender,
          timestamp: new Date(),
        },
      ],
    })),
  botMessage: (chunk) =>
    set((state) => {
      const chats = [...state.chats];

      const last = chats[chats.length - 1];

      if (last?.sender.id === "bot") {
        // AI is already replying → append new streamed text
        last.message += chunk;
      } else {
        // First chunk → create a new bot message
        chats.push({
          id: crypto.randomUUID(),
          message: chunk,
          sender: {
            id: "bot",
            name: "Orbit AI",
            avatar: "https://api.dicebear.com/9.x/bottts-neutral/png?seed=bot",
          },
          timestamp: new Date(),
        });
      }

      return { chats };
    }),
  setMessages: (messages) =>
    set({
      chats: messages,
    }),

  clearMessages: () =>
    set({
      chats: [],
    }),
}));
