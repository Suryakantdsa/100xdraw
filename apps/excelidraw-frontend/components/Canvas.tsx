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
import toast from "react-hot-toast";
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
  const [genrating, setGenerating] = useState(false);
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [showPopup, setShowPopup] = useState(false);

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

  useEffect(() => {
    if (clickPosition) {
      setShowPopup(true);
    }
  }, [clickPosition]);
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setClickPosition({ x, y });
    }
  };

  const handlePopupSubmit = (prompt: string) => {
    if (clickPosition) {
      handleGenerateShape(prompt, clickPosition);
      setShowPopup(false);
      setClickPosition(null);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setClickPosition(null);
  };
  const handleGenerateShape = async (
    prompt: string,
    position: { x: number; y: number }
  ) => {
    try {
      setGenerating(true);
      setPrompt("");
      await toast.promise(
        (async () => {
          const svgPath = await generateSVGShape(prompt);
          if (svgPath && game) {
            game.addAIShape(svgPath, position);
          }
          setGenerating(false);
        })(),
        {
          loading: "Generating...",
          success: "Shape generated successfully!",
          error: "Failed to generate shape.",
        }
      );
    } catch (error) {
      console.error("SVG Generation Error:", error);
    }
  };

  const handleVoiceInput = async () => {
    toast.success("This feature in under developement .stay tune..👍");
  };
  const handleCancleGenerateShape = () => {
    setPrompt("");
    setShowPopup(false);
    setClickPosition(null);
    setGenerating(false);
  };

  return (
    <div className="h-screen overflow-hidden relative">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onDoubleClick={handleCanvasClick}
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

      {showPopup && clickPosition && (
        <div
          style={{
            position: "absolute",
            left: clickPosition.x + 10,
            top: clickPosition.y + 10,
            zIndex: 1000,
          }}
          className=" bg-neutral-800 p-4 rounded-lg shadow-lg"
        >
          <input
            type="text"
            placeholder="Type 'Draw a house'..."
            className="w-full p-2 rounded-lg outline-none text-white border bg-neutral-700"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlePopupSubmit(e.currentTarget.value);
              }
            }}
            autoFocus
          />
          <button
            onClick={handlePopupClose}
            className="mt-2 text-sm text-gray-200 hover:text-gray-500"
          >
            Close
          </button>
        </div>
      )}

      <div className="group absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-neutral-800 shadow-md p-2 rounded-xl flex items-center gap-3 w-96 ">
        <input
          type="text"
          className="w-full p-2 text-white border bg-neutral-700 rounded-lg outline-none border-none shadow-[inset_0px_2px_0px_0px_rgba(59 130 246,0.1),inset_0px_0px_1px_2px_rgba(59 130 246,0.1)]"
          placeholder="Type 'Draw a house'..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <span className="absolute text-center text-sm font-semibold inset-x-0 -top-[490px] bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px  mx-auto text-neutral-600">
          Double-click on the canvas to place an AI-generated shape
        </span>

        <span className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-3/4 mx-auto"></span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[2px] w-full mx-auto blur-sm"></span>
        {!genrating ? (
          <button
            tabIndex={0}
            onClick={() => handleGenerateShape(prompt, { x: 100, y: 100 })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleGenerateShape(prompt, { x: 100, y: 100 });
              }
            }}
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            <Sparkles size={20} />
          </button>
        ) : (
          <button
            onClick={() => handleCancleGenerateShape()}
            className="bg-white rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              id="stop-circle"
            >
              <path
                fill="#AAA"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              ></path>
              <path
                fill="#111"
                d="M8.58579 8.58579C8 9.17157 8 10.1144 8 12C8 13.8856 8 14.8284 8.58579 15.4142C9.17157 16 10.1144 16 12 16C13.8856 16 14.8284 16 15.4142 15.4142C16 14.8284 16 13.8856 16 12C16 10.1144 16 9.17157 15.4142 8.58579C14.8284 8 13.8856 8 12 8C10.1144 8 9.17157 8 8.58579 8.58579Z"
              ></path>
            </svg>
          </button>
        )}

        <span className="absolute inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-3/4 mx-auto"></span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-x-0 -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[2px] w-full mx-auto blur-sm"></span>
        <button
          onClick={handleVoiceInput}
          className="fixed -right-16 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600"
        >
          <Mic size={24} />
        </button>
      </div>
    </div>
  );
}
