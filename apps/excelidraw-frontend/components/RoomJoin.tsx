import { Play } from "lucide-react";
import React from "react";

const RoomJoin = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 100,
        left: "50%",
        transform: "translateX(-50%)",
      }}
      className=" gap-6 flex justify-center items-center flex-col bg-[#363636] p-10 rounded-lg  text-white"
    >
      <div className="flex justify-center flex-col items-center gap-y-3">
        <h1 className=" text-xl font-bold text-[#a8a5ff]   ">
          Live collaboration
        </h1>

        <p className=" text-sm">
          Invite people to collaborate on your drawing.
        </p>
        <button className="px-4 gap-x-2 py-2 rounded-sm  bg-[#a8a5ff]  flex justify-center items-center mt-4 text-black">
          <Play />
          start session
        </button>
      </div>
      <div className="flex justify-around items-center w-full">
        <p className="border-b p-0 w-32 border-gray-500"></p>
        <p className="font-bold">OR</p>
        <p className="border-b p-0 w-32 border-gray-500"></p>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-4">
        <h1 className="text-xl font-bold text-[#a8a5ff] ">Shareable Link</h1>
        <p className=" text-sm">Export as a read-only link.</p>
        <button className="px-4 py-2 rounded-sm  bg-[#a8a5ff] text-black my-4">
          Export to link
        </button>
      </div>
    </div>
  );
};

export default RoomJoin;
