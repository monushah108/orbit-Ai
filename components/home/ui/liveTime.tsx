"use client";

import { useEffect, useState } from "react";

export default function LiveTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-400 md:flex">
      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

      <span className="text-emerald-400">{time}</span>
    </div>
  );
}
