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
  icon?: JSX.Element;
  title: string;
  className?: string;
}
function IconButton({ icon, title, className }: iconButtonI) {
  return (
    <button
      className={`
        p-2 rounded-lg focus:outline-none transition-all
        bg-blue-500 text-white
        ${className}
      `}
      title={title}
    >
      {icon || title}
    </button>
  );
}

const ToolbarHome = () => {
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
        <IconButton key={id} icon={tool.icon} title={tool.title} />
      ))}
    </div>
  );
};

export default ToolbarHome;
