"use client";
export const dynamic = "force-dynamic";
import { RoomCanvas } from "@/components/RoomCanvas";
import { useAuthRedirect } from "@/components/useAuthRedirect";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CanvasPage() {
  const searchParams = useSearchParams();
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const id = searchParams.get("roomId");
    if (id) setRoomId(id);
  }, [searchParams]);

  useAuthRedirect();

  return <RoomCanvas roomId={roomId ? roomId : ""} />;
}
