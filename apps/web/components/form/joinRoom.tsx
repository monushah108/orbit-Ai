"use client";

import { Button } from "@/components/ui/button";
import useSocket from "@/context/socketProvider";
import { useRoomStore } from "@/store/useRoomstore";
import { Loader2, X } from "lucide-react";
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
    <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 p-3 sm:p-4 md:p-5 font-mono">
      <div>
        <p className="mb-1.5 text-[11px] sm:text-xs text-emerald-400 font-mono flex items-center gap-1">
          <span className="text-zinc-600">&gt;</span> room_access_id
        </p>

        <div className="relative">
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Paste target room ID..."
            className="
              w-full
              rounded-lg
              border
              border-zinc-800
              bg-black/50
              px-3
              py-2
              pr-10
              font-mono
              text-xs
              sm:text-sm
              text-white
              outline-none
              placeholder:text-zinc-600
              focus:border-emerald-500/50
            "
          />

          {roomId && (
            <button
              type="button"
              onClick={() => setRoomId("")}
              className="
                absolute
                right-2.5
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
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <p className="mt-1.5 text-[10px] sm:text-[11px] text-zinc-500">
          Paste the unique session ID shared by the room host.
        </p>
      </div>

      <div className="rounded-lg border border-zinc-800/80 bg-black/40 p-3">
        <p className="mb-1.5 text-[10px] uppercase tracking-wider text-zinc-500">Connection Status</p>

        <div className="space-y-1 text-xs text-emerald-400">
          <p className="flex items-center gap-1.5">
            <span className="text-emerald-500">✓</span> Waiting for room ID
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-emerald-500">✓</span> Secure tunnel ready
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-emerald-500">✓</span> AI runtime available
          </p>
        </div>
      </div>

      <Button
        disabled={!roomId.trim() || loading}
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
            roomId.trim() && !loading
              ? "border-emerald-500/80 bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-black shadow-[0_0_25px_rgba(16,185,129,0.2)] cursor-pointer"
              : "cursor-not-allowed border-zinc-800 bg-zinc-900/60 text-zinc-600"
          }
        `}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            CONNECTING...
          </span>
        ) : (
          "JOIN ORBIT →"
        )}
      </Button>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-zinc-800/80 pt-2.5 text-[10px] sm:text-[11px] text-zinc-500 font-mono">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          SESSION STATUS: <span className="text-zinc-300">AWAITING HANDSHAKE</span>
        </span>

        <span>PEER TO PEER</span>
      </div>
    </form>
  );
}
