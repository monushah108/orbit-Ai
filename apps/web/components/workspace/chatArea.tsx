"use client";
import useSocket from "@/context/socketProvider";
import { useChatStore } from "@/store/useChatstore";
import { useMemberStore } from "@/store/useMemberstore";
import { Bot, Send, SidebarClose, SidebarOpen, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
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
      behavior: "auto",
    });
  }, [chats]);

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-1 flex-col bg-[#050805]">
      {/* Terminal Header */}

      <div className="flex h-11 items-center border-b border-zinc-800 bg-black px-3 sm:px-4">
        {/* Terminal name */}
        <div className="flex items-center gap-2">
          {" "}
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span className="truncate font-mono text-xs text-emerald-500 sm:text-sm">
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
            {open ? (
              <SidebarClose
                onClick={() => setOpen(false)}
                className="
            h-4
            w-4
            cursor-pointer
            text-emerald-600
            transition
            hover:text-emerald-400
          "
              />
            ) : (
              <SidebarOpen
                onClick={() => setOpen(true)}
                className="
            h-4
            w-4
            cursor-pointer
            text-emerald-600
            transition
            hover:text-emerald-400
          "
              />
            )}
          </div>
        </div>
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
          </ScrollArea>
        )}
      </div>
      {typingUsers.length > 0 && (
        <div className="px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-mono text-emerald-400 animate-pulse">
          {typingUsers.map((u) => u.name).join(", ")}{" "}
          {typingUsers.length === 1 ? "is typing..." : "are typing..."}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => e.key == "enter" && handleSubmit(e)}
        className="border-t border-emerald-900/40 bg-black p-2.5 sm:p-4 md:p-5"
      >
        <div
          className={`relative flex items-center rounded-lg border px-2.5 sm:px-4 transition-all duration-300 ${
            isBotMentioned
              ? "border-cyan-400 bg-cyan-500/5 shadow-[0_0_25px_rgba(34,211,238,0.18)] ring-1 ring-cyan-400/40"
              : "border-emerald-900 bg-[#020402]"
          }`}
        >
          <button
            type="button"
            onClick={() => setShowEmojiPicker((v) => !v)}
            className="mr-2 sm:mr-3 text-zinc-500 transition hover:text-emerald-400 shrink-0"
            title="Add emoji"
          >
            <Smile className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-14 sm:bottom-16 left-0 z-30 max-w-[calc(100vw-2rem)] sm:max-w-sm overflow-hidden rounded-xl border border-emerald-900 bg-[#050805] shadow-[0_0_30px_rgba(16,185,129,0.15)]">
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
              h-10
              sm:h-12
              min-w-0
              flex-1
              bg-transparent
              font-mono
              text-xs
              sm:text-sm
              text-emerald-100
              outline-none
              placeholder:text-zinc-700
              placeholder:text-xs
              sm:placeholder:text-sm
            "
          />

          {isBotMentioned && (
            <div className="mx-1.5 flex shrink-0 items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 sm:py-1">
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
              h-8
              w-8
              sm:h-9
              sm:w-9
              shrink-0
              items-center
              justify-center
              rounded-md
              transition-all
              ${
                inputValue.trim()
                  ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black cursor-pointer"
                  : "text-zinc-600 cursor-not-allowed opacity-40"
              }
            `}
          >
            <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </form>
    </section>
  );
}
