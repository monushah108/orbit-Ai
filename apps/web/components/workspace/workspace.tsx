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
    <main className="h-screen overflow-hidden bg-black text-white">
      <Header />

      <div className="flex h-[calc(100vh-64px)]">
        <ChatArea open={open} setOpen={setOpen} />
        <MemberList open={open} setOpen={setOpen} />
      </div>
    </main>
  );
}
