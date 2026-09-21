import RoomLeaveGuard from "@/components/workspace/ui/leaveGaurd";
import Workspace from "@/components/workspace/workspace";

export default async function page() {
  return (
    <div className="h-screen h-[100dvh] w-full overflow-hidden bg-[#020402] text-foreground no-scrollbar">
      <RoomLeaveGuard />
      <Workspace />
    </div>
  );
}
