import { useEffect, useRef } from "react";
import { select } from "d3-selection";
import { axisTop } from "d3-axis";
import { usePlannerStore, useScaleStore } from "../store/store";

export const TimeAxis = () => {
  const axisRef = useRef(null);
  const width = usePlannerStore((state) => state.width);
  const axisHeight = usePlannerStore((state) => state.axisHeight);
  const axisTickCount = usePlannerStore((state) => state.axisTickCount);
  const axisSubTickCount = usePlannerStore((state) => state.axisSubTickCount);
  const axisTickSize = usePlannerStore((state) => state.axisTickSize);
  const axisSubTickSize = usePlannerStore((state) => state.axisSubTickSize);
  const scale = useScaleStore((state) => state.scale);

  // update axis on width change
  useEffect(() => {
    if (!axisRef.current) return;

    const svg = select(axisRef.current);
    svg.selectAll("*").remove();

    const axis = axisTop(scale)
      .ticks(axisTickCount)
      .tickSize(axisTickSize)
      .tickSizeOuter(0);

    const g = svg.append("g").attr("transform", `translate(0, ${axisHeight})`);

    g.call(axis);

    // Add sub-ticks
    const tickValues = scale.ticks(axisTickCount);
    tickValues.forEach((tickValue, index) => {
      const x = scale(tickValue);

      // Calculate the interval between major ticks
      const nextTickValue = tickValues[index + 1];
      if (nextTickValue) {
        const interval = (scale(nextTickValue) - x) / (axisSubTickCount + 1);

        // Add sub-ticks between each major tick
        for (let i = 1; i <= axisSubTickCount; i++) {
          const subTickX = x + interval * i;

          g.append("line")
            .attr("x1", subTickX)
            .attr("x2", subTickX)
            .attr("y1", -axisSubTickSize)
            .attr("y2", 0)
            .attr("stroke", "currentColor")
            .attr("stroke-opacity", 0.5);
        }
      }
    });
  }, [width, scale, axisTickCount, axisSubTickCount]);

  return <svg ref={axisRef} width={width} height={axisHeight} />;
};
