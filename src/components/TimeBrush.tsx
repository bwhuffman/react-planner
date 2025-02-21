import { useCallback, useEffect, useRef } from "react";
import { select } from "d3-selection";
import { brushX } from "d3-brush";
import { scaleUtc } from "d3-scale";
import { useScaleStore, usePlannerStore } from "../store/store";

export const TimeBrush = () => {
  const brushRef = useRef(null);
  const width = usePlannerStore((state) => state.width);
  const height = usePlannerStore((state) => state.brushHeight);
  const color = "#f0f0f0";

  const startDate = useScaleStore((state) => state.startDate);
  const endDate = useScaleStore((state) => state.endDate);
  const viewStartDate = useScaleStore((state) => state.viewStartDate);
  const viewEndDate = useScaleStore((state) => state.viewEndDate);
  const setViewRange = useScaleStore((state) => state.setViewRange);

  // Create a scale for the full date range
  const sliderScale = scaleUtc().domain([startDate, endDate]).range([0, width]);

  const onBrush = useCallback(
    (event: any) => {
      if (!event.selection) return;
      const [x0, x1] = event.selection;
      const newViewStart = sliderScale.invert(x0);
      const newViewEnd = sliderScale.invert(x1);
      setViewRange(newViewStart, newViewEnd);
    },
    [sliderScale, setViewRange]
  );

  useEffect(() => {
    if (!brushRef.current) return;

    const brush = brushX()
      .extent([
        [0, 0],
        [width, height],
      ])
      .on("brush end", (event) => {
        // Only respond to user-initiated brush events
        if (!event.sourceEvent) return; // Ignore programmatic brush moves
        onBrush(event);
      });

    const svg = select(brushRef.current);
    svg.selectAll("*").remove();

    // Draw background
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", color);

    // Create and call the brush
    const g = svg.append("g").call(brush);

    // Set initial brush position without triggering events
    const initialSelection: [number, number] = [
      sliderScale(viewStartDate),
      sliderScale(viewEndDate),
    ];
    g.call(brush.move, initialSelection);
  }, [width, height, sliderScale, viewStartDate, viewEndDate, onBrush]);

  return (
    <svg
      className="rp-time-brush"
      ref={brushRef}
      height={height}
      width={width}
    />
  );
};
