"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Users } from "lucide-react";
import { useMemberStore } from "@/store/useMemberstore";
import { useRoomStore } from "@/store/useRoomstore";

export function Mobile() {
  const members = useMemberStore((s) => s.members);
  const user = useMemberStore((s) => s.user);
  const withBot = useRoomStore((s) => s.room?.withBot);
  const adminId = useRoomStore((s) => s.room?.adminId);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="
            flex h-9 w-9 items-center justify-center
            rounded-md
            text-zinc-500
            transition
            hover:bg-zinc-800
            hover:text-emerald-400
          "
          aria-label="Open members"
        >
          <Users className="h-4 w-4" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"

        className="
          w-[88%]
          max-w-sm
          border-zinc-800
          bg-[#050805]
          p-0
          text-white
        "
      >
        {/* Header */}
        <SheetHeader className="border-b border-zinc-800 px-5 py-4">
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-400" />

              <span className="font-mono text-sm text-emerald-400">
                members.log
              </span>
            </div>

            <span className="rounded-md border border-zinc-800 bg-zinc-900/50 px-2 py-1 font-mono text-[10px] text-zinc-500">
              {members.length + (withBot ? 1 : 0)}
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* Members */}
        <div className="flex h-[calc(100%-73px)] flex-col overflow-y-auto">
          <div className="p-4">
            <p className="mb-3 px-1 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Connected users
            </p>

            <div className="space-y-1">
              {members.map((member) => {
                const isMe = member.id === user?.id;
                const isAdmin = member.id === adminId;

                return (
                  <div
                    key={member.id}
                    className="
                      flex items-center gap-3
                      rounded-lg
                      border border-transparent
                      p-3
                      transition
                      hover:border-emerald-900/50
                      hover:bg-emerald-500/5
                    "
                  >
                    {/* Avatar */}
                    <Avatar className="h-10 w-10 shrink-0 border border-zinc-800 ring-1 ring-black">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-zinc-900 font-mono text-xs text-emerald-400">
                        {member.name?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {/* User info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 items-center gap-2">
                        <p
                          className="truncate font-mono text-sm text-zinc-200"
                          title={member.name}
                        >
                          {member.name}
                        </p>

                        {isMe && (
                          <span className="shrink-0 rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] text-emerald-400">
                            ME
                          </span>
                        )}

                        {isAdmin && (
                          <span className="shrink-0 rounded bg-amber-500/10 px-1.5 py-0.5 font-mono text-[9px] text-amber-400">
                            ADMIN
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                        <span className="font-mono text-[10px] text-zinc-600">
                          online
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI */}
          {withBot && (
            <div className="mt-auto border-t border-zinc-800 p-4">
              <p className="mb-3 px-1 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                Assistant
              </p>

              <div className="flex items-center gap-3 rounded-lg border border-cyan-900/30 bg-cyan-500/5 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-900/40 bg-cyan-500/10">
                  <Bot className="h-4 w-4 text-cyan-400" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-mono text-sm text-zinc-200">Orbit AI</p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                    <span className="font-mono text-[10px] text-zinc-500">
                      online
                    </span>
                  </div>
                </div>

                <Bot className="h-4 w-4 text-cyan-500/50" />
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
