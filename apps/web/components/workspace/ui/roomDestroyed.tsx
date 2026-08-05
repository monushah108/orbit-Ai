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
      <header className="h-14 border-b border-zinc-800 px-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center border border-emerald-500 bg-emerald-500/10">
            <Zap className="h-4 w-4 text-emerald-400" />
          </div>

          <span className="tracking-wide">Orbit AI</span>
        </div>

        <span className="text-xs uppercase tracking-[0.2em] text-red-400">
          Session Terminated
        </span>
      </header>

      {/* Body */}
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-lg border border-zinc-800 bg-zinc-950">
          <div className="border-b border-zinc-800 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center border border-red-500/40 bg-red-500/10">
                <Trash2 className="h-5 w-5 text-red-400" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">Room Destroyed</h2>
                <p className="text-sm text-zinc-500">
                  This session is no longer available.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 px-6 py-5 text-sm text-zinc-400">
            <p>The room has been permanently destroyed by its owner.</p>

            <p>
              All participants have been disconnected and can no longer rejoin
              using this room ID.
            </p>
            <p className="text-sm text-zinc-500">Redirecting in {count}...</p>
          </div>

          <div className="border-t border-zinc-800 p-6">
            <button
              onClick={onCreateRoom}
              className="h-10 w-full border border-emerald-500 bg-emerald-500/10 text-emerald-400 transition hover:bg-emerald-500/20"
            >
              Create New Room
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
