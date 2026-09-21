"use client";

import { RotateCcw, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-4 sm:p-6 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-950 p-5 sm:p-8 md:p-10 font-mono"
      >
        <div className="mb-6 sm:mb-8 flex items-center gap-2.5 sm:gap-3 text-red-500">
          <Terminal className="h-5 w-5 sm:h-7 sm:w-7 shrink-0" />
          <span className="text-base sm:text-xl font-bold">FATAL SYSTEM ERROR</span>
        </div>

        <p className="mb-2 sm:mb-4 text-xs sm:text-sm text-red-500">&gt; INTERNAL_EXCEPTION</p>

        <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">SOMETHING WENT WRONG</h1>

        <p className="mb-6 sm:mb-8 text-xs sm:text-sm md:text-base text-zinc-400">
          An unexpected error occurred while processing your request.
        </p>

        <div className="mb-6 sm:mb-8 overflow-auto rounded-lg border border-zinc-800 bg-black p-3.5 sm:p-5 text-xs sm:text-sm">
          <p className="mb-2 text-emerald-400">$ exception.log</p>

          <pre className="whitespace-pre-wrap break-all text-red-400">
            {error.message}
          </pre>
        </div>

        <Button
          onClick={reset}
          className="h-11 sm:h-12 w-full border border-emerald-500 bg-emerald-500/10 font-mono text-xs sm:text-sm text-emerald-400 hover:bg-emerald-500 hover:text-black cursor-pointer transition-all"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          RETRY
        </Button>
      </motion.div>
    </main>
  );
}
