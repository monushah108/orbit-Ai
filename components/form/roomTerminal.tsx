"use client";

import { useState } from "react";
import CreateRoom from "./createRoom";
import JoinRoom from "./joinRoom";

export default function RoomTerminal() {
  const [mode, setMode] = useState<"create" | "join">("create");

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#090909]">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 border-b border-zinc-800 px-3 py-3 md:px-5">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />

          <span className="ml-4 font-mono text-sm text-zinc-500">
            orbit-terminal
          </span>
        </div>

        {/* Toggle */}
        <div className="border-b border-zinc-800 p-4">
          <div className="grid grid-cols-2 rounded-lg border border-zinc-800 bg-black p-1">
            <button
              onClick={() => setMode("create")}
              className={`rounded-md py-2 font-mono text-sm transition ${
                mode === "create"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Create Room
            </button>

            <button
              onClick={() => setMode("join")}
              className={`rounded-md py-2 font-mono text-sm transition ${
                mode === "join"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Join Room
            </button>
          </div>
        </div>

        {/* Forms */}
        <div>{mode === "create" ? <CreateRoom /> : <JoinRoom />}</div>
      </div>
    </section>
  );
}
