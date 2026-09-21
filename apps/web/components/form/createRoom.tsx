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
import { Bot, BotOff, Copy, Loader2, RefreshCw, Sparkles } from "lucide-react";

type Duration = "1m" | "30m" | "1h" | "6h";

const durations: Duration[] = ["1m", "30m", "1h", "6h"];

export default function CreateRoom() {
  const [roomId, setRoomId] = useState("");
  const [withBot, setWithBot] = useState(false);
  const [duration, setDuration] = useState<Duration>("1m");
  const [loading, setLoading] = useState(false);
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

    setLoading(true);

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
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";

      toast.error("Failed to create room", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 p-4 sm:p-6 md:p-8 font-mono">
      {/* Room ID */}

      <div>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs sm:text-sm text-emerald-400">&gt; generated_room_id</p>

          {roomId && (
            <span className="text-[10px] sm:text-xs text-zinc-500">Generated locally</span>
          )}
        </div>

        <div className="flex gap-2">
          <input
            readOnly
            value={roomId}
            placeholder="Generate a secure room id..."
            className="
              min-w-0
              flex-1
              border-b
              border-zinc-700
              bg-transparent
              pb-2.5
              sm:pb-3
              font-mono
              text-xs
              sm:text-sm
              md:text-base
              text-white
              outline-none
              placeholder:text-zinc-600
              placeholder:text-xs
              sm:placeholder:text-sm
            "
          />

          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={generateId}
            className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 border-zinc-700 hover:border-emerald-500"
            title="Generate room ID"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="icon"
            variant="outline"
            disabled={!roomId}
            onClick={copyRoomId}
            className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 border-zinc-700 hover:border-emerald-500"
            title="Copy room ID"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Duration */}

      <div>
        <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-emerald-400">&gt; expires_after</p>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
          {durations.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => setDuration(time)}
              className={`
                rounded-lg
                border
                py-2.5
                sm:py-3
                text-xs
                sm:text-sm
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
          flex-col
          sm:flex-row
          items-start
          sm:items-center
          justify-between
          gap-3.5
          sm:gap-4
          rounded-xl
          border
          p-3.5
          sm:p-4
          transition-all

          ${
            withBot
              ? "border-emerald-500/40 bg-emerald-500/5"
              : "border-zinc-700 bg-zinc-900/40 hover:border-emerald-500/40"
          }
        `}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div
            className={`
              shrink-0
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
              <h3 className="text-sm sm:text-base font-semibold text-white">Orbit AI</h3>

              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400" />
            </div>

            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
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
          className={`
            w-full
            sm:w-auto
            shrink-0
            h-9
            text-xs
            sm:text-sm
            ${
              withBot
                ? "bg-emerald-500 text-black hover:bg-emerald-400"
                : "border-zinc-700"
            }
          `}
        >
          {withBot ? "Enabled" : "Enable"}
        </Button>
      </div>

      {/* Submit */}

      <Button
        type="submit"
        disabled={!roomId || loading}
        className={`
          h-12
          sm:h-14
          w-full
          rounded-lg
          border
          font-mono
          text-sm
          sm:text-base
          font-semibold
          transition-all

          ${
            roomId && !loading
              ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black cursor-pointer"
              : "cursor-not-allowed border-zinc-800 bg-zinc-900 text-zinc-600"
          }
        `}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating room...
          </span>
        ) : (
          "ENTER ORBIT →"
        )}
      </Button>

      {/* Footer */}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2 border-t border-zinc-800 pt-4 sm:pt-5 text-xs text-zinc-500">
        <span>
          Max <span className="text-zinc-300">3 participants</span>
        </span>

        <span>End-to-end realtime collaboration</span>
      </div>
    </form>
  );
}
