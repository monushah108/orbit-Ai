"use client";
import useSocket from "@/context/socketProvider";
import { useChatStore } from "@/store/useChatstore";
import { useMemberStore } from "@/store/useMemberstore";
import { Bot, Copy, CopyCheck, SidebarClose, SidebarOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Smile } from "lucide-react";
import { useRoomStore } from "@/store/useRoomstore";
import EmptyChatBotState from "./ui/emptyState";

export default function ChatArea({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [Iscopy, setIscopy] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { chats, typingUsers } = useChatStore();
  const withBot = useRoomStore((s) => s.room?.withBot);
  const { sendMessage, typing, stopTyping } = useSocket();
  const currentUser = useMemberStore((s) => s.user);
  const bottomRef = useRef(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  console.log(chats);

  const isBotMentioned = /(^|\s)@bot\b/i.test(inputValue) && withBot;

  const submitMessage = () => {
    const message = inputValue.trim();
    if (!message) return;

    sendMessage(message);
    setInputValue("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMessage();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    typing();

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      stopTyping();
    }, 1000);
  };

  const handleCopy = async (message: string) => {
    try {
      await navigator.clipboard.writeText(message);
      setIscopy(true);
      setTimeout(() => setIscopy(false), 1000);
    } catch {
      setIscopy(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chats]);

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

      <div className="relative min-h-0 flex-1">
        {/* Top Fade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-[#050805] to-transparent" />

        {/* Bottom Fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-[#050805] to-transparent" />
        {/* Processing */}

        {chats.length === 0 && withBot ? (
          <EmptyChatBotState />
        ) : (
          <ScrollArea className="h-full">
            <div className="space-y-4 px-5 py-4 font-mono">
              {chats.map((chat) => {
                const isMe = chat.sender.id === currentUser?.id;
                const isBot = chat.sender.id === "bot";
                return (
                  <div key={chat.id}>
                    {isBot ? (
                      <div className="flex gap-3 py-2">
                        {/* Avatar */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500/10">
                          <Bot className="h-4 w-4 text-cyan-400" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="mb-3 flex items-center gap-2">
                            <span className="text-sm font-medium text-cyan-300">
                              Orbit AI
                            </span>

                            <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cyan-300">
                              AI
                            </span>
                          </div>

                          <div className="border-l-2 border-cyan-500/70 pl-4">
                            <p className="whitespace-pre-wrap leading-7 text-zinc-200">
                              {chat.message}
                            </p>
                          </div>

                          <div className="mt-3 flex items-center gap-2">
                            <button
                              onClick={() => handleCopy(chat.message)}
                              className="rounded p-1.5 text-zinc-500 transition hover:bg-zinc-800 hover:text-cyan-400"
                            >
                              {Iscopy ? (
                                <CopyCheck className="h-3.5 w-3.5" />
                              ) : (
                                <Copy className="h-3.5 w-3.5" />
                              )}
                            </button>

                            <span className="ml-auto text-xs text-zinc-600">
                              {new Date(chat.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Prompt */}
                        <div className="mb-2 flex items-center gap-2 text-sm">
                          <span
                            className={
                              isMe ? "text-emerald-400" : "text-cyan-400"
                            }
                          >
                            {isMe
                              ? `${chat.sender.name}@orbit`
                              : chat.sender.name}
                          </span>

                          <span className="text-zinc-600">
                            {isMe ? "$" : "response:"}
                          </span>
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
                            {chat.message}
                          </p>
                        </div>
                        <div
                          className={`text-xs mt-2 ${
                            isMe
                              ? "text-right text-zinc-600"
                              : "text-left text-zinc-600"
                          }`}
                        >
                          {new Date(chat.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}

              <div ref={bottomRef} />
            </div>
          </ScrollArea>
        )}
      </div>
      {typingUsers.length > 0 && (
        <div className="px-4 py-2 text-xs font-mono text-emerald-400 animate-pulse">
          {typingUsers.map((u) => u.name).join(", ")}{" "}
          {typingUsers.length === 1 ? "is typing..." : "are typing..."}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => e.key == "enter" && handleSubmit(e)}
        className="border-t border-emerald-900/40 bg-black p-5"
      >
        <div
          className={`relative flex items-center rounded-lg border px-4 transition-all duration-300 ${
            isBotMentioned
              ? "border-cyan-400 bg-cyan-500/5 shadow-[0_0_25px_rgba(34,211,238,0.18)] ring-1 ring-cyan-400/40"
              : "border-emerald-900 bg-[#020402]"
          }`}
        >
          <button
            type="button"
            onClick={() => setShowEmojiPicker((v) => !v)}
            className="mr-3 text-zinc-500 transition hover:text-emerald-400"
          >
            <Smile className="h-5 w-5" />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-16 left-0 overflow-hidden rounded-xl border border-emerald-900 bg-[#050805] shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              <EmojiPicker
                theme={Theme.DARK}
                lazyLoadEmojis
                onEmojiClick={(emoji) => {
                  setInputValue((prev) => prev + emoji.emoji);
                  setShowEmojiPicker(false);
                }}
              />
            </div>
          )}
          <span
            className={`mr-3 font-mono transition-colors ${
              isBotMentioned ? "text-cyan-400" : "text-emerald-500"
            }`}
          >
            &gt;
          </span>

          <input
            value={inputValue}

            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitMessage();
              }
            }}
            placeholder={
              isBotMentioned ? "Ask Orbit AI..." : "Message the room..."
            }
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
          {isBotMentioned && (
            <div className="ml-3 flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-1">
              <Bot className="h-3 w-3 text-cyan-400" />
              <span className="text-xs font-medium text-cyan-300">AI</span>
            </div>
          )}
        </div>
      </form>
    </section>
  );
}
