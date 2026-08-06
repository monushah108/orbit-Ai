import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Member = {
  id: string;
  name: string;
  avatar: string;
  mute?: boolean;
  deafen?: boolean;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
  mute?: boolean;
  deafen?: boolean;
};

interface MemberStore {
  user: User | null;
  members: Member[];

  setUser: (user: User) => void;
  addMembers: (members: Member[]) => void;
  setMute: (memberId: string, isMute: boolean) => void;
  setDeafened: (memberId: string, isDeafened: boolean) => void;
  clearMember: () => void;
}

export const useMemberStore = create<MemberStore>()(
  persist(
    (set) => ({
      user: null,

      members: [],

      setUser: (user) => set({ user }),

      addMembers: (members) => set({ members }),

      setMute: (memberId, isMute) =>
        set((state) => ({
          user:
            state.user?.id === memberId
              ? { ...state.user, mute: isMute }
              : state.user,

          members: state.members.map((member) =>
            member.id === memberId ? { ...member, mute: isMute } : member,
          ),
        })),

      setDeafened: (memberId, isDeafened) =>
        set((state) => ({
          user:
            state.user?.id === memberId
              ? { ...state.user, deafen: isDeafened }
              : state.user,

          members: state.members.map((member) =>
            member.id === memberId ? { ...member, deafen: isDeafened } : member,
          ),
        })),

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
