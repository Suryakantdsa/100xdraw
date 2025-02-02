import { NEXTJS_FRONTEND } from "@/config";
import { Tool } from "@/Interfaces/IShape";
import ToolbarStore from "@/lib/store/ToolbarStore";
import { roomCreate } from "@/utils/api";
import { CheckCircle, CirclePlus, CircleX, Copy, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const RoomJoin = () => {
  const { selectedTool, setSelectedTool } = ToolbarStore();
  const [isStartClicked, setStartCLicked] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomLink, setRoomLink] = useState<string | null>(
    `${NEXTJS_FRONTEND}/roomId=`
  );
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  const handleCreateRoom = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please sign in to create a room.");
      return;
    }

    try {
      const response = await roomCreate({ name: roomName }, token);
      if (response.roomId) {
        setRoomLink(`${NEXTJS_FRONTEND}/room/?roomId=${response.roomId}`);
      }
      toast.success("Room created successfully!");
      router.push(`room/?roomId=${response.roomId}`);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage =
        err?.response?.data?.message ||
        "Internal Server Error. Please try again.";

      toast.error(errorMessage);
    }
  };
  const handleCopy = () => {
    if (roomLink) {
      navigator.clipboard.writeText(roomLink);
      setIsCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    }
  };
  return (
    <>
      {selectedTool === Tool.USER && (
        <div
          style={{
            position: "fixed",
            top: 100,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          className="  gap-6 flex justify-center items-center flex-col bg-[#363636] p-10 rounded-lg  text-white"
        >
          <button
            className="w-full absolute top-4 left-96"
            onClick={() => {
              setSelectedTool(Tool.CIRCLE);
              setStartCLicked(false);
            }}
          >
            <CircleX />
          </button>
          {!isStartClicked ? (
            <div className="flex justify-center flex-col items-center gap-y-3 w-[350px]">
              <h1 className=" text-xl font-bold text-[#a8a5ff]   ">
                Live collaboration
              </h1>

              <p className=" text-sm">
                Invite people to collaborate on your drawing.
              </p>
              <button
                className="px-4 gap-x-2 py-2 rounded-sm  bg-[#a8a5ff]  flex justify-center items-center mt-4 text-black"
                onClick={() => setStartCLicked(true)}
              >
                <Play />
                start session
              </button>
            </div>
          ) : (
            <div className="flex justify-start flex-col items-start gap-y-3 w-[350px]">
              <h1 className=" text-lg font-bold text-[#a8a5ff]   ">
                Live collaboration
              </h1>

              <label htmlFor="room_name">Room name</label>
              <div className="flex w-full justify-between items-center gap-4">
                <input
                  type="text"
                  placeholder="Enter room name"
                  className="bg-[#363636] rounded-sm px-2 py-1 ring-1 ring-blue-50"
                  onChange={(e) => setRoomName(e.target.value)}
                />
                <button
                  className="flex justify-center items-center gap-x-2 text-sm px-4 py-2 rounded-sm bg-[#a8a5ff] text-black w-[40%]"
                  onClick={handleCreateRoom}
                >
                  <CirclePlus size={16} />
                  <span>Create room</span>
                </button>
              </div>
              <label htmlFor="link">Link</label>
              <div className="flex w-full justify-between items-center gap-4">
                <input
                  type="text"
                  placeholder="https:/100xdraw.com/roomId=skldnsvwdk baefcbkqncdqkwdn"
                  className="bg-[#5a5959] rounded-sm px-2 py-1 ring-1 ring-blue-50"
                  readOnly
                  value={roomLink ? roomLink : ""}
                />
                <button
                  className={`flex justify-center items-center gap-x-2 text-sm px-4 py-2 rounded-sm   text-black w-[40%] ${!isCopied ? "bg-[#a8a5ff]" : "bg-green-400"}`}
                  onClick={handleCopy}
                  disabled={!roomLink}
                >
                  {isCopied ? <CheckCircle size={16} /> : <Copy size={16} />}
                  {/* {isCopied ? "Copied" : "Copy"} */}
                  <span> {isCopied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
          )}
          <div className="flex justify-around items-center w-full">
            <p className="border-b p-0 w-32 border-gray-500"></p>
            <p className="font-bold">OR</p>
            <p className="border-b p-0 w-32 border-gray-500"></p>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-4">
            <h1 className="text-xl font-bold text-[#a8a5ff] ">
              Shareable Link
            </h1>
            <p className=" text-sm">Export as a read-only link.</p>
            <button className="px-4 py-2 rounded-sm  bg-[#a8a5ff] text-black my-4">
              Export to link
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomJoin;
