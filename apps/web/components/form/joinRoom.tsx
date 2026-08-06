"use client";

import { Button } from "@/components/ui/button";
import useSocket from "@/context/socketProvider";
import { useRoomStore } from "@/store/useRoomstore";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const { joinRoom } = useSocket();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = roomId.trim();

    if (!id) {
      toast.warning("Enter a room ID.");
      return;
    }

    try {
      setLoading(true);

      await joinRoom(id);

      router.push(`/workspace/${id}`);
    } catch (err: any) {
      toast.warning("> INVALID", {
        description: err?.message ?? "Room not found.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-8 font-mono">
      <div>
        <p className="mb-2 text-emerald-400">&gt; room_access_id</p>

        <div className="relative">
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter room ID..."
            className="
        w-full
        border-b
        border-zinc-700
        bg-transparent
        pb-3
        pr-10
        text-white
        outline-none
        placeholder:text-zinc-600
        focus:border-emerald-500
      "
          />

          {roomId && (
            <button
              type="button"
              onClick={() => setRoomId("")}
              className="
          absolute
          right-0
          top-1/2
          -translate-y-1/2
          rounded-md
          p-1
          text-zinc-500
          transition
          hover:bg-zinc-800
          hover:text-white
        "
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <p className="mt-2 text-xs text-zinc-500">
          Paste the room ID shared by the room creator.
        </p>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-black p-5">
        <p className="mb-3 text-zinc-500">CONNECTION STATUS</p>

        <div className="space-y-2 text-sm text-emerald-400">
          <p>✓ Waiting for room ID</p>
          <p>✓ Secure tunnel ready</p>
          <p>✓ AI runtime available</p>
        </div>
      </div>

      <Button
        disabled={!roomId.trim() || loading}
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
      roomId.trim()
        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black"
        : "cursor-not-allowed border-zinc-800 bg-zinc-900 text-zinc-600"
    }
  `}
      >
        {loading ? "CONNECTING..." : "JOIN ORBIT →"}
      </Button>
    </form>
  );
}
