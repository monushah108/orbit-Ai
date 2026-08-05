"use client";

import { nanoid } from "nanoid";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

import { useRoomStore } from "@/store/useRoomstore";
import useSocket from "@/context/socketProvider";
import { toast } from "sonner";
import { Bot, BotOff } from "lucide-react";

type dType = "1m" | "30m" | "1h" | "6h" | "Never";

const durations: dType[] = ["1m", "30m", "1h", "6h", "Never"];

export default function CreateRoom() {
  const [roomId, setRoomId] = useState("");
  const [withBot, setWithBot] = useState(false);
  const [duration, setDuration] = useState<dType>("1m");

  const router = useRouter();

  const { createRoom } = useSocket();

  const setRoom = useRoomStore((s) => s.setRoom);

  const generateId = () => {
    setRoomId(nanoid());
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!roomId) {
      alert("Generate a Room ID first.");
      return;
    }

    try {
      setRoom({
        id: roomId,
        duration,
        withBot,
      });

      await createRoom({
        id: roomId,
        duration,
        withBot,
      });

      router.push(`/workspace/${roomId}?d=${duration}`);
    } catch (err) {
      toast.warning("> ALERT", {
        description: err.message || "this room does not exisit !!",
      });
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-8 font-mono">
      {/* Room ID */}
      <div>
        <p className="mb-2 text-emerald-400">&gt; generated_room_id</p>

        <div className="flex gap-3">
          <input
            readOnly
            value={roomId}
            placeholder="Click Generate..."
            className="flex-1 border-b border-zinc-700 bg-transparent pb-3 text-white outline-none"
          />

          <Button
            type="button"
            onClick={generateId}
            variant="outline"
            className="border-zinc-700"
          >
            Generate
          </Button>
        </div>
      </div>

      {/* Duration */}
      <div>
        <p className="mb-4 text-emerald-400">&gt; expires_after</p>

        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {durations.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => setDuration(time)}
              className={`rounded border py-3 text-sm transition-colors ${
                duration === time
                  ? "border-emerald-400 text-emerald-400"
                  : "border-zinc-700 text-zinc-300 hover:border-emerald-500 hover:text-emerald-400"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* AI Chatbot */}

      <div className="flex items-center justify-between rounded-lg border border-zinc-700 bg-zinc-900/40 p-4 transition-colors hover:border-emerald-500/50">
        <div className="flex items-start gap-3">
          <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-2">
            {withBot ? (
              <Bot className="h-5 w-5 text-emerald-400" />
            ) : (
              <BotOff className="h-5 w-5 text-emerald-400" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-white">Orbit AI</h3>

              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                Optional
              </span>
            </div>

            <p className="mt-1 max-w-md text-sm text-zinc-400">
              Allow the AI assistant to join this room.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant={withBot ? "default" : "outline"}
          onClick={() => setWithBot((v) => !v)}
          className={
            withBot
              ? "border-emerald-500 bg-emerald-500 text-black hover:bg-emerald-400"
              : "border-zinc-700"
          }
        >
          {withBot ? "Enabled" : "Enable"}
        </Button>
      </div>
      {/* Submit */}
      <Button
        type="submit"
        className="h-14 w-full rounded border border-emerald-500 bg-emerald-500/10 font-mono text-lg text-emerald-400 hover:bg-emerald-500 hover:text-black"
      >
        ENTER ORBIT →
      </Button>
    </form>
  );
}
