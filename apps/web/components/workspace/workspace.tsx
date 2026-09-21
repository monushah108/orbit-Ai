"use client";

import { useEffect, useState } from "react";
import ChatArea from "./chatArea";
import Header from "./header";
import MemberList from "./memberList";
import { useRoomStore } from "@/store/useRoomstore";
import RoomDestroyed from "./ui/roomDestroyed";

export default function Workspace() {
  const [open, setOpen] = useState(true);
  const destroyed = useRoomStore((s) => s.destroyed);
  const room = useRoomStore((s) => s.room);

  useEffect(() => {
    if (!room?.id) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [room?.id]);

  if (destroyed) {
    return <RoomDestroyed />;
  }

  return (
    <main className="flex h-screen h-[100dvh] flex-col overflow-hidden bg-black text-white">
      <Header />

      <div className="flex flex-1 min-h-0 min-w-0 overflow-hidden">
        <ChatArea open={open} setOpen={setOpen} />
        <MemberList open={open} setOpen={setOpen} />
      </div>
    </main>
  );
}
