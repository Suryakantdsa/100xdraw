"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useAuthRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token === null) return;

    if (!token) {
      if (roomId) localStorage.setItem("pendingRoomId", roomId);
      router.push("/signin");
    }
  }, [token, roomId, router]);
}
