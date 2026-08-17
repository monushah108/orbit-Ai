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
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const remaining = expiresAt - Date.now();

      if (remaining <= 0) {
        setTimeLeft("Expired");
        return false;
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
      console.log("check", remaining);
      checkRoomExists(roomId);
    }, remaining);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [expiresAt, roomId, checkRoomExists]);

  return (
    <div className=" items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-400 flex">
      <Clock className="h-4 w-4 text-emerald-400" />
      <span className="text-emerald-400">{timeLeft}</span>
    </div>
  );
}
