import { Minus, Plus } from "lucide-react";
import React from "react";

const HomeButton = () => {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "10px",
      }}
      className={`fixed bg-blue-500  text-white transform shadow-md rounded-lg flex items-center justify-center gap-4 max-w-auto sm:bottom-5 sm:left-5 sm:translate-x-0`}
    >
      <button type="button" className="pl-4 pr-4 cursor-pointer">
        <Minus size={20} />
      </button>
      <p className="text-xs">{75}%</p>
      <button type="button" className="pl-4 pr-4 cursor-pointer">
        <Plus size={20} />
      </button>
    </div>
  );
};

export default HomeButton;
