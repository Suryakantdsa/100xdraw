"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useAuthRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token")); // Ensure hydration safe access
  }, []);
  useEffect(() => {
    if (!token) {
      if (roomId) localStorage.setItem("pendingRoomId", roomId);
      router.push("/signin");
    }
  }, [token, roomId, router]);
}
