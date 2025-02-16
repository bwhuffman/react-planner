import { useEffect, useRef, useState } from "react";
import { select } from "d3-selection";
import { scaleUtc } from "d3-scale";
import { axisTop } from "d3-axis";

type TimeAxisProps = {
  startDate: Date;
  endDate: Date;
  tickCount?: number;
};

export const TimeAxis = ({ startDate, endDate, tickCount }: TimeAxisProps) => {
  const axisRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);

  // set default values
  // TODO: let users configure ticks
  const TICK_SIZE = 6;
  const SUBTICK_SIZE = 4;
  const TICK_COUNT = tickCount || width / 100;
  const SUBTICK_COUNT = 4;
  const margins = { left: 0, right: 0 };

  // update width on resize
  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // update axis on width change
  useEffect(() => {
    if (!axisRef.current) return;

    const svg = select(axisRef.current);
    svg.selectAll("*").remove();

    const scale = scaleUtc()
      .domain([startDate, endDate])
      .range([margins.left, width - margins.right]);

    const axis = axisTop(scale)
      .ticks(TICK_COUNT)
      .tickSize(TICK_SIZE)
      .tickSizeOuter(0);

    const g = svg.append("g").attr("transform", `translate(0, 20)`);

    g.call(axis);

    // Add sub-ticks
    const tickValues = scale.ticks(TICK_COUNT);
    tickValues.forEach((tickValue, index) => {
      const x = scale(tickValue);

      // Calculate the interval between major ticks
      const nextTickValue = tickValues[index + 1];
      if (nextTickValue) {
        const interval = (scale(nextTickValue) - x) / (SUBTICK_COUNT + 1);

        // Add sub-ticks between each major tick
        for (let i = 1; i <= SUBTICK_COUNT; i++) {
          const subTickX = x + interval * i;

          g.append("line")
            .attr("x1", subTickX)
            .attr("x2", subTickX)
            .attr("y1", -SUBTICK_SIZE)
            .attr("y2", 0)
            .attr("stroke", "currentColor")
            .attr("stroke-opacity", 0.5);
        }
      }
    });
  }, [width, startDate, endDate, tickCount]);

  return <svg ref={axisRef} width={width} height={50} />;
};
