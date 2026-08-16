"use client";

import { Member, useMemberStore } from "@/store/useMemberstore";
import { Bot, Users } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";

import { useRoomStore } from "@/store/useRoomstore";

export default function MemberList({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { members } = useMemberStore();
  const withBot = useRoomStore((s) => s.room?.withBot);

  return (
    <aside
      className={` md:flex hidden
  border-r
  border-emerald-900/40
  bg-[#030603]
  transition-all
  duration-300
  ${open ? "w-full max-w-[320px] sm:w-72 lg:w-80" : "w-0 overflow-hidden border-none"}
`}
    >
      {/* Content */}
      {open && (
        <div className="p-5 ">
          {/* Header */}
          <div className="mb-6 flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-400" />

            <h2 className="font-mono text-sm text-emerald-400">members.log</h2>
          </div>

          {/* Members */}

          {members.map((member: Member) => {
            const isMe = member.id === useMemberStore.getState().user?.id;
            const isAdmin = member.id == useRoomStore.getState().room?.adminId;
            return (
              <div
                key={member.id}
                className="
        flex
        items-center
        gap-3
        rounded-lg
        border
        border-transparent
        p-3
        transition
        hover:border-emerald-900
        hover:bg-emerald-500/5
      "
              >
                <Avatar className="h-11 w-11 border border-emerald-700/50 ring-1 ring-black">
                  <AvatarImage src={member.avatar} />
                </Avatar>

                <div className="min-w-0 flex-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <p
                      className="truncate text-sm font-medium text-zinc-100"
                      title={member.name}
                    >
                      {member.name}
                    </p>

                    {isMe && (
                      <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-mono text-emerald-400">
                        ME
                      </span>
                    )}
                    {isAdmin && (
                      <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-mono text-emerald-400">
                        AD
                      </span>
                    )}
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                    <span className="font-mono text-xs text-zinc-500">
                      Online
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {withBot && (
            <div className="mt-2 flex items-center gap-3 rounded-lg p-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/10">
                <Bot className="h-4 w-4 text-cyan-400" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-100">Orbit AI</p>
                <p className="text-xs text-zinc-500">Online</p>
              </div>

              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
