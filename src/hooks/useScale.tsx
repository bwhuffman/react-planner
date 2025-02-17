import { useMemo } from "react";
import { ScaleTime } from "d3-scale";
import { scaleUtc } from "d3-scale";

interface UseScaleParams {
  startDate: Date;
  endDate: Date;
  width: number;
  margins?: { left: number; right: number };
}

export const useScale = ({
  startDate,
  endDate,
  width,
  margins = { left: 0, right: 0 },
}: UseScaleParams): {
  scale: ScaleTime<number, number>;
  startDate: Date;
  endDate: Date;
} => {
  const scale = useMemo(() => {
    return scaleUtc()
      .domain([startDate, endDate])
      .range([margins.left, width - margins.right]);
  }, [startDate, endDate, width, margins.left, margins.right]);

  return {
    scale,
    startDate,
    endDate,
  };
};
