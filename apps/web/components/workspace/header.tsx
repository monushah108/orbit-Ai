"use client";

import { useMemberStore } from "@/store/useMemberstore";
import { useRoomStore } from "@/store/useRoomstore";
import { Users, Zap, Bomb, Copy, Check } from "lucide-react";
import { useState } from "react";
import Timer from "./ui/timer";
import useSocket from "@/context/socketProvider";

export default function Header() {
  const room = useRoomStore((s) => s.room);
  const { members, user } = useMemberStore();

  const [copied, setCopied] = useState(false);

  const { DestroyRoom } = useSocket();

  const expiresAt = room?.expiresAt;
  const duration = room?.duration;

  const copyRoomId = async () => {
    if (!room?.id) return;

    await navigator.clipboard.writeText(room.id);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const destroyRoom = () => {
    if (!room?.id) return;

    DestroyRoom(room.id);
  };

  const showTimer = expiresAt && room?.id;

  return (
    <header className="relative flex h-13 sm:h-14 w-full items-center justify-between border-b border-emerald-900/40 bg-[#050805]/95 backdrop-blur-xl px-2.5 sm:px-4 z-20 shrink-0 select-none shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      {/* ================= LEFT ================= */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md border border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
          <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400" />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide">
            Orbit AI
          </span>
          <span className="hidden xl:inline-flex items-center gap-1 font-mono text-[10px] text-emerald-500/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE LINK
          </span>
        </div>
      </div>

      {/* ================= CENTER TIMER ================= */}
      {showTimer && (
        <div className="flex shrink items-center justify-center font-mono md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          <Timer expiresAt={expiresAt} roomId={room.id} />
        </div>
      )}

      {/* ================= RIGHT ================= */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        {/* Room ID */}
        <button
          onClick={copyRoomId}
          className={`flex items-center gap-1 rounded-md border px-2 py-1 font-mono text-[11px] sm:text-xs transition-all ${
            copied
              ? "border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
              : "border-zinc-800 bg-black/40 text-zinc-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:text-emerald-300"
          }`}
          title="Click to copy Room ID"
        >
          {copied ? (
            <Check className="h-3 w-3 shrink-0 text-emerald-400" />
          ) : (
            <Copy className="h-3 w-3 shrink-0 text-zinc-500" />
          )}

          <span className="max-w-[60px] sm:max-w-none truncate">
            {room?.id?.slice(0, 8)}
          </span>
        </button>

        {/* Desktop separator */}
        {user?.id === room?.adminId && (
          <div className="hidden h-4 w-px bg-zinc-800 sm:block" />
        )}

        {/* Destroy */}
        {user?.id === room?.adminId && (
          <button
            onClick={destroyRoom}
            className="flex h-7 w-7 sm:h-auto sm:w-auto items-center justify-center rounded-md border border-red-500/30 bg-red-500/10 px-1.5 py-1 text-red-400 transition hover:bg-red-500/20 hover:text-red-300 sm:gap-1 sm:px-2"
            aria-label="Destroy room"
            title="Permanently destroy this room"
          >
            <Bomb className="h-3.5 w-3.5" />
            <span className="hidden text-xs font-mono sm:block">Destroy</span>
          </button>
        )}

        {/* Members Badge */}
        <div
          className="flex shrink-0 items-center gap-1 rounded-md border border-emerald-900/50 bg-emerald-500/5 px-2 py-1 text-[11px] sm:text-xs font-mono text-zinc-300"
          title={`${members.length} active peers`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <Users className="h-3 w-3 text-emerald-400" />
          <span>{members.length}</span>
        </div>
      </div>
    </header>
  );
}
