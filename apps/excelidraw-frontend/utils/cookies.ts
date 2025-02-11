"use server";

import { cookies } from "next/headers";
import { HTTP_BACKEND } from "@/config";
import axios from "axios";

export const setTokenCookie = async (token: string) => {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 15);

  (await cookies()).set({
    name: "token",
    value: token,
    expires: expireDate,
    httpOnly: false,
    sameSite: false,
  });
};

export const getVerifiedToken = async (): Promise<string | null> => {
  try {
    const token = (await cookies()).get("token")?.value || null;
    if (!token) return null;

    // Verify token with backend
    await axios.get(`${HTTP_BACKEND}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Token verified successfully");
    return token;
  } catch (error) {
    // If verification fails, clear the invalid token
    console.error("Error verifying token:", error);
    await removeTokenCookie();
    return null;
  }
};

export const removeTokenCookie = async () => {
  (await cookies()).delete("token");
};
