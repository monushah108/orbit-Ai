import RoomLeaveGuard from "@/components/workspace/ui/leaveGaurd";
import Workspace from "@/components/workspace/workspace";

export default async function page() {
  return (
    <>
      <RoomLeaveGuard />
      <Workspace />;
    </>
  );
}
