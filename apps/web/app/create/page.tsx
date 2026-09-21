import Navbar from "@/components/home/navbar";
import RoomTerminal from "@/components/form/roomTerminal";

export default function Page() {
  return (
    <div className="flex h-screen h-[100dvh] flex-col overflow-hidden bg-[#020402] text-foreground no-scrollbar">
      <Navbar />

      <main className="relative flex flex-1 items-center justify-center overflow-y-auto no-scrollbar px-3 py-3 sm:px-6 sm:py-6">
        {/* Subtle cyber background ambient glow and grid */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="h-[360px] w-[520px] sm:h-[480px] sm:w-[700px] rounded-full bg-emerald-500/5 blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035]" />
        </div>

        <div className="relative z-10 w-full flex justify-center my-auto">
          <RoomTerminal />
        </div>
      </main>
    </div>
  );
}
