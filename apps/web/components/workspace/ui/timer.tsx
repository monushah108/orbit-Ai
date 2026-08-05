"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function Timer({ expiresAt }: { expiresAt: number }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = expiresAt - Date.now();

      if (remaining <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div className="hidden items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-400 md:flex">
      <Clock className="h-4 w-4 text-emerald-400" />
      <span className="text-emerald-400">{timeLeft}</span>
    </div>
  );
}
