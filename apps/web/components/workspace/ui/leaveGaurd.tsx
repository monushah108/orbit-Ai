"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSocket from "@/context/socketProvider";
import { useRoomStore } from "@/store/useRoomstore";
import { useChatStore } from "@/store/useChatstore";
import { AlertTriangle, X } from "lucide-react";

export default function RoomLeaveGuard() {
  const router = useRouter();

  const room = useRoomStore((s) => s.room);
  const { LeaveRoom } = useSocket();

  const [showDialog, setShowDialog] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    if (!room?.id) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      if (!href) return;

      // Allow links inside the current room
      if (href.startsWith(`/room/${room.id}`)) {
        return;
      }

      // Allow external links
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      // Let browser handle modifier-clicks
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      setPendingHref(href);
      setShowDialog(true);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [room?.id]);

  const cancelLeave = () => {
    setShowDialog(false);
    setPendingHref(null);
  };

  const confirmLeave = () => {
    if (!room?.id || !pendingHref) return;

    LeaveRoom(room.id);

    useRoomStore.getState().destroyRoom();
    useChatStore.getState().clearMessages();

    setShowDialog(false);

    router.push(pendingHref);

    setPendingHref(null);
  };

  if (!showDialog) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>

          <div className="flex-1">
            <h2 className="text-base font-semibold text-white">
              Leave this room?
            </h2>

            <p className="mt-1 text-sm leading-6 text-zinc-400">
              Are you sure you want to leave this room? You will need to join
              again to return.
            </p>
          </div>

          <button
            onClick={cancelLeave}
            className="rounded-md p-1 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={cancelLeave}
            className="rounded-md border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={confirmLeave}
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-400"
          >
            Leave Room
          </button>
        </div>
      </div>
    </div>
  );
}
