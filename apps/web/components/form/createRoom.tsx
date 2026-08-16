"use client";

import { nanoid } from "nanoid";
import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import useSocket from "@/context/socketProvider";
import { useMemberStore } from "@/store/useMemberstore";
import { useRoomStore } from "@/store/useRoomstore";

import { toast } from "sonner";
import { Bot, BotOff, Copy, RefreshCw, Sparkles } from "lucide-react";

type Duration = "1m" | "30m" | "1h" | "6h";

const durations: Duration[] = ["1m", "30m", "1h", "6h"];

export default function CreateRoom() {
  const [roomId, setRoomId] = useState("");
  const [withBot, setWithBot] = useState(false);
  const [duration, setDuration] = useState<Duration>("1m");

  const router = useRouter();

  const adminId = useMemberStore((s) => s.user?.id);
  const setRoom = useRoomStore((s) => s.setRoom);

  const { createRoom } = useSocket();

  const generateId = () => {
    setRoomId(nanoid());
  };

  const copyRoomId = async () => {
    if (!roomId) return;

    await navigator.clipboard.writeText(roomId);

    toast.success("Room ID copied");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!roomId) {
      toast.warning("Generate a room ID first.");
      return;
    }

    try {
      setRoom({
        id: roomId,
        duration,
        withBot,
        adminId,
      });

      await createRoom({
        id: roomId,
        duration,
        withBot,
      });

      router.push(`/workspace/${roomId}?d=${duration}`);
    } catch (err: any) {
      toast.error("Failed to create room", {
        description: err?.message ?? "Something went wrong.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-8 font-mono">
      {/* Room ID */}

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-emerald-400">&gt; generated_room_id</p>

          {roomId && (
            <span className="text-xs text-zinc-500">Generated locally</span>
          )}
        </div>

        <div className="flex gap-2">
          <input
            readOnly
            value={roomId}
            placeholder="Generate a secure room id..."
            className="
              flex-1
              border-b
              border-zinc-700
              bg-transparent
              pb-3
              text-white
              outline-none
              placeholder:text-zinc-600
            "
          />

          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={generateId}
            className="border-zinc-700 hover:border-emerald-500"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="icon"
            variant="outline"
            disabled={!roomId}
            onClick={copyRoomId}
            className="border-zinc-700 hover:border-emerald-500"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Duration */}

      <div>
        <p className="mb-4 text-emerald-400">&gt; expires_after</p>

        <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
          {durations.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => setDuration(time)}
              className={`
                rounded-lg
                border
                py-3
                text-sm
                transition-all

                ${
                  duration === time
                    ? "border-emerald-400 bg-emerald-500/10 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    : "border-zinc-700 text-zinc-300 hover:border-emerald-500 hover:bg-emerald-500/5 hover:text-emerald-400"
                }
              `}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Orbit AI */}

      <div
        className={`
          flex
          items-center
          justify-between
          rounded-xl
          border
          p-4
          transition-all

          ${
            withBot
              ? "border-emerald-500/40 bg-emerald-500/5"
              : "border-zinc-700 bg-zinc-900/40 hover:border-emerald-500/40"
          }
        `}
      >
        <div className="flex items-start gap-4">
          <div
            className={`
              rounded-lg
              border
              p-2

              ${
                withBot
                  ? "border-emerald-500/40 bg-emerald-500/10"
                  : "border-zinc-700 bg-zinc-800"
              }
            `}
          >
            {withBot ? (
              <Bot className="h-5 w-5 text-emerald-400" />
            ) : (
              <BotOff className="h-5 w-5 text-zinc-500" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white">Orbit AI</h3>

              <Sparkles className="h-4 w-4 text-emerald-400" />
            </div>

            <p className="mt-1 max-w-md text-sm text-zinc-400">
              Mention{" "}
              <span className="rounded bg-cyan-500/10 px-1 text-cyan-400">
                @bot
              </span>{" "}
              in chat to ask Orbit AI questions or get coding help.
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={() => setWithBot((v) => !v)}
          variant={withBot ? "default" : "outline"}
          className={
            withBot
              ? "bg-emerald-500 text-black hover:bg-emerald-400"
              : "border-zinc-700"
          }
        >
          {withBot ? "Enabled" : "Enable"}
        </Button>
      </div>
      {/* Submit */}

      <Button
        type="submit"
        disabled={!roomId}
        className={`
          h-14
          w-full
          rounded-lg
          border
          font-mono
          text-base
          font-semibold
          transition-all

          ${
            roomId
              ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black"
              : "cursor-not-allowed border-zinc-800 bg-zinc-900 text-zinc-600"
          }
        `}
      >
        ENTER ORBIT →
      </Button>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-zinc-800 pt-5 text-xs text-zinc-500">
        <span>
          Max <span className="text-zinc-300">3 participants</span>
        </span>

        <span>End-to-end realtime collaboration</span>
      </div>
    </form>
  );
}
