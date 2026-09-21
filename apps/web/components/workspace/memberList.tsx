"use client";

import { useMemberStore } from "@/store/useMemberstore";
import { useRoomStore } from "@/store/useRoomstore";
import { Users, X } from "lucide-react";
import { MemberRow, BotRow } from "./ui/memberRow";

interface MemberListProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function MemberList({ open, setOpen }: MemberListProps) {
  const members = useMemberStore((s) => s.members);
  const currentUserId = useMemberStore((s) => s.user?.id);
  const withBot = useRoomStore((s) => s.room?.withBot);
  const adminId = useRoomStore((s) => s.room?.adminId);

  return (
    <aside
      className={`
        hidden
        md:flex
        flex-col
        h-full
        border-l
        border-emerald-900/40
        bg-[#030603]
        transition-all
        duration-300
        ease-in-out
        ${open ? "w-64 lg:w-72 xl:w-80 opacity-100" : "w-0 opacity-0 pointer-events-none border-l-0 overflow-hidden"}
      `}
    >
      <div className="w-64 lg:w-72 xl:w-80 flex flex-col h-full overflow-hidden">
        {/* Header - aligns with terminal header h-11 */}
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-zinc-800 bg-black px-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-400" />
            <h2 className="font-mono text-xs font-semibold text-emerald-400">
              members.log
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded border border-zinc-800 bg-zinc-900/60 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
              {members.length + (withBot ? 1 : 0)}
            </span>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-1 text-zinc-500 hover:bg-zinc-900 hover:text-emerald-400 transition cursor-pointer"
              title="Close sidebar"
              aria-label="Close sidebar"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Members List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <p className="px-1 pt-1 pb-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
            Connected ({members.length})
          </p>

          {members.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              isMe={member.id === currentUserId}
              isAdmin={member.id === adminId}
            />
          ))}

          {withBot && (
            <div className="pt-3">
              <p className="px-1 pb-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                Assistant
              </p>
              <BotRow />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
