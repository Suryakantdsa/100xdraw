"use client";

import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
      }}
      className="flex flex-col items-center justify-center h-screen"
    >
      <h1 className="text-4xl font-bold mb-4 text-white">
        Welcome to 100xDraw
      </h1>
      <p className="text-lg text-gray-50 mb-6">
        A collaborative whiteboard for your team.
      </p>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        onClick={() => router.push(`canvas/1`)}
      >
        Get Started
      </button>
    </div>
  );
};

export default Hero;
