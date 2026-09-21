"use client";

import useSocket from "@/context/socketProvider";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

function formatTime(target: number | string | undefined) {
  const targetTime = Number(target);
  if (!targetTime || isNaN(targetTime)) {
    return { text: "--:--:--", urgent: false, warning: false, active: false };
  }

  const remaining = targetTime - Date.now();
  if (remaining <= 0) {
    return { text: "00:00:00", urgent: true, warning: false, active: false };
  }

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  return {
    text: `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
    urgent: remaining < 60 * 1000,
    warning: remaining < 5 * 60 * 1000 && remaining >= 60 * 1000,
    active: true,
  };
}

export default function Timer({
  expiresAt,
  roomId,
}: {
  expiresAt: number;
  roomId: string;
}) {
  const { checkRoomExists } = useSocket();
  const [timeLeft, setTimeLeft] = useState(() => formatTime(expiresAt).text);
  const [isUrgent, setIsUrgent] = useState(() => formatTime(expiresAt).urgent);
  const [isWarning, setIsWarning] = useState(() => formatTime(expiresAt).warning);

  useEffect(() => {
    const updateTimer = () => {
      const res = formatTime(expiresAt);
      setTimeLeft(res.text);
      setIsUrgent(res.urgent);
      setIsWarning(res.warning);
      return res.active;
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
    const remaining = Math.max(0, Number(expiresAt) - Date.now());
    const timeout = setTimeout(() => {
      checkRoomExists(roomId);
    }, remaining);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [expiresAt, roomId, checkRoomExists]);

  const stateClass = isUrgent
    ? "border-red-500/60 bg-red-500/15 text-red-400 shadow-[0_0_16px_rgba(239,68,68,0.3)] animate-pulse"
    : isWarning
      ? "border-amber-500/50 bg-amber-500/10 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.18)]"
      : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.12)]";

  const iconClass = isUrgent
    ? "text-red-400"
    : isWarning
      ? "text-amber-300"
      : "text-emerald-400";

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[11px] sm:text-xs transition-colors select-none backdrop-blur-md ${stateClass}`}
      title={isUrgent ? "Session expiring soon!" : "Session time remaining"}
    >
      <Clock className={`h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 ${iconClass}`} />
      <span className="font-semibold tracking-wider tabular-nums">{timeLeft}</span>
    </div>
  );
}
