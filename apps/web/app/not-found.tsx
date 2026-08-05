"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-zinc-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-950 p-10 font-mono shadow-2xl"
      >
        <div className="mb-8 flex items-center gap-3 text-emerald-400">
          <AlertTriangle className="h-7 w-7" />
          <span className="text-xl font-bold">SYSTEM TERMINAL</span>
        </div>

        <div className="space-y-4">
          <p className="text-red-500">&gt; ERROR 404</p>

          <h1 className="text-4xl font-bold text-white">ROOM NOT FOUND</h1>

          <p className="leading-relaxed text-zinc-400">
            The requested room doesn't exist, has expired, or you don't have
            permission to access it.
          </p>

          <div className="mt-8 rounded-lg border border-zinc-800 bg-black p-5 text-sm">
            <p className="text-emerald-400">$ searching_room...</p>
            <p className="text-zinc-500">✔ Connecting...</p>
            <p className="text-zinc-500">✔ Validating...</p>
            <p className="text-red-500">✖ Room could not be located.</p>
          </div>

          <Link href="/">
            <Button className="mt-8 w-full border border-emerald-500 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black">
              RETURN TO DASHBOARD →
            </Button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
