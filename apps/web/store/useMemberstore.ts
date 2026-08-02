import { create } from "zustand";

export type Member = {
  id: string;
  name: string;
  isLive: boolean;
};

interface MemberStore {
  members: Member[];
  setMembers: (members: Member[]) => void;
}

export const useMemberStore = create<MemberStore>((set) => ({
  roomId: null,
  members: [],

  setMembers: (members: Member[]) => set({ members }),
}));
