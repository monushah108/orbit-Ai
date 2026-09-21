"use client";

import { useEffect, useState } from "react";

export default function LiveTime() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
    <div
      className="flex items-center gap-1.5 sm:gap-2 rounded-lg border border-emerald-900/50 bg-[#050805]/90 px-2 sm:px-3 py-1 sm:py-1.5 font-mono text-[11px] sm:text-xs text-zinc-300 shadow-[0_0_14px_rgba(16,185,129,0.12)] backdrop-blur-md select-none shrink-0"
      title="Current System Time"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>

      <span className="font-semibold tracking-wider text-emerald-400 tabular-nums">
        {mounted ? time : "--:--:--"}
      </span>
    </div>
  );
}
