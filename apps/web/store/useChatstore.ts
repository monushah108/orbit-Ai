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
  loading: boolean;
  error: string | null;

  addTypingUser: (user: User) => void;
  removeTypingUser: (id: string) => void;

  addMessage: (message: string, sender: User) => void;
  botMessage: (chunk: string) => void;

  setMessages: (messages: ChatItem[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (err: string) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  typingUsers: [],
  loading: false,
  error: null,

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
        last.message += chunk;
      } else {
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

  setLoading: (loading) =>
    set({
      loading,
    }),

  setError: (err) =>
    set({
      error: err,
    }),

  clearMessages: () =>
    set({
      chats: [],
      loading: false,
    }),
}));
