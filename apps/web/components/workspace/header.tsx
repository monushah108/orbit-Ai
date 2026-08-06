"use client";

import { useMemberStore } from "@/store/useMemberstore";
import { useRoomStore } from "@/store/useRoomstore";
import { Users, Zap, Bomb } from "lucide-react";
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
    setTimeout(() => setCopied(false), 1500);
  };

  const destroyRoom = () => {
    DestroyRoom(room?.id ?? "");
    console.log("Destroy room");
  };

  return (
    <header className="h-14 border-b border-zinc-800 bg-black font-mono grid grid-cols-3 items-center px-5">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 border border-emerald-500 bg-emerald-500/10 flex items-center justify-center">
          <Zap className="h-4 w-4 text-emerald-400" />
        </div>

        <span className="text-white">Orbit AI</span>
      </div>

      {/* Center */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <button
          onClick={copyRoomId}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <i className="fa-solid fa-check text-emerald-400" />
              Copied
            </>
          ) : (
            <>
              <i className="fa-regular fa-copy" />
              {room?.id?.slice(0, 8)}
            </>
          )}
        </button>

        {user?.id == room?.adminId && (
          <>
            <div className="h-4 w-px bg-zinc-800" />

            <button
              onClick={destroyRoom}
              className="cursor-pointer flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
            >
              <Bomb size={20} />
              Destroy
            </button>
          </>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center justify-end gap-6 text-sm text-zinc-400">
        {duration !== "Never" && (
          <div className="flex items-center gap-2">
            <Timer expiresAt={expiresAt} />
          </div>
        )}

        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          {members.length}
        </div>
      </div>
    </header>
  );
}
