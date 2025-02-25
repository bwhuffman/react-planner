import { Box, Rect, XYPosition } from "../types";

export const rectToBox = ({ x, y, width, height }: Rect): Box => ({
  x,
  y,
  x2: x + width,
  y2: y + height,
});

// get rect from box (allows negative values)
export const boxToRect = ({ x, y, x2, y2 }: Box): Rect => ({
  x,
  y,
  width: x2 - x,
  height: y2 - y,
});

// get absolute rect from box (no negative values)
export const boxToAbsRect = ({ x, y, x2, y2 }: Box): Rect => ({
  x: Math.min(x, x2),
  y: Math.min(y, y2),
  width: Math.abs(x2 - x),
  height: Math.abs(y2 - y),
});

export const getOverlappingArea = (rectA: Rect, rectB: Rect): number => {
  const xOverlap = Math.max(
    0,
    Math.min(rectA.x + rectA.width, rectB.x + rectB.width) -
      Math.max(rectA.x, rectB.x)
  );
  const yOverlap = Math.max(
    0,
    Math.min(rectA.y + rectA.height, rectB.y + rectB.height) -
      Math.max(rectA.y, rectB.y)
  );

  return Math.ceil(xOverlap * yOverlap);
};

export const pointInRect = ({ x, y }: XYPosition, rect: Rect): boolean => {
  return (
    x >= rect.x &&
    x <= rect.x + rect.width &&
    y >= rect.y &&
    y <= rect.y + rect.height
  );
};
