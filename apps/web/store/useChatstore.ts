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

  setMessages: (messages) =>
    set({
      chats: messages,
    }),

  clearMessages: () =>
    set({
      chats: [],
    }),
}));
