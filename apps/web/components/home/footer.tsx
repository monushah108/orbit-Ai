import { Zap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-6 sm:py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded border border-emerald-500 bg-emerald-500/10">
            <Zap className="h-4 w-4 text-emerald-400" />
          </div>

          <div>
            <p className="font-mono text-sm sm:text-base text-white">Orbit AI</p>
            <p className="text-[11px] sm:text-xs text-zinc-500">Temporary AI Workspace</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 font-mono text-xs sm:text-sm text-zinc-500">
          <Link href="#" className="transition-colors hover:text-emerald-400">GitHub</Link>
          <Link href="#" className="transition-colors hover:text-emerald-400">Documentation</Link>
          <Link href="#" className="transition-colors hover:text-emerald-400">Discord</Link>
          <Link href="#" className="transition-colors hover:text-emerald-400">X</Link>
        </div>
      </div>
    </footer>
  );
}
