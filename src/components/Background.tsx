import { useEffect, useRef } from "react";
import { select, Selection as D3Selection } from "d3-selection";
import { usePlannerStore, useScaleStore } from "../store/store";
import { BackgroundProps, BackgroundVariant } from "../types";

export const Background = ({
  variant = BackgroundVariant.Ticks,
  color = "#ccc",
}: BackgroundProps) => {
  const gridRef = useRef(null);
  const width = usePlannerStore((state) => state.width);
  const height = usePlannerStore((state) => state.height);
  const axisHeight = usePlannerStore((state) => state.axisHeight);
  const axisTickCount = usePlannerStore((state) => state.axisTickCount);
  const axisSubTickCount = usePlannerStore((state) => state.axisSubTickCount);
  const viewScale = useScaleStore.getState().getViewScale();
  const brushHeight = usePlannerStore((state) => state.brushHeight);
  const topOffset = axisHeight + brushHeight;
  const tickValues = viewScale.ticks(axisTickCount);

  const isTicks = variant === BackgroundVariant.Ticks;
  const isSubTicks = variant === BackgroundVariant.SubTicks;
  const isChannels = variant === BackgroundVariant.Channels;

  const drawSubGrid = (
    g: D3Selection<SVGGElement, unknown, HTMLElement, any>,
    tickValues: Date[]
  ) => {
    if (!gridRef.current) return;

    tickValues.forEach((tickValue, index) => {
      const x = viewScale(tickValue);
      const nextTickValue = tickValues[index + 1];

      if (nextTickValue) {
        const interval =
          (viewScale(nextTickValue) - x) / (axisSubTickCount + 1);

        for (let i = 1; i <= axisSubTickCount; i++) {
          const subTickX = x + interval * i;
          g.append("line")
            .attr("x1", subTickX)
            .attr("x2", subTickX)
            .attr("y1", topOffset)
            .attr("y2", height - topOffset)
            .attr("stroke", color)
            .attr("stroke-opacity", 0.2);
        }
      }
    });
  };

  const drawGrid = (
    g: D3Selection<SVGGElement, unknown, HTMLElement, any>,
    tickValues: Date[]
  ) => {
    if (!gridRef.current) return;

    tickValues.forEach((tickValue) => {
      const x = viewScale(tickValue);
      g.append("line")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", topOffset)
        .attr("y2", height - topOffset)
        .attr("stroke", color)
        .attr("stroke-opacity", 0.5);
    });
  };

  useEffect(() => {
    if (!gridRef.current) return;

    const svg = select(gridRef.current);
    svg.selectAll("*").remove();
    const gridGroup = svg.append("g");

    // draw major gridlines
    if (isTicks || isSubTicks) drawGrid(gridGroup, tickValues);
    // Draw minor gridlines
    if (isSubTicks) drawSubGrid(gridGroup, tickValues);
    // Draw channel gridlines
    if (isChannels) console.warn("TODO: Implement channel grid background.");
  }, [viewScale, width, height, axisTickCount, axisSubTickCount]);

  return (
    <svg
      className="rp-time-grid"
      ref={gridRef}
      width={width}
      height={height - topOffset}
    />
  );
};
