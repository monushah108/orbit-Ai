"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-4 sm:p-6 text-zinc-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-950 p-5 sm:p-8 md:p-10 font-mono shadow-2xl"
      >
        <div className="mb-6 sm:mb-8 flex items-center gap-2.5 sm:gap-3 text-emerald-400">
          <AlertTriangle className="h-5 w-5 sm:h-7 sm:w-7 shrink-0" />
          <span className="text-base sm:text-xl font-bold">SYSTEM TERMINAL</span>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm text-red-500">&gt; ERROR 404</p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">ROOM NOT FOUND</h1>

          <p className="leading-relaxed text-xs sm:text-sm md:text-base text-zinc-400">
            The requested room doesn't exist, has expired, or you don't have
            permission to access it.
          </p>

          <div className="mt-6 sm:mt-8 rounded-lg border border-zinc-800 bg-black p-3.5 sm:p-5 text-xs sm:text-sm">
            <p className="text-emerald-400">$ searching_room...</p>
            <p className="text-zinc-500">✔ Connecting...</p>
            <p className="text-zinc-500">✔ Validating...</p>
            <p className="text-red-500">✖ Room could not be located.</p>
          </div>

          <Button asChild className="mt-6 sm:mt-8 h-11 sm:h-12 w-full border border-emerald-500 bg-emerald-500/10 font-mono text-xs sm:text-sm text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all">
            <Link href="/">
              RETURN TO DASHBOARD →
            </Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
