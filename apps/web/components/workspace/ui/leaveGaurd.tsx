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

  // Prevent our own navigation from triggering the guard again
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (!room?.id) return;

    const handleClick = (event: MouseEvent) => {
      if (isLeaving) return;

      // Only normal left-click
      if (
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      if (!href) return;

      // Same room navigation is allowed
      if (
        href === `/workspace/${room.id}` ||
        href.startsWith(`/workspace/${room.id}?`)
      ) {
        return;
      }

      // External links are allowed to be handled normally
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      // Hash links on current page
      if (href.startsWith("#")) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      setPendingHref(href);
      setShowDialog(true);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [room?.id, isLeaving]);

  /*
   * Browser Back / Forward
   */
  useEffect(() => {
    if (!room?.id || isLeaving) return;

    // Add a history entry so we can catch Back
    window.history.pushState(
      {
        orbitRoomGuard: true,
        roomId: room.id,
      },
      "",
      window.location.href,
    );

    const handlePopState = () => {
      if (isLeaving) return;

      // Put the user back into the workspace
      window.history.pushState(
        {
          orbitRoomGuard: true,
          roomId: room.id,
        },
        "",
        window.location.href,
      );

      setPendingHref(null);
      setShowDialog(true);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [room?.id, isLeaving]);

  /*
   * Refresh / Close tab
   */
  useEffect(() => {
    if (!room?.id || isLeaving) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      // Required for browsers to show the native dialog
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [room?.id, isLeaving]);

  const cancelLeave = () => {
    setShowDialog(false);
    setPendingHref(null);
  };

  const confirmLeave = () => {
    if (!room?.id) return;

    setIsLeaving(true);

    /*
     * Cleanup room
     */
    LeaveRoom(room.id);

    useRoomStore.getState().destroyRoom();
    useChatStore.getState().clearMessages();

    setShowDialog(false);

    /*
     * Navigate only after cleanup
     */
    if (pendingHref) {
      router.push(pendingHref);
    } else {
      router.back();
    }

    setPendingHref(null);
  };

  if (!showDialog) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm font-mono">
      <div
        className="w-full max-w-lg border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-zinc-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center border border-red-500/40 bg-red-500/10">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">Leave Room</h2>

                <p className="text-sm text-zinc-500">
                  This will disconnect you from the session.
                </p>
              </div>
            </div>

            <button
              onClick={cancelLeave}
              className="flex h-8 w-8 items-center justify-center border border-transparent text-zinc-500 transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-100"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-3 px-6 py-5 text-sm text-zinc-400">
          <p>Are you sure you want to leave this room?</p>

          <p>
            You will be disconnected from the current session and will need to
            join the room again if you want to return.
          </p>

          <div className="border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400">
            Warning: Your current session will be terminated.
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-zinc-800 p-6">
          <button
            onClick={cancelLeave}
            className="h-10 flex-1 border border-zinc-800 bg-zinc-950 text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-100"
          >
            Stay in Room
          </button>

          <button
            onClick={confirmLeave}
            className="h-10 flex-1 border border-red-500 bg-red-500/10 text-red-400 transition hover:bg-red-500/20"
          >
            Leave Room
          </button>
        </div>
      </div>
    </div>
  );
}
