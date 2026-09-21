import { Bot } from "lucide-react";

export default function EmptyChatBotState() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-4 sm:p-6 text-center">
      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
        <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
      </div>

      <h2 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-zinc-100">
        Orbit AI is ready
      </h2>

      <p className="mt-1.5 sm:mt-2 max-w-sm text-xs sm:text-sm leading-5 sm:leading-6 text-zinc-400">
        Mention <span className="font-medium text-cyan-400">@bot</span> in your
        message to start a conversation with the AI assistant.
      </p>

      <div className="mt-4 sm:mt-6 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 sm:py-2 font-mono text-xs sm:text-sm text-zinc-300">
        &gt; @bot explain WebSockets
      </div>
    </div>
  );
}
