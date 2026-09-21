"use client";

import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import LiveTime from "./ui/liveTime";
import { Button } from "../ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const isCreatePage = pathname === "/create";

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
          {!isCreatePage && (
            <Link
              href="#features"
              className="hidden font-mono text-xs text-zinc-400 transition hover:text-emerald-400 md:block"
            >
              Features
            </Link>
          )}

          {/* Live System Clock (Kept on both Mobile & Desktop) */}
          <LiveTime />

          {isCreatePage ? (
            <Button
              asChild
              size="sm"
              className="h-7 sm:h-8.5 rounded-lg border border-zinc-800 bg-zinc-900/80 px-2 sm:px-3 font-mono text-xs text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white transition-all active:scale-95"
            >
              <Link href="/" className="flex items-center gap-1">
                <ArrowLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="hidden xs:inline">Home</span>
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              size="sm"
              className="h-7 sm:h-8.5 rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-2 sm:px-3.5 font-mono text-xs text-emerald-400 hover:bg-emerald-500 hover:text-black shadow-[0_0_12px_rgba(16,185,129,0.15)] transition-all active:scale-95"
            >
              <Link href="/create">&gt; Create Room</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
