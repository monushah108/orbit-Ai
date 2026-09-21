"use client";

import { useMemberStore } from "@/store/useMemberstore";
import { useRoomStore } from "@/store/useRoomstore";
import { useChatStore } from "@/store/useChatstore";
import useSocket from "@/context/socketProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  Users,
  Zap,
  Bomb,
  Copy,
  Check,
  Share2,
  LogOut,
  AlertTriangle,
  X,
  Bot,
} from "lucide-react";
import Timer from "./ui/timer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MemberRow, BotRow } from "./ui/memberRow";

export default function Header() {
  const router = useRouter();
  const room = useRoomStore((s) => s.room);
  const { members, user } = useMemberStore();
  const { DestroyRoom, LeaveRoom } = useSocket();

  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showDestroyModal, setShowDestroyModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  const expiresAt = room?.expiresAt;
  const isAdmin = user?.id && room?.adminId && user.id === room.adminId;
  const totalPeers = members.length + (room?.withBot ? 1 : 0);
  const showTimer = Boolean(expiresAt && room?.id);

  // Copy raw room ID
  const copyRoomId = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!room?.id) return;

    try {
      await navigator.clipboard.writeText(room.id);
      setCopiedId(true);
      toast.success("Room ID copied to clipboard!");
      setTimeout(() => setCopiedId(false), 2000);
    } catch {
      toast.error("Failed to copy Room ID");
    }
  };

  // Share or copy invite link with native Web Share on mobile
  const handleShareOrCopy = async () => {
    if (!room?.id) return;

    const inviteUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/workspace/${room.id}`
        : `/workspace/${room.id}`;

    // Try native share API on mobile devices
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Orbit AI Workspace",
          text: `Join my Orbit AI temporary room #${room.id.slice(0, 8)}`,
          url: inviteUrl,
        });
        return;
      } catch (err) {
        if ((err as Error)?.name === "AbortError") {
          return;
        }
      }
    }

    // Fallback: Copy link to clipboard
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopiedLink(true);
      toast.success("Room invite link copied to clipboard!");
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // Secondary fallback: Copy room ID
      await navigator.clipboard.writeText(room.id);
      setCopiedId(true);
      toast.success("Room ID copied to clipboard!");
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  // Safe room destruction for admin
  const handleConfirmDestroy = () => {
    if (!room?.id) return;
    setShowDestroyModal(false);
    DestroyRoom(room.id);
  };

  // Safe room exit for participants
  const handleConfirmLeave = () => {
    if (!room?.id) return;
    LeaveRoom(room.id);
    useRoomStore.getState().destroyRoom();
    useChatStore.getState().clearMessages();
    setShowLeaveModal(false);
    router.push("/");
  };

  return (
    <>
      <header className="relative flex h-14 w-full items-center justify-between border-b border-emerald-900/40 bg-[#050805]/95 backdrop-blur-xl px-2.5 sm:px-4 lg:px-6 z-30 shrink-0 select-none shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
        {/* ================= LEFT: Brand & Badges ================= */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_14px_rgba(16,185,129,0.22)] transition hover:border-emerald-400 hover:bg-emerald-500/20">
            <Zap className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-emerald-400" />
          </div>

          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide truncate">
              Orbit AI
            </span>

            {/* Desktop Live Beacon */}
            <span className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400 font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              LIVE LINK
            </span>

            {/* Room Duration Tag */}
            {room?.duration && (
              <span className="hidden xl:inline-flex items-center rounded border border-zinc-800/80 bg-zinc-950/80 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                {room.duration} TTL
              </span>
            )}

            {/* Bot Active Tag */}
            {room?.withBot && (
              <span className="hidden xl:inline-flex items-center gap-1 rounded border border-cyan-500/30 bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[10px] text-cyan-300">
                <Bot className="h-3 w-3 text-cyan-400" />
                AI ACTIVE
              </span>
            )}
          </div>
        </div>

        {/* ================= CENTER: Countdown Timer HUD ================= */}
        {showTimer && (
          <div className="flex shrink items-center justify-center font-mono px-1 sm:px-2">
            <Timer expiresAt={expiresAt!} roomId={room!.id} />
          </div>
        )}

        {/* ================= RIGHT: Controls & Actions ================= */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Room ID Chip (Desktop / Tablet) */}
          <button
            type="button"
            onClick={copyRoomId}
            className={`hidden sm:flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-xs transition-all cursor-pointer ${
              copiedId
                ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
                : "border-zinc-800 bg-black/50 text-zinc-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:text-emerald-300"
            }`}
            title="Click to copy Room ID"
            aria-label="Copy Room ID"
          >
            {copiedId ? (
              <Check className="h-3 w-3 shrink-0 text-emerald-400" />
            ) : (
              <Copy className="h-3 w-3 shrink-0 text-zinc-500 group-hover:text-emerald-400" />
            )}
            <span className="text-zinc-500 text-[10px]">#</span>
            <span className="max-w-[70px] md:max-w-none truncate font-mono">
              {room?.id?.slice(0, 8)}
            </span>
          </button>

          {/* Share / Invite Link (Mobile & Desktop) */}
          <button
            type="button"
            onClick={handleShareOrCopy}
            className={`flex items-center gap-1.5 rounded-lg border px-2 sm:px-2.5 py-1 font-mono text-xs font-medium transition-all cursor-pointer ${
              copiedLink
                ? "border-emerald-400 bg-emerald-500/25 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                : "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400/80 shadow-[0_0_10px_rgba(16,185,129,0.12)] active:scale-95"
            }`}
            title="Share room or copy invite link"
            aria-label="Share room or copy invite link"
          >
            {copiedLink ? (
              <Check className="h-3.5 w-3.5 shrink-0 text-emerald-300" />
            ) : (
              <Share2 className="h-3.5 w-3.5 shrink-0" />
            )}
            <span className="hidden sm:inline">
              {copiedLink ? "Copied" : "Share"}
            </span>
          </button>

          {/* Members Badge with Interactive Mobile Drawer */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-emerald-900/50 bg-emerald-500/10 px-2 sm:px-2.5 py-1 font-mono text-xs text-zinc-300 hover:border-emerald-500/50 hover:bg-emerald-500/20 hover:text-emerald-300 transition cursor-pointer active:scale-95"
                title={`${totalPeers} active peer${totalPeers === 1 ? "" : "s"} (click to view)`}
                aria-label="View room members"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <Users className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span className="font-semibold text-emerald-300">{totalPeers}</span>
                <span className="hidden xl:inline text-zinc-500 text-[10px]">
                  peers
                </span>
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[88%] max-w-sm border-emerald-900/40 bg-[#050805]/95 backdrop-blur-xl p-0 text-white no-scrollbar"
            >
              <SheetHeader className="border-b border-emerald-900/40 px-4 py-3 bg-black/80">
                <SheetTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-emerald-400" />
                    <span className="font-mono text-sm text-emerald-400">
                      members.log
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-emerald-900/60 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                      {totalPeers}
                    </span>
                    <SheetClose asChild>
                      <button
                        type="button"
                        className="rounded-md p-1 text-zinc-500 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
                        aria-label="Close members drawer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </SheetClose>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto no-scrollbar p-3 sm:p-4 space-y-1">
                <p className="mb-2 px-1 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                  Connected peers ({members.length})
                </p>

                {members.map((member) => (
                  <MemberRow
                    key={member.id}
                    member={member}
                    isMe={member.id === user?.id}
                    isAdmin={member.id === room?.adminId}
                  />
                ))}

                {room?.withBot && (
                  <div className="pt-3 mt-2 border-t border-zinc-800/80">
                    <p className="mb-2 px-1 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                      Assistant
                    </p>
                    <BotRow />
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Separator on desktop */}
          <div className="hidden h-4 w-px bg-zinc-800 sm:block" />

          {/* Admin: Safe Destroy Room Button */}
          {isAdmin ? (
            <button
              type="button"
              onClick={() => setShowDestroyModal(true)}
              className="flex items-center justify-center rounded-lg border border-red-500/40 bg-red-500/10 px-2 sm:px-2.5 py-1 text-red-400 hover:bg-red-500/20 hover:border-red-500/60 hover:text-red-300 transition-all sm:gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(239,68,68,0.15)] active:scale-95"
              title="Permanently terminate room session"
              aria-label="Destroy room"
            >
              <Bomb className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline font-mono text-xs font-semibold">
                Destroy
              </span>
            </button>
          ) : (
            /* Non-Admin Participant: Leave Room Button */
            <button
              type="button"
              onClick={() => setShowLeaveModal(true)}
              className="flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 px-2 sm:px-2.5 py-1 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-200 transition-all sm:gap-1.5 cursor-pointer active:scale-95"
              title="Leave room session"
              aria-label="Leave room"
            >
              <LogOut className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline font-mono text-xs">Leave</span>
            </button>
          )}
        </div>
      </header>

      {/* ================= ADMIN DESTROY SAFETY CONFIRMATION MODAL ================= */}
      {showDestroyModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md font-mono"
          onClick={() => setShowDestroyModal(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-red-500/40 bg-[#070a07] text-zinc-100 shadow-[0_0_50px_rgba(239,68,68,0.25)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="border-b border-red-500/20 bg-red-950/20 p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-500/50 bg-red-500/15 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  <Bomb className="h-5 w-5 text-red-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-red-400 tracking-wider uppercase">
                    Terminate Room
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    Admin Destruction Protocol
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDestroyModal(false)}
                className="text-zinc-500 hover:text-zinc-200 transition p-1 rounded-md hover:bg-zinc-800/60"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 space-y-3.5 text-xs font-mono">
              <div className="rounded-lg border border-red-900/40 bg-red-950/30 p-3 text-red-300">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                  <span className="font-semibold uppercase tracking-wider text-[11px]">
                    Irreversible Action
                  </span>
                </div>
                <p className="text-[11px] text-red-300/90 leading-relaxed">
                  Destroying this room will immediately disconnect all {totalPeers}{" "}
                  peer{totalPeers === 1 ? "" : "s"} and wipe all ephemeral chat
                  history.
                </p>
              </div>

              <div className="flex items-center justify-between py-2 px-3 rounded-md border border-zinc-800 bg-black/60 text-zinc-400 text-[11px]">
                <span>Room Target:</span>
                <span className="font-mono text-emerald-400 select-all">
                  #{room?.id}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center gap-2.5 p-4 sm:p-5 border-t border-zinc-800/80 bg-black/40">
              <button
                type="button"
                onClick={() => setShowDestroyModal(false)}
                className="flex-1 py-2 px-3 rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 font-mono text-xs transition cursor-pointer"
              >
                Abort
              </button>
              <button
                type="button"
                onClick={handleConfirmDestroy}
                className="flex-1 py-2 px-3 rounded-lg border border-red-500 bg-red-600/20 hover:bg-red-600/30 text-red-300 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(239,68,68,0.3)] transition cursor-pointer"
              >
                <Bomb className="h-3.5 w-3.5" />
                <span>Confirm Destroy</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PARTICIPANT LEAVE CONFIRMATION MODAL ================= */}
      {showLeaveModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md font-mono"
          onClick={() => setShowLeaveModal(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-zinc-800 bg-[#070a07] text-zinc-100 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-zinc-800 p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800/40">
                  <LogOut className="h-5 w-5 text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-200">
                    Leave Workspace
                  </h3>
                  <p className="text-[11px] text-zinc-500">
                    Disconnect from session
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLeaveModal(false)}
                className="text-zinc-500 hover:text-zinc-200 transition p-1 rounded-md hover:bg-zinc-800"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 sm:p-5 text-xs text-zinc-400 space-y-2">
              <p>Are you sure you want to disconnect from this room?</p>
              <p className="text-zinc-500 text-[11px]">
                You can rejoin later using the invite link as long as the
                session remains active.
              </p>
            </div>

            <div className="flex items-center gap-2.5 p-4 sm:p-5 border-t border-zinc-800 bg-black/40">
              <button
                type="button"
                onClick={() => setShowLeaveModal(false)}
                className="flex-1 py-2 px-3 rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 font-mono text-xs transition cursor-pointer"
              >
                Stay
              </button>
              <button
                type="button"
                onClick={handleConfirmLeave}
                className="flex-1 py-2 px-3 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-mono text-xs font-medium transition cursor-pointer"
              >
                Leave Room
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
