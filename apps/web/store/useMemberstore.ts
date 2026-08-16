import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Member = {
  id: string;
  name: string;
  avatar: string;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
};

interface MemberStore {
  user: User | null;
  members: Member[];

  setUser: (user: User) => void;
  addMembers: (members: Member[]) => void;

  clearMember: () => void;
}

export const useMemberStore = create<MemberStore>()(
  persist(
    (set) => ({
      user: null,

      members: [],

      setUser: (user) => set({ user }),

      addMembers: (members) => set({ members }),

      clearMember: () => set({ members: [] }),
    }),
    {
      name: "orbit-member-store", // localStorage key
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);
