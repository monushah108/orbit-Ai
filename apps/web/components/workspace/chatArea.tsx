"use client";
import useSocket from "@/context/socketProvider";
import { useChatStore } from "@/store/useChatstore";
import { useMemberStore } from "@/store/useMemberstore";
import { Bot, Send, SidebarClose, SidebarOpen, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useRoomStore } from "@/store/useRoomstore";
import EmptyChatBotState from "./ui/emptyState";
import Bubble from "./ui/bubble";
import { Mobile } from "./ui/mobile";

export default function ChatArea({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { chats, typingUsers } = useChatStore();
  const withBot = useRoomStore((s) => s.room?.withBot);
  const { sendMessage, typing, stopTyping } = useSocket();
  const currentUser = useMemberStore((s) => s.user);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const isBotMentioned = /(^|\s)@bot\b/i.test(inputValue) && withBot;

  const submitMessage = () => {
    const message = inputValue.trim();
    if (!message) return;

    sendMessage(message);
    setInputValue("");
    setShowEmojiPicker(false);
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chats]);

  useEffect(() => {
    if (!showEmojiPicker) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".emoji-picker-wrapper")) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker]);

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-1 flex-col bg-[#050805] no-scrollbar">
      {/* Terminal Header */}
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-emerald-900/40 bg-black/90 px-3 sm:px-4">
        {/* Terminal name */}
        <div className="flex items-center gap-2">
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/90 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/90 shadow-[0_0_6px_rgba(234,179,8,0.5)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/90 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
          </div>

          <span className="truncate font-mono text-xs sm:text-sm text-emerald-400 font-medium">
            orbit-ai://terminal
          </span>
        </div>

        {/* Controls */}
        <div className="ml-auto flex items-center gap-1">
          {/* Mobile members */}
          <div className="md:hidden">
            <Mobile />
          </div>

          {/* Desktop sidebar */}
          <div className="hidden md:flex">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="rounded p-1 text-zinc-500 hover:bg-zinc-800 hover:text-emerald-400 transition cursor-pointer"
              title={open ? "Hide members log" : "Show members log"}
            >
              {open ? (
                <SidebarClose className="h-4 w-4" />
              ) : (
                <SidebarOpen className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {/* Top Fade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 sm:h-8 bg-gradient-to-b from-[#050805] to-transparent" />

        {/* Bottom Fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 sm:h-8 bg-gradient-to-t from-[#050805] to-transparent" />

        {chats.length === 0 && withBot ? (
          <EmptyChatBotState />
        ) : (
          <div className="h-full overflow-y-auto no-scrollbar scroll-smooth">
            <div className="space-y-3 sm:space-y-4 px-3 sm:px-5 py-3 sm:py-4 font-mono">
              {chats.map((item) => {
                const isMe = item.sender.id === currentUser?.id;
                const isBot = item.sender.id === "bot";

                return (
                  <Bubble key={item.id} isMe={isMe} isBot={isBot} item={item} />
                );
              })}

              <div ref={bottomRef} />
            </div>
          </div>
        )}
      </div>

      {/* Typing Indicator */}
      {typingUsers.length > 0 && (
        <div className="px-3 sm:px-4 py-1.5 text-[11px] font-mono text-emerald-400/90 flex items-center gap-2 shrink-0 bg-black/40 border-t border-zinc-900">
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-400" />
          </span>
          <span>
            {typingUsers.map((u) => u.name).join(", ")}{" "}
            {typingUsers.length === 1 ? "is typing..." : "are typing..."}
          </span>
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-emerald-900/40 bg-black/90 p-2 sm:p-3 md:p-3.5 shrink-0"
      >
        <div
          className={`relative flex items-center rounded-xl border px-2.5 sm:px-3.5 transition-all duration-300 ${
            isBotMentioned
              ? "border-cyan-400 bg-cyan-500/5 shadow-[0_0_25px_rgba(34,211,238,0.18)] ring-1 ring-cyan-400/40"
              : "border-emerald-900/60 bg-[#020402] focus-within:border-emerald-500/60 focus-within:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
          }`}
        >
          <div className="emoji-picker-wrapper relative">
            <button
              type="button"
              onClick={() => setShowEmojiPicker((v) => !v)}
              className="mr-2 sm:mr-3 text-zinc-500 transition hover:text-emerald-400 shrink-0"
              title="Add emoji"
            >
              <Smile className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-12 sm:bottom-14 left-0 z-40 max-w-[calc(100vw-2rem)] sm:max-w-sm overflow-hidden rounded-xl border border-emerald-900 bg-[#050805] shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <EmojiPicker
                  theme={Theme.DARK}
                  lazyLoadEmojis
                  width="100%"
                  onEmojiClick={(emoji) => {
                    setInputValue((prev) => prev + emoji.emoji);
                    setShowEmojiPicker(false);
                  }}
                />
              </div>
            )}
          </div>

          <span
            className={`mr-2 sm:mr-3 font-mono text-xs sm:text-sm transition-colors shrink-0 ${
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
              h-9
              sm:h-11
              min-w-0
              flex-1
              bg-transparent
              font-mono
              text-xs
              sm:text-sm
              text-emerald-100
              outline-none
              placeholder:text-zinc-600
              placeholder:text-xs
              sm:placeholder:text-sm
            "
          />

          {isBotMentioned && (
            <div className="mx-1.5 flex shrink-0 items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5">
              <Bot className="h-3 w-3 text-cyan-400" />
              <span className="text-[10px] sm:text-xs font-medium text-cyan-300">AI</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!inputValue.trim()}
            aria-label="Send message"
            className={`
              ml-1.5
              flex
              h-7
              w-7
              sm:h-8
              sm:w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              transition-all
              ${
                inputValue.trim()
                  ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                  : "text-zinc-700 cursor-not-allowed opacity-40"
              }
            `}
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </section>
  );
}
