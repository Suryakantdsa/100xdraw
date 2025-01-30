import { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Minus, Plus } from "lucide-react";
import { Game } from "@/draw/Game";
import Toolbar from "./Toolbar";
import { Tool } from "@/Interfaces/IShape";
export function Canvas({
  roomId,
  socket,
}: {
  socket: WebSocket;
  roomId: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();
  const [selectedTool, setSelectedTool] = useState<Tool>(Tool.CIRCLE);
  const [zoom, setZoom] = useState(0.75);

  const decreaseZoom = () => {
    setZoom((prevZoom) => Math.max(0.5, prevZoom - 0.1));
    game?.dec();
  };
  const increaseZoom = () => {
    setZoom((prevZoom) => Math.max(0.5, prevZoom + 0.1));
    game?.inc();
  };
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
  // useEffect(() => {
  //   if (game) {
  //     setZoom(game.getZoomValue);
  //   }
  // }, [game?.getZoomValue]);

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket);
      setGame(g);
      // toast.info("Connected to WebSocket server.");
      return () => {
        g.destroy();
      };
    }
  }, [canvasRef]);

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
      <Toolbar
        setSelectedTool={setSelectedTool}
        selectedTool={selectedTool}
        roomId={roomId}
      />
      <div
        style={{
          padding: "10px",
          borderRadius: "10px",
        }}
        className={`fixed bg-blue-500  text-white transform shadow-md rounded-lg flex items-center justify-center gap-4 max-w-auto sm:bottom-5 sm:left-5 sm:translate-x-0`}
      >
        <button
          onClick={decreaseZoom}
          type="button"
          className="pl-4 pr-4 cursor-pointer"
        >
          <Minus size={20} />
        </button>
        <p className="text-xs">{Math.round(zoom * 100)}%</p>
        <button
          onClick={increaseZoom}
          type="button"
          className="pl-4 pr-4 cursor-pointer"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}
