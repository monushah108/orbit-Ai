"use client";

import { useEffect, useState } from "react";
import CreateRoom from "./createRoom";
import JoinRoom from "./joinRoom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import getUser from "@/lib/randomUser";
import { useMemberStore } from "@/store/useMemberstore";
import { Check, LogIn, Pencil, Plus } from "lucide-react";

export default function RoomTerminal() {
  const [mode, setMode] = useState<"create" | "join">("create");

  const user = useMemberStore((s) => s.user);
  const setUser = useMemberStore((s) => s.setUser);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");

  useEffect(() => {
    if (!user) {
      setUser(getUser());
    }
  }, [user, setUser]);

  useEffect(() => {
    setName(user?.name ?? "");
  }, [user]);

  const saveName = () => {
    if (!user) return;

    const trimmed = name.trim();

    if (!trimmed) {
      setName(user.name);
      setEditing(false);
      return;
    }

    if (trimmed === user.name) {
      setEditing(false);
      return;
    }

    setUser({
      ...user,
      name: trimmed,
    });

    setEditing(false);
  };

  return (
    <div
      className="
        flex
        w-full
        max-w-md
        sm:max-w-lg
        md:max-w-xl
        flex-col
        overflow-hidden
        rounded-2xl
        border border-emerald-500/20
        bg-[#050805]/95
        backdrop-blur-xl
        shadow-[0_0_50px_rgba(16,185,129,0.08)]
        transition-all
      "
    >
      {/* Terminal Header */}
      <div className="flex h-11 items-center justify-between border-b border-emerald-900/40 bg-black/80 px-3 sm:px-4">
        <div className="flex items-center gap-2">
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/90 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/90 shadow-[0_0_6px_rgba(234,179,8,0.5)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/90 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
          </div>

          <span className="ml-2 truncate font-mono text-xs text-zinc-400">
            orbit-terminal // session-init
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">ONLINE</span>
        </div>
      </div>

      {/* Toggle */}
      <div className="border-b border-zinc-800/80 p-2.5 sm:p-3 bg-black/40">
        <div className="grid grid-cols-2 gap-1 rounded-lg border border-zinc-800/80 bg-black p-1">
          <button
            type="button"
            onClick={() => setMode("create")}
            className={`
              flex items-center justify-center gap-1.5
              h-9
              rounded-md
              px-2
              font-mono
              text-xs
              sm:text-sm
              font-medium
              transition-all
              ${
                mode === "create"
                  ? "bg-emerald-500/15 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] border border-emerald-500/30"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300 border border-transparent"
              }
            `}
          >
            <Plus className="h-3.5 w-3.5" />
            Create Room
          </button>

          <button
            type="button"
            onClick={() => setMode("join")}
            className={`
              flex items-center justify-center gap-1.5
              h-9
              rounded-md
              px-2
              font-mono
              text-xs
              sm:text-sm
              font-medium
              transition-all
              ${
                mode === "join"
                  ? "bg-emerald-500/15 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] border border-emerald-500/30"
                  : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300 border border-transparent"
              }
            `}
          >
            <LogIn className="h-3.5 w-3.5" />
            Join Room
          </button>
        </div>
      </div>

      {/* Identity */}
      {user && (
        <div className="mx-3 my-2.5 sm:mx-4 sm:my-3 rounded-lg border border-emerald-900/40 bg-black/40 p-2.5 sm:p-3">
          <div className="flex min-w-0 items-center gap-3">
            {/* Avatar */}
            <Avatar className="h-9 w-9 shrink-0 sm:h-10 sm:w-10 ring-1 ring-emerald-500/30">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-emerald-500/10 font-mono text-emerald-400 text-xs">
                OR
              </AvatarFallback>
            </Avatar>

            {/* Identity info */}
            <div className="min-w-0 flex-1">
              <p className="mb-0.5 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                Identity Profile
              </p>

              <div className="flex min-w-0 items-center gap-2">
                {editing ? (
                  <div className="flex items-center gap-1.5 w-full">
                    <input
                      autoFocus
                      value={name}
                      maxLength={20}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={saveName}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveName();
                        if (e.key === "Escape") {
                          setEditing(false);
                          setName(user.name);
                        }
                      }}
                      className="
                        min-w-0
                        flex-1
                        max-w-48
                        border-b
                        border-emerald-500
                        bg-transparent
                        py-0.5
                        font-mono
                        text-sm
                        text-emerald-400
                        outline-none
                        sm:text-base
                      "
                    />
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        saveName();
                      }}
                      className="rounded p-1 text-emerald-400 hover:bg-emerald-500/20 transition"
                      title="Save"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="min-w-0 truncate font-mono text-sm text-emerald-400 sm:text-base font-medium">
                      {user.name}
                    </h2>

                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      aria-label="Edit username"
                      className="
                        shrink-0
                        rounded-md
                        p-1
                        text-zinc-500
                        transition
                        hover:bg-zinc-800
                        hover:text-emerald-400
                      "
                    >
                      <Pencil className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Forms */}
      <div className="min-w-0">
        {mode === "create" ? <CreateRoom /> : <JoinRoom />}
      </div>
    </div>
  );
}
