"use client";

import { Users } from "lucide-react";

const members = [
  {
    name: "Rahul",
    online: true,
  },
  {
    name: "Alex",
    online: true,
  },
  {
    name: "Orbit AI",
    online: true,
    ai: true,
  },
];

export default function MemberList({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <aside
      className={`
        relative
        border-r
        border-emerald-900/40
        bg-[#030603]
        transition-all
        duration-300
        ${open ? "w-64" : "w-0 overflow-visible border-none"}
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
          <div className="space-y-3">
            {members.map((member) => (
              <div
                key={member.name}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  border
                  border-transparent
                  p-2
                  transition
                  hover:border-emerald-900
                  hover:bg-emerald-500/5
                "
              >
                {/* Avatar */}
                <div
                  className={`
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    ${
                      member.ai
                        ? "border-cyan-500/40 bg-cyan-500/10"
                        : "border-emerald-500/30 bg-emerald-500/10"
                    }
                  `}
                >
                  {member.ai ? "🤖" : member.name[0]}
                </div>

                <div>
                  <p className="text-sm text-zinc-200">{member.name}</p>

                  <div className="flex items-center gap-2">
                    <span
                      className="
                        h-2
                        w-2
                        animate-pulse
                        rounded-full
                        bg-emerald-400
                      "
                    />

                    <span className="font-mono text-xs text-emerald-500">
                      online
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
