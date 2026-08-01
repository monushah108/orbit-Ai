"use client";

import { useState } from "react";
import ChatArea from "./chatArea";
import Header from "./header";
import MemberList from "./memberList";

export default function Workspace() {
  const [open, setOpen] = useState(true);
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
