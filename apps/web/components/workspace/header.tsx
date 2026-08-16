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
        border-b
        border-zinc-800
        bg-zinc-950
        px-3
        sm:px-4
      "
    >
      {/* ================= LEFT ================= */}

      <div className="flex min-w-0 items-center gap-2">
        <div
          className="
            flex
            h-7
            w-7
            shrink-0
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
            absolute
            left-1/2
            top-1/2
            flex
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            font-mono
            text-xs
            text-zinc-300
            sm:text-sm
          "
        >
          <Timer expiresAt={expiresAt} roomId={room.id} />
        </div>
      )}

      {/* ================= RIGHT ================= */}

      <div
        className="
          ml-auto
          flex
          shrink-0
          items-center
          gap-2
          sm:gap-3
        "
      >
        {/* Room ID */}

        <button
          onClick={copyRoomId}
          className="
            flex
            max-w-[70px]
            items-center
            gap-1.5
            truncate
            rounded-md
            px-1.5
            py-1
            font-mono
            text-[10px]
            text-zinc-500
            transition
            hover:bg-zinc-900
            hover:text-zinc-200
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
              h-8
              w-8
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
              sm:gap-2
              sm:px-2
              sm:py-1.5
            "
            aria-label="Destroy room"
            title="Destroy room"
          >
            <Bomb className="h-4 w-4" />

            <span className="hidden text-sm sm:block">Destroy</span>
          </button>
        )}

        {/* Members */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-1.5
            rounded-md
            px-1
            text-xs
            text-zinc-400
            sm:px-2
            sm:text-sm
          "
        >
          <Users className="h-4 w-4" />

          <span>{members.length}</span>
        </div>
      </div>
    </header>
  );
}
