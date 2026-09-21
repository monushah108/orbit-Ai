"use client";

import useSocket from "@/context/socketProvider";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function Timer({
  expiresAt,
  roomId,
}: {
  expiresAt: number;
  roomId: string;
}) {
  const { checkRoomExists } = useSocket();
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const remaining = expiresAt - Date.now();

      if (remaining <= 0) {
        setTimeLeft("00:00:00");
        setIsUrgent(true);
        return false;
      }

      if (remaining < 60 * 1000) {
        setIsUrgent(true);
      } else {
        setIsUrgent(false);
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      );

      return true;
    };

    // Update immediately
    updateTimer();

    const interval = setInterval(() => {
      const active = updateTimer();

      if (!active) {
        clearInterval(interval);
      }
    }, 1000);

    // Ask server when the timer reaches zero
    const remaining = Math.max(0, expiresAt - Date.now());
    const timeout = setTimeout(() => {
      checkRoomExists(roomId);
    }, remaining);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [expiresAt, roomId, checkRoomExists]);

  return (
    <div
      className={`flex items-center gap-1.5 rounded-md border px-2 py-1 sm:px-2.5 sm:py-1 font-mono text-[11px] sm:text-xs transition-colors select-none ${
        isUrgent
          ? "border-red-500/50 bg-red-500/15 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.25)] animate-pulse"
          : "border-emerald-900/60 bg-emerald-500/10 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.12)]"
      }`}
    >
      <Clock className={`h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 ${isUrgent ? "text-red-400" : "text-emerald-400"}`} />
      <span className="font-semibold tracking-wider">{timeLeft}</span>
    </div>
  );
}
