import { Bot } from "lucide-react";

export default function EmptyChatBotState() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
        <Bot className="h-6 w-6 text-cyan-400" />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-zinc-100">
        Orbit AI is ready
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-400">
        Mention <span className="font-medium text-cyan-400">@bot</span> in your
        message to start a conversation with the AI assistant.
      </p>

      <div className="mt-6 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-300">
        &gt; @bot explain WebSockets
      </div>
    </div>
  );
}
