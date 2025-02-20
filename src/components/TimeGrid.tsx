import { useEffect, useRef } from "react";
import { select } from "d3-selection";
import { usePlannerStore, useScaleStore } from "../store/store";

export const TimeGrid = () => {
  const gridRef = useRef(null);
  const width = usePlannerStore((state) => state.width);
  const height = usePlannerStore((state) => state.height);
  const axisHeight = usePlannerStore((state) => state.axisHeight);
  const axisTickCount = usePlannerStore((state) => state.axisTickCount);
  const axisSubTickCount = usePlannerStore((state) => state.axisSubTickCount);
  const scale = useScaleStore((state) => state.scale);

  useEffect(() => {
    if (!gridRef.current) return;

    const svg = select(gridRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    // Draw major gridlines
    const tickValues = scale.ticks(axisTickCount);
    tickValues.forEach((tickValue) => {
      const x = scale(tickValue);
      g.append("line")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", axisHeight)
        .attr("y2", height - axisHeight)
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1);
    });

    // Draw minor gridlines
    tickValues.forEach((tickValue, index) => {
      const x = scale(tickValue);
      const nextTickValue = tickValues[index + 1];

      if (nextTickValue) {
        const interval = (scale(nextTickValue) - x) / (axisSubTickCount + 1);

        for (let i = 1; i <= axisSubTickCount; i++) {
          const subTickX = x + interval * i;
          g.append("line")
            .attr("x1", subTickX)
            .attr("x2", subTickX)
            .attr("y1", axisHeight)
            .attr("y2", height - axisHeight)
            .attr("stroke", "currentColor")
            .attr("stroke-opacity", 0.05);
        }
      }
    });
  }, [scale, width, height, axisTickCount, axisSubTickCount]);

  return (
    <svg
      className="rp-time-grid"
      ref={gridRef}
      width={width}
      height={height - axisHeight}
    />
  );
};
