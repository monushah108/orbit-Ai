import { SidebarClose, SidebarOpen } from "lucide-react";

export default function ChatArea({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <section className="flex flex-1 flex-col bg-[#050805]">
      {/* Terminal Header */}
      <div className="flex items-center gap-3 border-b border-emerald-900/40 bg-black px-5 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />

        <span className="ml-3 font-mono text-sm text-emerald-500">
          orbit-ai://terminal
        </span>

        {open ? (
          <SidebarClose
            onClick={() => setOpen(false)}
            className="ml-auto h-4 w-4 cursor-pointer text-emerald-600 transition hover:text-emerald-400"
          />
        ) : (
          <SidebarOpen
            onClick={() => setOpen(true)}
            className="ml-auto h-4 w-4 cursor-pointer text-emerald-600 transition hover:text-emerald-400"
          />
        )}
      </div>

      {/* Messages */}
      <div
        className="
        flex-1
        overflow-y-auto
        space-y-6
        p-6
        font-mono
        "
      >
        {/* User Message */}
        <div className="rounded-lg border border-zinc-800 bg-black/40 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm">
            <span className="text-emerald-400">user@orbit</span>

            <span className="text-zinc-600">$</span>
          </div>

          <p className="text-zinc-300">Explain React server components</p>
        </div>

        {/* AI Message */}
        <div
          className="
          rounded-lg
          border
          border-emerald-900/50
          bg-emerald-500/5
          p-4
          shadow-[0_0_30px_rgba(16,185,129,0.08)]
          "
        >
          <div className="mb-2 flex items-center gap-2 text-sm">
            <span className="text-cyan-400">orbit-ai</span>

            <span className="text-zinc-600">response:</span>
          </div>

          <p className="leading-7 text-zinc-300">
            React Server Components allow rendering UI on the server and sending
            only the required payload to the client.
          </p>
        </div>

        {/* Processing */}
        <div className="flex items-center gap-2 text-sm text-emerald-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Orbit AI is thinking...
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-emerald-900/40 bg-black p-5">
        <div
          className="
          flex
          items-center
          rounded-lg
          border
          border-emerald-900
          bg-[#020402]
          px-4
          "
        >
          <span className="mr-3 font-mono text-emerald-500">&gt;</span>

          <input
            placeholder="Ask Orbit AI..."
            className="
            h-12
            flex-1
            bg-transparent
            font-mono
            text-emerald-100
            outline-none
            placeholder:text-zinc-700
            "
          />
        </div>
      </div>
    </section>
  );
}
