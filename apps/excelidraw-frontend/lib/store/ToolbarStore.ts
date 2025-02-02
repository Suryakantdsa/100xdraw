import { Tool } from "@/Interfaces/IShape";
import { create } from "zustand";

interface IToolbar {
  selectedTool: Tool;
  setSelectedTool: (toolname: Tool) => void;
}

const ToolbarStore = create<IToolbar>((set) => ({
  selectedTool: Tool.CIRCLE,
  setSelectedTool: (toolname) => set(() => ({ selectedTool: toolname })),
}));

export default ToolbarStore;
