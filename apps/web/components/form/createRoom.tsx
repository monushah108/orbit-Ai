"use client";

import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import useSocket from "@/context/socketProvider";
import { useMemberStore } from "@/store/useMemberstore";
import { useRoomStore } from "@/store/useRoomstore";

import { toast } from "sonner";
import { Bot, BotOff, Check, Copy, Loader2, RefreshCw, Sparkles } from "lucide-react";

type Duration = "1m" | "30m" | "1h" | "6h";

const durations: Duration[] = ["1m", "30m", "1h", "6h"];

export default function CreateRoom() {
  const [roomId, setRoomId] = useState("");
  const [withBot, setWithBot] = useState(false);
  const [duration, setDuration] = useState<Duration>("1m");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const adminId = useMemberStore((s) => s.user?.id);
  const setRoom = useRoomStore((s) => s.setRoom);

  const { createRoom } = useSocket();

  useEffect(() => {
    if (!roomId) {
      setRoomId(nanoid());
    }
  }, [roomId]);

  const generateId = () => {
    setRefreshing(true);
    setRoomId(nanoid());
    setTimeout(() => setRefreshing(false), 300);
  };

  const copyRoomId = async () => {
    if (!roomId) return;

    await navigator.clipboard.writeText(roomId);
    setCopied(true);
    toast.success("Room ID copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
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
    <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 p-3 sm:p-4 md:p-5 font-mono">
      {/* Room ID */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-[11px] sm:text-xs text-emerald-400 font-mono flex items-center gap-1">
            <span className="text-zinc-600">&gt;</span> generated_room_id
          </p>

          {roomId && (
            <span className="text-[10px] text-zinc-500">Cryptographically unique</span>
          )}
        </div>

        <div className="flex gap-2">
          <input
            readOnly
            value={roomId}
            placeholder="Generating secure room ID..."
            className="
              min-w-0
              flex-1
              rounded-lg
              border
              border-zinc-800
              bg-black/50
              px-3
              py-2
              font-mono
              text-xs
              sm:text-sm
              text-white
              outline-none
              focus:border-emerald-500/50
            "
          />

          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={generateId}
            className="h-9 w-9 shrink-0 border-zinc-800 bg-black/40 hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400 transition"
            title="Generate new room ID"
          >
            <RefreshCw className={`h-3.5 w-3.5 transition-transform ${refreshing ? "animate-spin text-emerald-400" : ""}`} />
          </Button>

          <Button
            type="button"
            size="icon"
            variant="outline"
            disabled={!roomId}
            onClick={copyRoomId}
            className={`h-9 w-9 shrink-0 border-zinc-800 bg-black/40 transition ${
              copied
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-400"
                : "hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400"
            }`}
            title="Copy room ID"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>

      {/* Duration */}
      <div>
        <p className="mb-1.5 text-[11px] sm:text-xs text-emerald-400 font-mono flex items-center gap-1">
          <span className="text-zinc-600">&gt;</span> session_lifespan
        </p>

        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {durations.map((time) => {
            const label = time === "1m" ? "1m" : time === "30m" ? "30m" : time === "1h" ? "1h" : "6h";
            const desc = time === "1m" ? "Demo" : time === "30m" ? "Quick" : time === "1h" ? "Standard" : "Extended";
            const isSelected = duration === time;

            return (
              <button
                key={time}
                type="button"
                onClick={() => setDuration(time)}
                className={`
                  flex flex-col items-center justify-center
                  rounded-lg
                  border
                  py-1.5
                  sm:py-2
                  px-1
                  transition-all
                  ${
                    isSelected
                      ? "border-emerald-400 bg-emerald-500/15 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                      : "border-zinc-800/90 bg-black/30 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }
                `}
              >
                <span className="text-xs sm:text-sm font-semibold">{label}</span>
                <span className="text-[9px] text-zinc-500 leading-none mt-0.5">{desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Orbit AI */}
      <div
        className={`
          flex
          items-center
          justify-between
          gap-3
          rounded-xl
          border
          p-2.5
          sm:p-3
          transition-all
          ${
            withBot
              ? "border-emerald-500/40 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.06)]"
              : "border-zinc-800/90 bg-black/30 hover:border-zinc-700"
          }
        `}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`
              shrink-0
              rounded-lg
              border
              p-2
              ${
                withBot
                  ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
                  : "border-zinc-800 bg-zinc-900/60 text-zinc-500"
              }
            `}
          >
            {withBot ? (
              <Bot className="h-4 w-4 text-emerald-400" />
            ) : (
              <BotOff className="h-4 w-4 text-zinc-500" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs sm:text-sm font-semibold text-white">Orbit AI</h3>
              <Sparkles className="h-3 w-3 text-emerald-400" />
            </div>

            <p className="text-[10px] sm:text-[11px] text-zinc-400 truncate">
              Mention <span className="text-cyan-400 font-mono">@bot</span> in chat for instant AI help
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={() => setWithBot((v) => !v)}
          size="sm"
          className={`
            h-8
            px-2.5
            sm:px-3
            shrink-0
            font-mono
            text-xs
            transition-all
            ${
              withBot
                ? "bg-emerald-500 text-black font-semibold hover:bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                : "border border-zinc-700 bg-zinc-900/80 text-zinc-400 hover:text-white"
            }
          `}
        >
          {withBot ? "ACTIVE" : "ENABLE"}
        </Button>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={!roomId || loading}
        className={`
          h-11
          sm:h-12
          w-full
          rounded-lg
          border
          font-mono
          text-xs
          sm:text-sm
          font-bold
          tracking-wider
          transition-all
          ${
            roomId && !loading
              ? "border-emerald-500/80 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-black shadow-[0_0_25px_rgba(16,185,129,0.2)] cursor-pointer"
              : "cursor-not-allowed border-zinc-800 bg-zinc-900/60 text-zinc-600"
          }
        `}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            INITIALIZING ROOM...
          </span>
        ) : (
          "ENTER ORBIT →"
        )}
      </Button>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-zinc-800/80 pt-2.5 text-[10px] sm:text-[11px] text-zinc-500 font-mono">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          CAPACITY: <span className="text-zinc-300">3 MAX</span>
        </span>

        <span>REALTIME ENCRYPTED</span>
      </div>
    </form>
  );
}
