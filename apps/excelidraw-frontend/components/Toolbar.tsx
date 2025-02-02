import React, { JSX } from "react";
import {
  MousePointerClick,
  Circle,
  Square,
  Hand,
  Eraser,
  Minus,
  Pencil,
  Users,
} from "lucide-react";
import { Tool } from "@/Interfaces/IShape";
import ToolbarStore from "@/lib/store/ToolbarStore";
interface ToolbarArrI {
  name: Tool;
  title: string;
  icon: JSX.Element;
}

const toolbarArr: ToolbarArrI[] = [
  { name: Tool.POINT, title: "Pointer", icon: <MousePointerClick /> },
  { name: Tool.LINE, title: "Line", icon: <Minus /> },
  { name: Tool.PENCIL, title: "Pencil", icon: <Pencil /> },
  { name: Tool.CIRCLE, title: "Circle", icon: <Circle /> },
  { name: Tool.RECTANGEL, title: "Rectangle", icon: <Square /> },
  { name: Tool.PAN, title: "Pan", icon: <Hand /> },
  { name: Tool.ERASER, title: "Eraser", icon: <Eraser /> },
  { name: Tool.USER, title: "Collab", icon: <Users /> },
];

// IconButton Component
interface iconButtonI {
  onClick: () => void;
  activated: boolean;
  icon?: JSX.Element;
  title: string;
  className?: string;
}
function IconButton({
  onClick,
  activated,
  icon,
  title,
  className,
}: iconButtonI) {
  return (
    <button
      onClick={onClick}
      className={`
        p-2 rounded-lg focus:outline-none transition-all
        ${activated ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}
        ${className}
      `}
      title={title}
    >
      {icon || title}
    </button>
  );
}

const Toolbar = () => {
  const { selectedTool, setSelectedTool } = ToolbarStore();
  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
      }}
      className={`
        sticky left-1/2 
       flex gap-2 items-center justify-center shadow-lg
        bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90
        rounded-lg px-4 py-2 text-xs font-mono
        sm:flex-wrap sm:justify-start sm:left-5 sm:top-5 sm:translate-x-0
      `}
    >
      {toolbarArr.map((tool, id) => (
        <IconButton
          key={id}
          onClick={() => setSelectedTool(tool.name)}
          // onClick={() =>
          //   tool.name === Tool.USER
          //     ? copyToClipBoard()
          //     : setSelectedTool(tool.name)
          // }
          activated={selectedTool === tool.name}
          icon={tool.icon}
          title={tool.title}
        />
      ))}
    </div>
  );
};

export default Toolbar;
