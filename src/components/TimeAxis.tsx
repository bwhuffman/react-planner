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

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (!axisRef.current) return;

    const svg = select(axisRef.current);
    svg.selectAll("*").remove();

    const margin = { left: 20, right: 20 };
    const scale = scaleUtc()
      .domain([startDate, endDate])
      .range([margin.left, width - margin.right]);

    const axis = axisTop(scale).ticks(tickCount || width / 100);

    svg.append("g").attr("transform", `translate(0, 20)`).call(axis);
  }, [width, startDate, endDate, tickCount]);

  return <svg ref={axisRef} width={width} height={50} />;
};
