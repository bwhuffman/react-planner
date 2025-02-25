export type XYPosition = {
  x: number;
  y: number;
};

export type Dimensions = {
  width: number;
  height: number;
};

export type Rect = XYPosition & Dimensions;

export type Box = XYPosition & {
  x2: number;
  y2: number;
};

export type SelectionBox = {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
};
