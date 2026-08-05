import { useMemberStore } from "@/store/useMemberstore";
import { useCallback } from "react";
import { socket } from "./socket";

export const handleMute = ({
  memberId,
  muted,
}: {
  memberId: string;
  muted: boolean;
}) => {
  console.log(useMemberStore.getState().members);
  console.log(memberId);
  console.log("SERVER MUTE", memberId, muted);
  useMemberStore.getState().setMute(memberId, muted);
};

export const handleDeafened = ({
  memberId,
  deafened,
}: {
  memberId: string;
  deafened: boolean;
}) => {
  console.log("handle deafened", memberId, deafened);
  useMemberStore.getState().setDeafened(memberId, deafened);
};

export function useVoiceEmitter(roomId: string) {
  const memberId = useMemberStore((s) => s.user?.id);
  console.log("voice emitter");
  const Onmute = useCallback(
    (isMuted: boolean) => {
      if (!memberId) return;
      console.log("EMIT MUTE", roomId, memberId, isMuted);
      socket.emit("member:mute", { roomId, memberId, muted: isMuted });
    },
    [roomId, memberId],
  );

  const Ondeafened = useCallback(
    (isDeafened: boolean) => {
      if (!memberId) return;
      socket.emit("member:deafen", { roomId, memberId, deafened: isDeafened });
    },
    [roomId, memberId],
  );

  return {
    Onmute,
    Ondeafened,
  };
}
