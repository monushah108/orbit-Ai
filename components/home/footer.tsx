import { Zap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded border border-emerald-500 bg-emerald-500/10">
            <Zap className="h-4 w-4 text-emerald-400" />
          </div>

          <div>
            <p className="font-mono text-white">Orbit AI</p>
            <p className="text-xs text-zinc-500">Temporary AI Workspace</p>
          </div>
        </div>

        <div className="flex items-center gap-8 font-mono text-sm text-zinc-500">
          <Link href="#">GitHub</Link>
          <Link href="#">Documentation</Link>
          <Link href="#">Discord</Link>
          <Link href="#">X</Link>
        </div>
      </div>
    </footer>
  );
}
