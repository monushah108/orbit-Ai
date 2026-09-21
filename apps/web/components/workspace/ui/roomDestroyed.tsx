"use client";

import { Trash2, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RoomDestroyed() {
  const [count, setCount] = useState(10);

  const router = useRouter();
  const onCreateRoom = () => {
    router.push(`/create`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);

    const timer = setTimeout(() => {
      router.push("/create");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);
  return (
    <div className="flex h-screen flex-col bg-black font-mono text-zinc-100">
      {/* Header */}
      <header className="h-14 border-b border-zinc-800 px-3.5 sm:px-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded border border-emerald-500 bg-emerald-500/10">
            <Zap className="h-4 w-4 text-emerald-400" />
          </div>

          <span className="font-mono text-sm sm:text-base tracking-wide text-white">Orbit AI</span>
        </div>

        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-red-400">
          Session Terminated
        </span>
      </header>

      {/* Body */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
          <div className="border-b border-zinc-800 p-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg border border-red-500/40 bg-red-500/10">
                <Trash2 className="h-5 w-5 text-red-400" />
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-semibold text-white">Room Destroyed</h2>
                <p className="text-xs sm:text-sm text-zinc-500">
                  This session is no longer available.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 sm:px-6 sm:py-5 text-xs sm:text-sm text-zinc-400">
            <p>The room has been permanently destroyed by its owner.</p>

            <p>
              All participants have been disconnected and can no longer rejoin
              using this room ID.
            </p>
            <p className="text-xs sm:text-sm text-emerald-400 font-mono">Redirecting in {count}s...</p>
          </div>

          <div className="border-t border-zinc-800 p-4 sm:p-6">
            <button
              onClick={onCreateRoom}
              className="h-11 w-full rounded-lg border border-emerald-500 bg-emerald-500/10 font-mono text-xs sm:text-sm text-emerald-400 transition hover:bg-emerald-500 hover:text-black cursor-pointer"
            >
              Create New Room →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
