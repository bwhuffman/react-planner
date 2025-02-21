import { PropsWithChildren } from "react";
import { usePlannerStore } from "../store/store";

interface ReactPlannerProps {
  width?: number;
  height?: number;
  taskHeight?: number;
  taskPadding?: number;
  axisHeight?: number;
  axisTickCount?: number;
  axisSubTickCount?: number;
  axisTickSize?: number;
  axisSubTickSize?: number;
  brushHeight?: number;
  brushColor?: string;
}

export function ReactPlanner({
  width = 960,
  height = 960,
  taskHeight = 20,
  taskPadding = 4,
  axisHeight = 48,
  axisTickCount = 8,
  axisSubTickCount = 4,
  axisTickSize = 6,
  axisSubTickSize = 3,
  brushHeight = 40,
  brushColor = "#f0f0f0",
  children,
}: PropsWithChildren<ReactPlannerProps>) {
  usePlannerStore.setState({
    width,
    height,
    taskHeight,
    taskPadding,
    axisHeight,
    axisTickCount,
    axisSubTickCount,
    axisTickSize,
    axisSubTickSize,
    brushHeight,
    brushColor,
  });

  return (
    <div id="rp-1" className="react-planner" style={{ width, height }}>
      {children}
    </div>
  );
}
