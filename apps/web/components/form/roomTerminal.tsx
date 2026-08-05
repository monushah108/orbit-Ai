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
    <section className="mx-auto max-w-xl px-6 py-16 ">
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#090909]">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 border-b border-zinc-800 px-3 py-3 md:px-5">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />

          <span className="ml-4 font-mono text-sm text-zinc-500">
            orbit-terminal
          </span>
        </div>

        {/* Toggle */}
        <div className="border-b border-zinc-800 p-4">
          <div className="grid grid-cols-2 rounded-lg border border-zinc-800 bg-black p-1">
            <button
              onClick={() => setMode("create")}
              className={`rounded-md py-2 font-mono text-sm transition ${
                mode === "create"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Create Room
            </button>

            <button
              onClick={() => setMode("join")}
              className={`rounded-md py-2 font-mono text-sm transition ${
                mode === "join"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Join Room
            </button>
          </div>
        </div>

        {user && (
          <div className="mx-2 my-3 flex items-center justify-between rounded-lg border border-emerald-900/50 bg-black/40 p-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>OR</AvatarFallback>
              </Avatar>

              <div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Identity
                  </p>

                  <div className="flex items-center gap-2">
                    {editing ? (
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
                        className="w-44 border-b border-emerald-500 bg-transparent font-mono text-lg text-emerald-400 outline-none"
                      />
                    ) : (
                      <>
                        <h2 className="font-mono text-lg text-emerald-400">
                          {user.name}
                        </h2>

                        <button
                          onClick={() => setEditing(true)}
                          className="rounded p-1 text-zinc-500 transition hover:bg-zinc-800 hover:text-emerald-400"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Forms */}
        <div>{mode === "create" ? <CreateRoom /> : <JoinRoom />}</div>
      </div>
    </section>
  );
}
