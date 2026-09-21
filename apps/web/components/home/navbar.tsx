"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import LiveTime from "./ui/liveTime";


export default function Navbar() {



  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900/40 bg-[#020402]/90 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.4)]">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2 sm:gap-2.5 transition active:scale-95"
        >
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.2)] transition group-hover:border-emerald-400 group-hover:bg-emerald-500/20">
            <Zap className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-emerald-400" />
          </div>

          <div className="leading-tight">
            <h1 className="font-mono text-xs sm:text-base font-bold tracking-wide text-foreground">
              Orbit AI
            </h1>

            <p className="hidden font-mono text-[10px] sm:text-[11px] text-zinc-500 sm:block">
              Temporary AI Workspace
            </p>
          </div>
        </Link>

        {/* Right Side: Clock & Navigation Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <LiveTime />


        </div>
      </div>
    </header>
  );
}
