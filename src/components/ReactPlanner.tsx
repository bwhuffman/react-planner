import { PropsWithChildren } from "react";
import { usePlannerStore } from "../store/store";

interface ReactPlannerProps {
  width?: number;
  height?: number;
  regionHeight?: number;
  regionPadding?: number;
  axisHeight?: number;
  axisTickCount?: number;
  axisSubTickCount?: number;
  axisTickSize?: number;
  axisSubTickSize?: number;
  axisTickPadding?: number;
  brushHeight?: number;
  brushColor?: string;
  // interaction design patterns
  selectionOnDrag?: boolean;
}

export function ReactPlanner({
  width = 960,
  height = 960,
  regionHeight = 20,
  regionPadding = 4,
  axisHeight = 48,
  axisTickCount = 5,
  axisSubTickCount = 3,
  axisTickSize = 8,
  axisSubTickSize = 3,
  axisTickPadding = 8,
  brushHeight = 40,
  selectionOnDrag = true,
  brushColor = "#f0f0f0",
  children,
}: PropsWithChildren<ReactPlannerProps>) {
  usePlannerStore.setState({
    width,
    height,
    regionHeight,
    regionPadding,
    axisHeight,
    axisTickCount,
    axisSubTickCount,
    axisTickSize,
    axisSubTickSize,
    axisTickPadding,
    brushHeight,
    brushColor,
    selectionOnDrag,
  });

  return (
    <div id="rp-1" className="react-planner" style={{ width, height }}>
      {children}
    </div>
  );
}
