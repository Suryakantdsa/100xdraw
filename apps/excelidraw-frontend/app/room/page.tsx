"use client";
export const dynamic = "force-dynamic";
import { RoomCanvas } from "@/components/RoomCanvas";
import { useAuthRedirect } from "@/components/useAuthRedirect";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";

function CanvasContent() {
  const searchParams = useSearchParams();

  const roomId = useMemo(
    () => searchParams.get("roomId") || "",
    [searchParams]
  );

  useAuthRedirect();

  return <RoomCanvas roomId={roomId} />;
}

export default function CanvasPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CanvasContent />
    </Suspense>
  );
}
