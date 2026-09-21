"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

import LiveTime from "./ui/liveTime";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5 sm:gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-md border border-emerald-500/50 bg-emerald-500/10 transition group-hover:bg-emerald-500/20">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
          </div>

          <div className="leading-tight">
            <h1 className="font-mono text-base sm:text-lg font-bold tracking-wide text-foreground">
              Orbit AI
            </h1>

            <p className="hidden font-mono text-[11px] text-zinc-500 sm:block">
              Temporary AI Workspace
            </p>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="#features"
            className="hidden font-mono text-xs text-zinc-400 transition hover:text-emerald-400 md:block"
          >
            Features
          </Link>

          <LiveTime />

          <Button
            asChild
            size="sm"
            className="h-8 sm:h-9 rounded border border-emerald-500/50 bg-emerald-500/10 px-2.5 sm:px-3.5 font-mono text-xs text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all"
          >
            <Link href="/create">&gt; Create Room</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
