"use client";
import { Button } from "@repo/ui/button";
import { useChatStore } from "../store/useChatstore";
import useSocket from "../context/socketProvider";
import { useState } from "react";
import { useRoomStore } from "../store/useRoomstore";

export default function Home() {
  const chat = useChatStore((s) => s.chats) || [];
  const [inputValue, setInputValue] = useState("");
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const { setRoom } = useRoomStore();
  const { sendMessage } = useSocket();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col gap-1">
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="user name"
        />
        <input
          placeholder="room id"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={() => setRoom(roomId)}>join</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder="Enter your prompt"
        />
        <Button className="">Submit</Button>
      </form>

      <div>
        {chat.map((chat) => (
          <div key={chat.id}>{chat.msg}</div>
        ))}
      </div>
    </div>
  );
}
