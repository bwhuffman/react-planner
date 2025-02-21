import { useCallback, useEffect, useRef } from "react";
import { select } from "d3-selection";
import { brushX } from "d3-brush";
import { useScaleStore, usePlannerStore } from "../store/store";

export const TimeBrush = () => {
  const brushRef = useRef(null);
  const width = usePlannerStore((state) => state.width);
  const height = usePlannerStore((state) => state.brushHeight);
  const viewStartDate = useScaleStore((state) => state.viewStartDate);
  const viewEndDate = useScaleStore((state) => state.viewEndDate);
  const setViewRange = useScaleStore((state) => state.setViewRange);
  const extentScale = useScaleStore.getState().getExtentScale();
  const brushColor = usePlannerStore((state) => state.brushColor);

  const onBrush = useCallback(
    (event: any) => {
      if (!event.selection) return;
      const [x0, x1] = event.selection;
      const newViewStart = extentScale.invert(x0);
      const newViewEnd = extentScale.invert(x1);
      setViewRange(newViewStart, newViewEnd);
    },
    [extentScale, setViewRange]
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
      .attr("fill", brushColor);

    // Create and call the brush
    const g = svg.append("g").call(brush);

    // Set initial brush position without triggering events
    const initialSelection: [number, number] = [
      extentScale(viewStartDate),
      extentScale(viewEndDate),
    ];
    g.call(brush.move, initialSelection);
  }, [width, height, extentScale, viewStartDate, viewEndDate, onBrush]);

  return (
    <svg
      className="rp-time-brush"
      ref={brushRef}
      height={height}
      width={width}
    />
  );
};
