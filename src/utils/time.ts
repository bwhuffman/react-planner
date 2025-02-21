import { ScaleTime } from "d3-scale";
import { pointer } from "d3-selection";

/**
 * Get a random time in a range
 * @param absoluteStart - The start date of the range
 * @param absoluteEnd - The end date of the range
 * @returns The random time (start and end)
 */
export const getRandomTimeInRange = (
  absoluteStart: Date,
  absoluteEnd: Date
) => {
  const startTime = absoluteStart.getTime();
  const endTime = absoluteEnd.getTime();

  const randomStart = new Date(
    startTime + Math.random() * (endTime - startTime)
  );
  const remainingTime = endTime - randomStart.getTime();
  const randomDuration = Math.random() * remainingTime;
  const randomEnd = new Date(randomStart.getTime() + randomDuration);

  return {
    start: randomStart,
    end: randomEnd,
  };
};

/**
 * Get the time from a position on the SVG element
 *
 * TODO: automatically use react-planner svg and scale. Only require position argument.
 * @param event - The mouse event
 * @param scale - The scale of the SVG element
 * @param svgElement - The SVG element
 * @returns The time at the position
 */
export function getTimeFromPosition(
  event: MouseEvent,
  scale: ScaleTime<number, number>,
  svgElement: SVGSVGElement
): Date {
  const [x] = pointer(event, svgElement);
  return scale.invert(x);
}

/**
 * Get the x-position on the SVG element from a time value
 *
 * TODO: automatically use react-planner svg and scale. Only require time argument.
 * @param time - The time value to convert
 * @param scale - The scale of the SVG element
 * @returns The x-position on the screen
 */
export function getPositionFromTime(
  time: Date,
  scale: ScaleTime<number, number>
): number {
  return scale(time);
}
