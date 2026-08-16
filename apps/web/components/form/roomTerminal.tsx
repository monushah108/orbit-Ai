"use client";

import { useEffect, useState } from "react";
import CreateRoom from "./createRoom";
import JoinRoom from "./joinRoom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import getUser from "@/lib/randomUser";
import { useMemberStore } from "@/store/useMemberstore";
import { Pencil } from "lucide-react";

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
    <section className="flex min-h-screen w-full items-center justify-center bg-[#020402] px-3 py-4 sm:px-6 sm:py-8">
      <div
        className="
          flex
          w-full
          max-w-xl
          flex-col
          overflow-hidden
          rounded-xl
          border border-emerald-900/40
          bg-[#050805]
          shadow-[0_0_60px_rgba(16,185,129,0.05)]
        "
      >
        {/* Terminal Header */}
        <div className="flex h-12 items-center border-b border-emerald-900/40 bg-black px-3 sm:px-5">
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500 sm:h-3 sm:w-3" />
          </div>

          <span className="ml-3 truncate font-mono text-xs text-zinc-500 sm:ml-4 sm:text-sm">
            orbit-terminal
          </span>
        </div>

        {/* Toggle */}
        <div className="border-b border-zinc-800 p-3 sm:p-4">
          <div className="grid grid-cols-2 gap-1 rounded-lg border border-zinc-800 bg-black p-1">
            <button
              type="button"
              onClick={() => setMode("create")}
              className={`
                min-h-10
                rounded-md
                px-2
                py-2
                font-mono
                text-xs
                transition
                sm:text-sm
                ${
                  mode === "create"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
                }
              `}
            >
              Create Room
            </button>

            <button
              type="button"
              onClick={() => setMode("join")}
              className={`
                min-h-10
                rounded-md
                px-2
                py-2
                font-mono
                text-xs
                transition
                sm:text-sm
                ${
                  mode === "join"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
                }
              `}
            >
              Join Room
            </button>
          </div>
        </div>

        {/* Identity */}
        {user && (
          <div className="mx-3 my-3 rounded-lg border border-emerald-900/50 bg-black/40 p-3 sm:mx-4 sm:my-4 sm:p-4">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              {/* Avatar */}
              <Avatar className="h-10 w-10 shrink-0 sm:h-12 sm:w-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-emerald-500/10 font-mono text-emerald-400">
                  OR
                </AvatarFallback>
              </Avatar>

              {/* Identity info */}
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-zinc-600 sm:text-xs">
                  Identity
                </p>

                <div className="flex min-w-0 items-center gap-2">
                  {editing ? (
                    <input
                      autoFocus
                      value={name}
                      maxLength={20}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={saveName}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveName();
                        }

                        if (e.key === "Escape") {
                          setEditing(false);
                          setName(user.name);
                        }
                      }}
                      className="
                        min-w-0
                        w-full
                        max-w-60
                        border-b
                        border-emerald-500
                        bg-transparent
                        py-0.5
                        font-mono
                        text-base
                        text-emerald-400
                        outline-none
                        sm:text-lg
                      "
                    />
                  ) : (
                    <>
                      <h2 className="min-w-0 truncate font-mono text-base text-emerald-400 sm:text-lg">
                        {user.name}
                      </h2>

                      <button
                        type="button"
                        onClick={() => setEditing(true)}
                        aria-label="Edit username"
                        className="
                          shrink-0
                          rounded-md
                          p-1.5
                          text-zinc-500
                          transition
                          hover:bg-zinc-800
                          hover:text-emerald-400
                        "
                      >
                        <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Forms */}
        <div className="min-w-0 px-3 pb-4 sm:px-4 sm:pb-5">
          {mode === "create" ? <CreateRoom /> : <JoinRoom />}
        </div>
      </div>
    </section>
  );
}
