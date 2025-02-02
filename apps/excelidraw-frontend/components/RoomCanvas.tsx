"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoomJoin from "./RoomJoin";
import toast from "react-hot-toast";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  // console.log(roomId);

  const tokenValue =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=${tokenValue}`);
    ws.onopen = () => {
      setSocket(ws);
      toast.success("Joined the room");

      const data = JSON.stringify({
        type: "join_room",
        roomId,
      });

      ws.send(data);
    };

    // ws.onerror = () => {
    //   // toast.error("Something went wrong. Please try again.");
    //   console.error("Something went wrong. Please try again.");
    // };

    // ws.onclose = () => {
    //   // toast("Connection closed");
    //   console.error("connection closed");
    // };

    return () => ws.close();
  }, [tokenValue]);

  if (!socket) {
    return null;
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
