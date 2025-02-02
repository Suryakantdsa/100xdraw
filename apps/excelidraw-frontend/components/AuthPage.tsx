"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Logo from "./landingpage/Logo";
import { CreateUserSchema, SigninSchema } from "@repo/common/types";
import { signin, signup } from "@/utils/api";
import { AxiosError } from "axios";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      void (isSignin
        ? SigninSchema.parse(formData)
        : CreateUserSchema.parse(formData));

      const response = await toast.promise(
        isSignin ? signin(formData) : signup(formData),
        {
          loading: "Processing...",
          success: isSignin ? "Sign-in successful!" : "Sign-up successful!",
          error: "Something went wrong. Please try again.",
        }
      );
      // console.log(response);
      if (isSignin && response) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", response.username);
        localStorage.setItem("userId", response.userId);
      }
      const pendingRoomId = localStorage.getItem("pendingRoomId");
      if (pendingRoomId) {
        localStorage.removeItem("pendingRoomId");
        router.push(`room/?roomId=${pendingRoomId}`);
      } else {
        router.push(isSignin ? "/room" : "/signin");
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        toast.error(err.response.data.message || "somthing went wrong");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black Px-6">
      <div className="w-[75%] md:[60%] lg:w-1/4 h-[75%] gap-6 flex items-center flex-col bg-[#363636] p-4 md:p-10 rounded-lg">
        <Logo />
        <h1 className="font-bold text-xl text-white">
          {isSignin ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignin && (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2  outline-none border-none ring-1 ring-blue-400"
            placeholder="Name"
          />
        )}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 outline-none border-none ring-blue-400"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 outline-none border-none ring-blue-400"
          placeholder="Password"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-800 px-6 py-2 rounded-sm font-bold text-white"
        >
          {isSignin ? "Sign In" : "Sign Up"}
        </button>

        {isSignin ? (
          <p className="text-white">
            Don{"'"}t have an account?
            <Link href="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-white">
            Already have an account?
            <Link href="/signin" className="text-blue-500">
              Sign In
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
