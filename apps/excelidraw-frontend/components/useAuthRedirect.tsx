"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useAuthRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      if (roomId) localStorage.setItem("pendingRoomId", roomId);
      router.push("/signin");
    }
  }, [token, roomId, router]);
}
