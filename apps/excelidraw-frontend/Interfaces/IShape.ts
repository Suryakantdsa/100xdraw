export enum Tool {
  RECTANGEL = "rect",
  CIRCLE = "circle",
  PENCIL = "pencil",
  LINE = "line",
  PAN = "hand",
  ERASER = "eraser",
  POINT = "point",
  SELECT = "select",
  USER = "user",
}

export type IShape =
  | {
      type: Tool.RECTANGEL;
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: Tool.CIRCLE;
      centerX: number;
      centerY: number;
      radius: number;
      angle1?: number;
      angle2?: number;
    }
  | {
      type: Tool.PENCIL;
      points: { x: number; y: number }[];
    }
  | {
      type: Tool.LINE;
      points: { x: number; y: number }[];
    }
  | {
      type: Tool.ERASER;
    };
