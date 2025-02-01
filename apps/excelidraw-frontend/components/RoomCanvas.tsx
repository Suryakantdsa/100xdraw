"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoomJoin from "./RoomJoin";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  console.log(roomId);

  const tokenValue =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=${tokenValue}`);

    ws.onopen = () => {
      setSocket(ws);
      const data = JSON.stringify({
        type: "join_room",
        roomId,
      });
      console.log(data);
      ws.send(data);
    };
  }, []);

  if (!socket) {
    return (
      <div className="flex justify-center items-center ">
        <button className="mt-5 text-white font-bold px-6 py-3 bg-blue-600 w-32 border rounded-sm">
          conneting...
        </button>
      </div>
    );
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
      <RoomJoin />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
