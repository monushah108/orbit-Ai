import { Clock, Terminal, Users } from "lucide-react";

const features = [
  {
    number: "01",
    icon: Terminal,
    title: "Instant AI Rooms",
    description:
      "Create a temporary AI workspace with a unique room ID and start instantly.",
  },
  {
    number: "02",
    icon: Clock,
    title: "Automatic Expiry",
    description:
      "Rooms clean themselves after the selected time limit for better privacy.",
  },
  {
    number: "03",
    icon: Users,
    title: "Collaborate Together",
    description: "Share your room ID and work with others in real-time.",
  },
];

export default function Features() {
  return (
    <section id="features" className="border-y border-zinc-800 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mb-8 sm:mb-12">
          <p className="font-mono text-xs sm:text-sm text-emerald-400">./features</p>

          <h2 className="mt-2 sm:mt-3 font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Built for temporary AI sessions
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Feature Cards */}
          <div className="grid gap-4 sm:gap-5">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-6 transition hover:border-emerald-500/40"
                >
                  <div className="flex gap-3.5 sm:gap-5">
                    <div className="font-mono text-xs sm:text-sm text-emerald-400">
                      [{item.number}]
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 sm:mb-3 flex items-center gap-2.5 sm:gap-3">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 shrink-0" />

                        <h3 className="font-mono text-sm sm:text-base font-semibold text-white">
                          {item.title}
                        </h3>
                      </div>

                      <p className="font-mono text-xs sm:text-sm leading-5 sm:leading-6 text-zinc-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terminal Preview */}
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#090909]">
            <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5 sm:px-5 sm:py-3">
              <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500" />
              <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-500" />
              <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500" />

              <span className="ml-2 sm:ml-3 font-mono text-[11px] sm:text-xs text-zinc-500">
                orbit-runtime
              </span>
            </div>

            <div className="overflow-x-auto space-y-3 sm:space-y-4 p-4 sm:p-6 font-mono text-xs sm:text-sm">
              <p className="text-emerald-400">$ orbit create</p>

              <p className="text-zinc-400">Initializing workspace...</p>

              <p className="text-zinc-400">Generating secure room ID...</p>

              <p className="text-emerald-400">✓ Room created successfully</p>

              <div className="mt-4 sm:mt-6 rounded border border-zinc-800 bg-black p-3.5 sm:p-4">
                <p className="text-[11px] sm:text-xs text-zinc-500">ROOM_ID</p>

                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-white break-all font-mono">
                  ORB-7F29-X92A
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
