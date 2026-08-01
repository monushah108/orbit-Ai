"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

      <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-12 text-center md:py-16">
        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-5 flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 font-mono text-xs text-zinc-400"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          READY TO CREATE ROOM
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="max-w-4xl font-mono text-4xl font-bold leading-tight text-white md:text-6xl"
        >
          Create Temporary
          <br />
          <span className="text-emerald-400">
            AI Workspaces
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              className="ml-1 inline-block h-[1em] w-[2px] bg-emerald-400 align-middle"
            />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-5 max-w-2xl font-mono text-sm leading-7 text-zinc-500 md:text-base"
        >
          Generate a secure room ID, choose how long your workspace should stay
          alive, and collaborate instantly. No sign-up required.
        </motion.p>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-10 w-full max-w-3xl overflow-hidden rounded-xl border border-zinc-800 bg-[#090909]"
        >
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />

            <span className="ml-3 font-mono text-xs text-zinc-500">
              orbit-terminal
            </span>
          </div>

          {/* Output */}
          <div className="space-y-2 p-5 text-left font-mono text-sm">
            <p className="text-emerald-400">$ orbit create-room</p>

            <p className="text-zinc-500">Initializing temporary workspace...</p>

            <p className="text-zinc-500">Loading AI runtime...</p>

            <p className="text-zinc-500">Generating secure room ID...</p>

            <p className="text-emerald-400">✔ Waiting for configuration.</p>

            <div className="flex items-center">
              <span className="text-emerald-400">$</span>

              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                }}
                className="ml-2 h-4 w-[2px] bg-emerald-400"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
