"use client";

import { Member, useMemberStore } from "@/store/useMemberstore";
import { HeadphoneOff, Headphones, Mic, MicOff, Users } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import useSocket from "@/context/socketProvider";

export default function MemberList({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { members } = useMemberStore();
  const { Onmute, Ondeafened } = useSocket();

  console.log(members);

  const handleVoice = (action: string, member: Member) => {
    switch (action) {
      case "mic":
        console.log("mic", !member.mute);
        Onmute(!member.mute);
        break;
      case "head":
        console.log("deafen", !member.deafen);
        Ondeafened(!member.deafen);
        break;
    }
  };

  return (
    <aside
      className={`
  relative
  border-r
  border-emerald-900/40
  bg-[#030603]
  transition-all
  duration-300
  ${open ? "w-full max-w-[320px] sm:w-72 lg:w-80" : "w-0 overflow-hidden border-none"}
`}
    >
      {/* Content */}
      {open && (
        <div className="p-5">
          {/* Header */}
          <div className="mb-6 flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-400" />

            <h2 className="font-mono text-sm text-emerald-400">members.log</h2>
          </div>

          {/* Members */}

          {members.map((member: Member) => {
            const isMe = member.id === useMemberStore.getState().user?.id;

            return (
              <div
                key={member.id}
                className="
        flex
        items-center
        gap-3
        rounded-lg
        border
        border-transparent
        p-3
        transition
        hover:border-emerald-900
        hover:bg-emerald-500/5
      "
              >
                <Avatar className="h-10 w-10 shrink-0 border border-emerald-900/40">
                  <AvatarImage src={member.avatar} />
                </Avatar>

                <div className="min-w-0 flex-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <p
                      className="truncate text-sm font-medium text-zinc-100"
                      title={member.name}
                    >
                      {member.name}
                    </p>

                    {isMe && (
                      <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-mono text-emerald-400">
                        ME
                      </span>
                    )}
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                    <span className="font-mono text-xs text-zinc-500">
                      Online
                    </span>
                  </div>
                </div>

                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => isMe && handleVoice("mic", member)}
                    disabled={!isMe}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-emerald-900/30 bg-black/40 transition hover:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {member.mute ? (
                      <Mic className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <MicOff className="h-4 w-4 text-zinc-500" />
                    )}
                  </button>

                  <button
                    onClick={() => isMe && handleVoice("head", member)}
                    disabled={!isMe}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-emerald-900/30 bg-black/40 transition hover:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {member.deafen ? (
                      <HeadphoneOff className="h-4 w-4 text-red-400" />
                    ) : (
                      <Headphones className="h-4 w-4 text-emerald-400" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}
