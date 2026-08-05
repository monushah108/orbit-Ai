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
    <section id="features" className="border-y border-zinc-800 py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mb-12">
          <p className="font-mono text-sm text-emerald-400">./features</p>

          <h2 className="mt-3 font-mono text-4xl font-bold text-white">
            Built for temporary AI sessions
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Feature Cards */}
          <div className="grid gap-5">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-emerald-500/40"
                >
                  <div className="flex gap-5">
                    <div className="font-mono text-sm text-emerald-400">
                      [{item.number}]
                    </div>

                    <div>
                      <div className="mb-3 flex items-center gap-3">
                        <Icon className="h-5 w-5 text-emerald-400" />

                        <h3 className="font-mono font-semibold text-white">
                          {item.title}
                        </h3>
                      </div>

                      <p className="font-mono text-sm leading-6 text-zinc-500">
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
            <div className="flex items-center gap-2 border-b border-zinc-800 px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />

              <span className="ml-3 font-mono text-xs text-zinc-500">
                orbit-runtime
              </span>
            </div>

            <div className="space-y-4 p-6 font-mono text-sm">
              <p className="text-emerald-400">$ orbit create</p>

              <p className="text-zinc-400">Initializing workspace...</p>

              <p className="text-zinc-400">Generating secure room ID...</p>

              <p className="text-emerald-400">✓ Room created successfully</p>

              <div className="mt-6 rounded border border-zinc-800 bg-black p-4">
                <p className="text-zinc-500">ROOM_ID</p>

                <p className="mt-2 text-white">ORB-7F29-X92A</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
