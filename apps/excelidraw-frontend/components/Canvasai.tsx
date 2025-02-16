import { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Minus, Plus, Mic, Sparkles } from "lucide-react";
import { Game } from "@/draw/Game";
import Toolbar from "./Toolbar";
import { Tool } from "@/Interfaces/IShape";
import Logo from "./Logo";
import UserInfo from "./UserInfo";
import ToolbarStore from "@/lib/store/ToolbarStore";
import { generateSVGShape } from "@/utils/api";
// import { startVoiceRecognition } from "@/lib/speechToText"; // Voice API

export function Canvas({
  roomId,
  socket,
}: {
  socket: WebSocket;
  roomId: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();
  const { selectedTool } = ToolbarStore();
  const [zoom, setZoom] = useState(0.75);
  const [prompt, setPrompt] = useState("");

  const decreaseZoom = () => {
    setZoom((prevZoom) => Math.max(0.2, prevZoom - 0.1));
    game?.dec();
  };

  const increaseZoom = () => {
    setZoom((prevZoom) => Math.max(0.2, prevZoom + 0.1));
    game?.inc();
  };

  useEffect(() => {
    const handleScaleChange = (newScale: number) => {
      setZoom(newScale);
    };

    if (game) {
      game.onScaleChange = handleScaleChange;
    }
  }, [game]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    game?.setTool(selectedTool as Tool);
  }, [selectedTool, game]);

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket);
      setGame(g);
      return () => {
        g.destroy();
      };
    }
  }, [canvasRef, roomId, socket]);

  const handleGenerateShape = async () => {
    try {
      const svgPath = await generateSVGShape(prompt);
      if (!prompt || prompt.length < 5) return;
      if (svgPath && game) {
        game.addAIShape(svgPath);
      }
    } catch (error) {
      console.error("SVG Generation Error:", error);
    }
  };

  return (
    <div className="h-screen overflow-hidden relative">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>

      <Logo />

      <Toolbar />

      <div className="fixed bg-blue-500 text-white shadow-md rounded-lg flex items-center justify-center gap-4 bottom-5 left-5 p-2">
        <button onClick={decreaseZoom} type="button" className="p-2">
          <Minus size={20} />
        </button>
        <p className="text-xs">{Math.round(zoom * 100)}%</p>
        <button onClick={increaseZoom} type="button" className="p-2">
          <Plus size={20} />
        </button>
      </div>

      <UserInfo />

      <div className="group absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-neutral-800 shadow-md p-2 rounded-xl flex items-center gap-3 w-96 ">
        <input
          type="text"
          className="w-full p-2 text-white border bg-neutral-700 rounded-lg outline-none border-none shadow-[inset_0px_2px_0px_0px_rgba(59 130 246,0.1),inset_0px_0px_1px_2px_rgba(59 130 246,0.1)]"
          placeholder="Type 'Draw a house'..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <span className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-3/4 mx-auto"></span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[2px] w-full mx-auto blur-sm"></span>
        <button
          onClick={handleGenerateShape}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          <Sparkles size={20} />
        </button>
        <span className="absolute inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-3/4 mx-auto"></span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[2px] w-full mx-auto blur-sm"></span>
        <button
          // onClick={handleVoiceInput}
          className="fixed -right-16 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600"
        >
          <Mic size={24} />
        </button>
      </div>
    </div>
  );
}
