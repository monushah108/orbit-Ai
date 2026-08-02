import { create } from "zustand";

export type Member = {
  id: string;
  name: string;
  isLive: boolean;
};

export type User = {
  id: string;
  name: string;
};

interface MemberStore {
  user: User | null;
  members: Member[];
  setUser: (user: User) => void;
  setMembers: (members: Member[]) => void;
}

export const useMemberStore = create<MemberStore>((set) => ({
  user: null,
  members: [],

  setUser: (user) => set({ user }),

  setMembers: (members) => set({ members }),
}));
