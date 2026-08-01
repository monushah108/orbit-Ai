import { Clock, Users, Zap } from "lucide-react";

export default function Header() {
  return (
    <header
      className="
h-14
border-b
border-zinc-800
flex
items-center
justify-between
px-5
bg-black
font-mono
"
    >
      <div className="flex items-center gap-3">
        <div
          className="
h-8
w-8
border
border-emerald-500
bg-emerald-500/10
flex
items-center
justify-center
"
        >
          <Zap className="h-4 w-4 text-emerald-400" />
        </div>

        <span>Orbit AI</span>
      </div>

      <div
        className="
flex
items-center
gap-6
text-sm
text-zinc-400
"
      >
        <div className="flex gap-2 items-center">
          <Clock className="h-4 w-4" />
          45m left
        </div>

        <div className="flex gap-2 items-center">
          <Users className="h-4 w-4" />3 members
        </div>
      </div>
    </header>
  );
}
