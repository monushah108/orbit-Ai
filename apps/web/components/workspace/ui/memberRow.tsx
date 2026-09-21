"use client";

import { Member } from "@/store/useMemberstore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

export function MemberRow({
  member,
  isMe,
  isAdmin,
}: {
  member: Member;
  isMe: boolean;
  isAdmin: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-transparent p-2.5 transition hover:border-emerald-900/50 hover:bg-emerald-500/5">
      <Avatar className="h-9 w-9 shrink-0 border border-emerald-900/40 ring-1 ring-black">
        <AvatarImage src={member.avatar} alt={member.name} />
        <AvatarFallback className="bg-zinc-900 font-mono text-xs text-emerald-400">
          {member.name?.slice(0, 2).toUpperCase() || "OR"}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p
            className="truncate font-mono text-sm font-medium text-zinc-200"
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

        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] text-zinc-500">online</span>
        </div>
      </div>
    </div>
  );
}

export function BotRow() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-cyan-900/30 bg-cyan-500/5 p-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-900/40 bg-cyan-500/10">
        <Bot className="h-4 w-4 text-cyan-400" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="font-mono text-sm font-medium text-zinc-200">Orbit AI</p>
          <span className="rounded bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[9px] text-cyan-400">
            BOT
          </span>
        </div>

        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[10px] text-zinc-500">online</span>
        </div>
      </div>

      <Bot className="h-4 w-4 text-cyan-500/40 shrink-0" />
    </div>
  );
}
