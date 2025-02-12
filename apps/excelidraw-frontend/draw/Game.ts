import { IShape, Tool } from "../Interfaces/IShape";
import { getExistingShapes } from "./http";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: IShape[];
  private selectedTool: string = "rect";
  private clicked: boolean;
  private isDrawing: boolean = false;
  private isPanning: boolean = false;
  private zoom: number = 1;
  private panX: number = 0;
  private panY: number = 0;
  scale: number = 1;
  private pathErase: [number, number][];
  private startX: number = 0;
  private startY: number = 0;
  private lastMouseX: number = 0;
  private lastMouseY: number = 0;
  onScaleChange?: (scale: number) => void;
  socket: WebSocket;
  private roomId;
  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.socket = socket;
    this.roomId = roomId;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.clicked = false;
    this.selectedTool = Tool.RECTANGEL;
    this.pathErase = [];
    this.init();
    this.initMouseHandlers();
    this.initGetSockectRes();
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    // console.log(this.existingShapes);
    this.clearCanvas();
  }

  initGetSockectRes() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "eraser") {
        this.existingShapes = [];
        this.clearCanvas();
      } else if (message.type == "chat") {
        const parsedShape = JSON.parse(message.message);
        this.existingShapes.push(parsedShape.shape);
        this.clearCanvas();
      }
    };
  }

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler.bind(this));
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("wheel", this.zoomHandler);
    this.setCanvasBg("black");
    this.setTool(Tool.LINE);
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);

    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);

    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);

    this.canvas.removeEventListener("wheel", this.zoomHandler);
  }
  zoomHandler = (e: WheelEvent) => {
    e.preventDefault();

    const scaleAmount = -e.deltaY / 500;
    const newScale = this.scale * (1 + scaleAmount);

    if (newScale < 0.1 || newScale > 5) return;

    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const canvasMouseX = (mouseX - this.panX) / this.scale;
    const canvasMouseY = (mouseY - this.panY) / this.scale;

    this.scale = newScale;

    this.onScaleChange?.(this.scale);
    this.panX = mouseX - canvasMouseX * this.scale;
    this.panY = mouseY - canvasMouseY * this.scale;
    this.clearCanvas();
  };

  setCanvasBg(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  inc() {
    this.scale += 0.2;
    this.clearCanvas();
  }

  dec() {
    this.scale -= 0.2;
    this.clearCanvas();
  }
  mouseDownHandler = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const adjustedX = (mouseX - this.panX) / this.scale;
    const adjustedY = (mouseY - this.panY) / this.scale;

    this.clicked = true;
    this.startX = adjustedX;
    this.startY = adjustedY;

    if (this.selectedTool === Tool.PENCIL) {
      const newShape: IShape = {
        type: Tool.PENCIL,
        points: [{ x: adjustedX, y: adjustedY }],
      };

      this.existingShapes.push(newShape);
    } else if (this.selectedTool === Tool.PAN) {
      this.isPanning = true;
      this.isDrawing = false;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
      this.canvas.style.cursor = "grabbing";
    } else if (this.selectedTool === Tool.LINE) {
      this.isDrawing = true;
    } else if (this.selectedTool === Tool.ERASER) {
      this.pathErase.push([e.clientX, e.clientY]);
    }
  };
  mouseMoveHandler = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const adjustedX = (mouseX - this.panX) / this.scale;
    const adjustedY = (mouseY - this.panY) / this.scale;

    if (this.clicked) {
      this.clearCanvas();
      this.ctx.strokeStyle = "#3b82f6";
      const selectedTool = this.selectedTool;

      if (selectedTool === Tool.RECTANGEL) {
        const width = adjustedX - this.startX;
        const height = adjustedY - this.startY;
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (selectedTool === Tool.CIRCLE) {
        const radius = Math.sqrt(
          Math.pow(adjustedX - this.startX, 2) +
            Math.pow(adjustedY - this.startY, 2)
        );
        this.ctx.strokeStyle = "#3b82f6";
        this.ctx.beginPath();
        this.ctx.arc(
          this.startX,
          this.startY,
          Math.abs(radius),
          0,
          2 * Math.PI
        );
        this.ctx.stroke();
      } else if (selectedTool === Tool.PENCIL) {
        const currentShape =
          this.existingShapes[this.existingShapes.length - 1];

        if (currentShape && currentShape.type === Tool.PENCIL) {
          const adjustedPoint = {
            x: adjustedX,
            y: adjustedY,
          };

          currentShape.points.push(adjustedPoint);

          this.clearCanvas();

          this.existingShapes.forEach((shape) => this.drawShape(shape));
        }
      } else if (selectedTool === Tool.PAN) {
        const deltaX = mouseX - this.lastMouseX;
        const deltaY = mouseY - this.lastMouseY;

        this.panX += deltaX;
        this.panY += deltaY;

        this.lastMouseX = mouseX;
        this.lastMouseY = mouseY;

        this.clearCanvas();
      } else if (selectedTool === Tool.LINE) {
        if (!this.isDrawing) return;
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(adjustedX, adjustedY);
        this.ctx.stroke();
      } else if (selectedTool === Tool.ERASER) {
        this.pathErase.push([adjustedX, adjustedY]);
      }
    }
  };

  drawShape(shape: IShape) {
    this.ctx.strokeStyle = "#3b82f6";
    if (shape.type === Tool.RECTANGEL) {
      this.ctx.strokeRect(
        shape.x + this.panX,
        shape.y + this.panY,
        shape.width,
        shape.height
      );
    } else if (shape.type === Tool.CIRCLE) {
      this.ctx.beginPath();
      this.ctx.arc(
        shape.centerX + this.panX,
        shape.centerY + this.panY,
        shape.radius,
        0,
        2 * Math.PI
      );
      this.ctx.stroke();
    } else if (shape.type === Tool.LINE) {
      this.ctx.beginPath();
      this.ctx.moveTo(
        shape.points[0].x + this.panX,
        shape.points[0].y + this.panY
      );
      this.ctx.lineTo(
        shape.points[1].x + this.panX,
        shape.points[1].y + this.panY
      );
      this.ctx.stroke();
    }
  }

  mouseUpHandler = (e: MouseEvent) => {
    this.clicked = false;

    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const adjustedX = (mouseX - this.panX) / this.scale;
    const adjustedY = (mouseY - this.panY) / this.scale;
    const width = adjustedX - this.startX;
    const height = adjustedY - this.startY;
    let shape: IShape | null = null;
    if (this.selectedTool === Tool.RECTANGEL) {
      shape = {
        type: Tool.RECTANGEL,
        x: this.startX,
        y: this.startY,
        height: height,
        width: width,
      };
    } else if (this.selectedTool === Tool.CIRCLE) {
      const radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

      shape = {
        type: Tool.CIRCLE,
        centerX: this.startX,
        centerY: this.startY,
        radius: Math.abs(radius),
      };
    } else if (this.selectedTool === Tool.PENCIL) {
      const currentShape = this.existingShapes[this.existingShapes.length - 1];
      this.socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({ shape: currentShape }),
          roomId: this.roomId,
        })
      );
    } else if (this.selectedTool === Tool.PAN) {
      this.isPanning = false;
      this.canvas.style.cursor = "crosshair";

      this.lastMouseX = 0;
      this.lastMouseY = 0;
      this.startX = 0;
      this.startY = 0;
    } else if (this.selectedTool === Tool.LINE) {
      this.isDrawing = false;
      const offsetX = e.offsetX;
      const offsetY = e.offsetY;
      shape = {
        type: Tool.LINE,
        points: [
          { x: this.startX, y: this.startY },
          { x: offsetX, y: offsetY },
        ],
      };

      this.socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({ shape }),
          roomId: this.roomId,
        })
      );
    } else if (this.selectedTool === Tool.ERASER) {
      shape = {
        type: Tool.ERASER,
      };
      this.existingShapes = [];
      this.clearCanvas();
      this.socket.send(
        JSON.stringify({
          type: "chat",
          action: Tool.ERASER,
          roomId: this.roomId,
        })
      );
    }

    if (!shape) {
      return;
    }
    this.existingShapes.push(shape);
    this.socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          shape,
        }),
        roomId: this.roomId,
      })
    );
  };

  setTool(tool: Tool) {
    this.selectedTool = tool;
  }

  clearCanvas() {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0, 0, 0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.restore();

    this.ctx.save();
    this.ctx.translate(this.panX, this.panY);
    this.ctx.scale(this.scale, this.scale);
    if (this.existingShapes.length) {
      this.existingShapes.forEach((shape) => {
        if (shape?.type === Tool.RECTANGEL) {
          this.ctx.strokeStyle = " #3b82f6";
          this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape?.type === Tool.CIRCLE) {
          this.ctx.beginPath();
          this.ctx.arc(
            shape.centerX,
            shape.centerY,
            Math.abs(shape.radius),
            0,
            Math.PI * 2
          );
          this.ctx.stroke();
          this.ctx.closePath();
        } else if (shape?.type === Tool.PENCIL) {
          this.drawPencil(shape);
        } else if (shape?.type === Tool.LINE) {
          this.drawLine(shape);
        }
      });
    }
    this.ctx.restore();
  }

  drawLine(shape: IShape) {
    if (shape.type === Tool.LINE) {
      this.ctx.strokeStyle = "#3b82f6";
      const points = shape.points;
      this.ctx.beginPath();
      this.ctx.moveTo(points[0].x, points[0].y);
      this.ctx.lineTo(points[1].x, points[1].y);
      this.ctx.stroke();
    }
  }

  drawPencil(shape: IShape) {
    if (shape.type === Tool.PENCIL) {
      this.ctx.strokeStyle = "#3b82f6";
      this.ctx.beginPath();
      const points = shape.points;
      this.ctx.moveTo(points[0].x, points[0].y);
      points.forEach((point) => this.ctx.lineTo(point.x, point.y));
      this.ctx.stroke();
    }
  }
}
