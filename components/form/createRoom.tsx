"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CreateRoom() {
  const [visibility, setVisibility] = useState<"private" | "public">("private");

  return (
    <div className="space-y-8 p-8 font-mono">
      {/* ID */}
      <div>
        <p className="mb-2 text-emerald-400">&gt; generated_room_id</p>

        <div className="flex gap-3">
          <input
            readOnly
            value="ORBIT-8KF2-X91A"
            className="flex-1 border-b border-zinc-700 bg-transparent pb-3 text-white outline-none"
          />

          <Button variant="outline" className="border-zinc-700">
            Generate
          </Button>
        </div>
      </div>

      {/* Expiry */}
      <div>
        <p className="mb-4 text-emerald-400">&gt; expires_after</p>

        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {["30m", "1h", "6h", "12h", "24h", "Never"].map((time) => (
            <button
              key={time}
              className="rounded border border-zinc-700 py-3 text-sm text-zinc-300 hover:border-emerald-500 hover:text-emerald-400"
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Visibility */}
      <div>
        <p className="mb-4 text-emerald-400">&gt; visibility</p>

        <div className="grid grid-cols-2 gap-3">
          {["private", "public"].map((type) => (
            <button
              key={type}
              onClick={() => setVisibility(type as any)}
              className={`rounded py-3 capitalize ${
                visibility === type
                  ? "border border-emerald-500 bg-emerald-500/10 text-emerald-400"
                  : "border border-zinc-700 text-zinc-400"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Button */}
      <Button className="h-14 w-full rounded border border-emerald-500 bg-emerald-500/10 font-mono text-lg text-emerald-400 hover:bg-emerald-500 hover:text-black">
        ENTER ORBIT →
      </Button>
    </div>
  );
}
