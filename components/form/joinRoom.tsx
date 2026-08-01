"use client";

import { Button } from "@/components/ui/button";

export default function JoinRoom() {
  return (
    <div className="space-y-8 p-8 font-mono">
      <div>
        <p className="mb-2 text-emerald-400">&gt; room_access_id</p>

        <input
          placeholder="ORBIT-8KF2-X91A"
          className="w-full border-b border-zinc-700 bg-transparent pb-3 text-white outline-none placeholder:text-zinc-600 focus:border-emerald-500"
        />
      </div>

      <div className="rounded-lg border border-zinc-800 bg-black p-5">
        <p className="mb-3 text-zinc-500">CONNECTION STATUS</p>

        <div className="space-y-2 text-sm text-emerald-400">
          <p>✓ Waiting for room ID</p>
          <p>✓ Secure tunnel ready</p>
          <p>✓ AI runtime available</p>
        </div>
      </div>

      <Button className="h-14 w-full rounded border border-emerald-500 bg-emerald-500/10 font-mono text-lg text-emerald-400 hover:bg-emerald-500 hover:text-black">
        JOIN ORBIT →
      </Button>
    </div>
  );
}
