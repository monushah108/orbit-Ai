"use client";

import Hero from "@/components/home/hero";
import { Navbar } from "@/components/home/navbar";
import { Button } from "@/components/ui/button";
import { PlayCircle, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* ========================= HERO ========================= */}
      {/* Hero */}
      <Hero />

      {/* ========================= CREATE ROOM ========================= */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#090909]">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 border-b border-zinc-800 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />

            <span className="ml-4 font-mono text-sm text-zinc-500">
              orbit-terminal
            </span>
          </div>

          <div className="space-y-8 p-8 font-mono">
            {/* Generated Room ID */}
            <div>
              <p className="mb-2 text-emerald-400">&gt; generated_room_id</p>

              <div className="flex gap-3">
                <input
                  readOnly
                  value="ORBIT-8KF2-X91A"
                  className="flex-1 border-b border-zinc-700 bg-transparent pb-3 text-white outline-none"
                />

                <Button variant="outline" className="border-zinc-700 font-mono">
                  Generate
                </Button>
              </div>

              <p className="mt-2 text-xs text-zinc-500">
                Unique room identifier generated automatically.
              </p>
            </div>

            {/* Expiry */}
            <div>
              <p className="mb-4 text-emerald-400">&gt; expires_after</p>

              <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
                {["30m", "1h", "6h", "12h", "24h", "Never"].map((time) => (
                  <button
                    key={time}
                    className="rounded border border-zinc-700 py-3 text-sm text-zinc-300 transition hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility */}
            <div>
              <p className="mb-4 text-emerald-400">&gt; visibility</p>

              <div className="grid grid-cols-2 gap-3">
                <button className="rounded border border-emerald-500 bg-emerald-500/10 py-3 text-emerald-400">
                  Private
                </button>

                <button className="rounded border border-zinc-700 py-3 text-zinc-400 hover:border-emerald-500">
                  Public
                </button>
              </div>
            </div>

            {/* Status */}
            <div className="rounded-lg border border-zinc-800 bg-black p-5">
              <p className="mb-3 text-zinc-500">STATUS</p>

              <div className="space-y-2 text-sm text-emerald-400">
                <p>✓ Runtime Ready</p>
                <p>✓ Secure Session</p>
                <p>✓ MDX Environment Loaded</p>
                <p>✓ Temporary Storage Enabled</p>
              </div>
            </div>

            {/* CTA */}
            <Button className="h-14 w-full rounded border border-emerald-500 bg-emerald-500/10 font-mono text-lg text-emerald-400 transition hover:bg-emerald-500 hover:text-black">
              ENTER ORBIT →
            </Button>
          </div>
        </div>
      </section>

      {/* ========================= FOOTER ========================= */}
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
    </div>
  );
}
