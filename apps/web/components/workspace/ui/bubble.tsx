import { ChatItem, useChatStore } from "@/store/useChatstore";
import { Bot, Copy, CopyCheck } from "lucide-react";
import React, { useState } from "react";

interface Bubbleprop {
  isBot: boolean;
  isMe: boolean;
  item: ChatItem;
}

export default function Bubble({ isBot, item, isMe }: Bubbleprop) {
  const { loading, error } = useChatStore();
  const [Iscopy, setIscopy] = useState(false);

  const handleCopy = async (message: string) => {
    try {
      await navigator.clipboard.writeText(message);
      setIscopy(true);
      setTimeout(() => setIscopy(false), 1000);
    } catch {
      setIscopy(false);
    }
  };

  return (
    <div key={item.id}>
      {isBot ? (
        <div className="flex gap-3 py-2">
          {/* Avatar */}
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              error ? "bg-red-500/10" : "bg-cyan-500/10"
            }`}
          >
            <Bot
              className={`h-4 w-4 ${error ? "text-red-400" : "text-cyan-400"}`}
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-2">
              <span
                className={`text-sm font-medium ${
                  error ? "text-red-300" : "text-cyan-300"
                }`}
              >
                Orbit AI
              </span>

              <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cyan-300">
                AI
              </span>
            </div>

            {/* Actual streamed message */}
            {item.message && !error && (
              <div className="border-l-2 border-cyan-500/70 pl-4">
                <p className="whitespace-pre-wrap leading-7 text-zinc-200">
                  {item.message}
                </p>
              </div>
            )}

            {/* Loading / Error — SAME PLACE */}
            <div className="mt-3">
              {loading && !error && (
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400" />
                  </span>

                  <span>Orbit AI is thinking...</span>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/5 px-3 py-2 text-sm text-red-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400" />

                  <span>
                    {typeof error === "string"
                      ? error
                      : "Something went wrong while generating the response."}
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            {!error && item.message && (
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => handleCopy(item.message)}
                  className="rounded p-1.5 text-zinc-500 transition hover:bg-zinc-800 hover:text-cyan-400"
                >
                  {Iscopy ? (
                    <CopyCheck className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>

                <span className="ml-auto text-xs text-zinc-600">
                  {new Date(item.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Prompt */}
          <div className="mb-2 flex items-center gap-2 text-sm">
            <span className={isMe ? "text-emerald-400" : "text-cyan-400"}>
              {isMe ? `${item.sender.name}@orbit` : item.sender.name}
            </span>

            <span className="text-zinc-600">{isMe ? "$" : "response:"}</span>
          </div>

          {/* Message */}
          <div
            className={`rounded-lg border px-4 py-3 transition-all ${
              isMe
                ? "border-zinc-800 bg-black/40"
                : "border-emerald-900/50 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.08)]"
            }`}
          >
            <p className="whitespace-pre-wrap leading-7 text-zinc-300">
              {item.message}
            </p>
          </div>

          <div
            className={`mt-2 text-xs ${
              isMe ? "text-right text-zinc-600" : "text-left text-zinc-600"
            }`}
          >
            {new Date(item.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </>
      )}
    </div>
  );
}
