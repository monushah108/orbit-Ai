"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Users, X } from "lucide-react";
import { useMemberStore } from "@/store/useMemberstore";
import { useRoomStore } from "@/store/useRoomstore";
import { MemberRow, BotRow } from "./memberRow";

export function Mobile() {
  const members = useMemberStore((s) => s.members);
  const currentUserId = useMemberStore((s) => s.user?.id);
  const withBot = useRoomStore((s) => s.room?.withBot);
  const adminId = useRoomStore((s) => s.room?.adminId);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="
            flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center
            rounded-md
            text-zinc-500
            transition
            hover:bg-zinc-800
            hover:text-emerald-400
          "
          aria-label="Open members"
        >
          <Menu className="h-4 w-4" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="
          w-[88%]
          max-w-sm
          border-emerald-900/40
          bg-[#050805]/95
          backdrop-blur-xl
          p-0
          text-white
          no-scrollbar
        "
      >
        {/* Header */}
        <SheetHeader className="border-b border-emerald-900/40 px-4 py-3 sm:px-5 sm:py-4 bg-black/80">
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-400" />

              <span className="font-mono text-sm text-emerald-400">
                members.log
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-md border border-emerald-900/60 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                {members.length + (withBot ? 1 : 0)}
              </span>

              <SheetClose asChild>
                <button
                  type="button"
                  className="rounded-md p-1 text-zinc-500 hover:bg-zinc-800 hover:text-white transition"
                  aria-label="Close members drawer"
                >
                  <X className="h-4 w-4" />
                </button>
              </SheetClose>
            </div>
          </SheetTitle>
        </SheetHeader>

        {/* Members List */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-3 sm:p-4 space-y-1">
          <p className="mb-2 px-1 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
            Connected users ({members.length})
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
            <div className="pt-3 mt-2 border-t border-zinc-800/80">
              <p className="mb-2 px-1 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                Assistant
              </p>
              <BotRow />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
