"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { ModeToggle } from "./ui/toggle";
import LiveTime from "./ui/liveTime";
// import { ModeToggle } from "@/components/mode-toggle"; // shadcn theme toggle

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-emerald-500/50 bg-emerald-500/10 transition group-hover:bg-emerald-500/20">
            <Zap className="h-5 w-5 text-emerald-400" />
          </div>

          <div className="leading-tight">
            <h1 className="font-mono text-lg font-bold tracking-wide text-foreground">
              Orbit AI
            </h1>

            <p className="font-mono text-[11px] text-zinc-500">
              Temporary AI Workspace
            </p>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <LiveTime />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
