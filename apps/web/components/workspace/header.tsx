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
    <header
      className="
        relative
        flex
        h-14
        w-full
        items-center
        justify-between
        border-b
        border-zinc-800
        bg-zinc-950
        px-2.5
        sm:px-4
      "
    >
      {/* ================= LEFT ================= */}

      <div className="flex shrink-0 items-center gap-2">
        <div
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-md
            bg-zinc-900
            ring-1
            ring-zinc-800
          "
        >
          <Zap className="h-4 w-4 text-emerald-400" />
        </div>

        <span
          className="
            hidden
            font-mono
            text-sm
            font-medium
            text-white
            sm:block
            sm:text-base
          "
        >
          Orbit AI
        </span>
      </div>

      {/* ================= CENTER TIMER ================= */}

      {showTimer && (
        <div
          className="
            flex
            shrink
            items-center
            justify-center
            font-mono
            md:absolute
            md:left-1/2
            md:top-1/2
            md:-translate-x-1/2
            md:-translate-y-1/2
          "
        >
          <Timer expiresAt={expiresAt} roomId={room.id} />
        </div>
      )}

      {/* ================= RIGHT ================= */}

      <div
        className="
          flex
          shrink-0
          items-center
          gap-1.5
          sm:gap-2.5
        "
      >
        {/* Room ID */}

        <button
          onClick={copyRoomId}
          className="
            flex
            max-w-[76px]
            items-center
            gap-1
            rounded-md
            border
            border-zinc-800/80
            bg-zinc-900/40
            px-1.5
            py-1
            font-mono
            text-[11px]
            text-zinc-400
            transition
            hover:bg-zinc-800
            hover:text-zinc-100
            sm:max-w-none
            sm:px-2
            sm:text-xs
          "
          title="Copy room ID"
        >
          {copied ? (
            <Check
              className="
                h-3
                w-3
                shrink-0
                text-emerald-400
              "
            />
          ) : (
            <Copy
              className="
                h-3
                w-3
                shrink-0
              "
            />
          )}

          <span className="truncate">{room?.id?.slice(0, 8)}</span>
        </button>

        {/* Desktop separator */}

        {user?.id === room?.adminId && (
          <div
            className="
              hidden
              h-4
              w-px
              bg-zinc-800
              sm:block
            "
          />
        )}

        {/* Destroy */}

        {user?.id === room?.adminId && (
          <button
            onClick={destroyRoom}
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-md
              text-red-400
              transition
              hover:bg-red-500/10
              hover:text-red-300
              sm:h-auto
              sm:w-auto
              sm:gap-1.5
              sm:px-2
              sm:py-1
            "
            aria-label="Destroy room"
            title="Destroy room"
          >
            <Bomb className="h-3.5 w-3.5 sm:h-4 sm:w-4" />

            <span className="hidden text-xs sm:block sm:text-sm">Destroy</span>
          </button>
        )}

        {/* Members */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-1
            rounded-md
            border
            border-zinc-800/80
            bg-zinc-900/40
            px-1.5
            py-1
            text-[11px]
            text-zinc-400
            sm:gap-1.5
            sm:px-2
            sm:text-xs
          "
          title={`${members.length} members online`}
        >
          <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-400" />

          <span>{members.length}</span>
        </div>
      </div>
    </header>
  );
}
