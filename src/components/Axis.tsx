import { useEffect, useRef, useMemo } from "react";
import { select } from "d3-selection";
import { axisTop } from "d3-axis";
import { usePlannerStore, useScaleStore } from "../store/store";

export const Axis = () => {
  const axisRef = useRef(null);
  const width = usePlannerStore((state) => state.width);
  const axisHeight = usePlannerStore((state) => state.axisHeight);
  const axisTickCount = usePlannerStore((state) => state.axisTickCount);
  const axisSubTickCount = usePlannerStore((state) => state.axisSubTickCount);
  const axisTickSize = usePlannerStore((state) => state.axisTickSize);
  const axisSubTickSize = usePlannerStore((state) => state.axisSubTickSize);
  const axisTickPadding = usePlannerStore((state) => state.axisTickPadding);
  const viewScale = useScaleStore.getState().getViewScale();
  const timeFormat = usePlannerStore((state) => state.timeFormat);

  /**
   * Calculate the sub-ticks for the axis
   * @param tickValues - The tick values to calculate the sub-ticks for
   * @returns The sub-ticks
   */
  const calculateSubTicks = useMemo(() => {
    return (tickValues: Date[]) => {
      return tickValues.flatMap((tickValue, index) => {
        const nextTickValue = tickValues[index + 1];
        if (!nextTickValue) return [];

        const x = viewScale(tickValue);
        const interval =
          (viewScale(nextTickValue) - x) / (axisSubTickCount + 1);

        return Array.from({ length: axisSubTickCount }, (_, i) => ({
          x: x + interval * (i + 1),
        }));
      });
    };
  }, [viewScale, axisSubTickCount]);

  // update axis on width change
  useEffect(() => {
    if (!axisRef.current) return;

    const svg = select(axisRef.current);
    let g = svg.select<SVGGElement>("g");

    // Add sub-ticks

    // TODO: manually calculate tick values to make 'axisTickCount' return exact.
    // By deafult, the tick count passed to .ticks() is a suggestion, and the scale
    // may return more or fewer values depending on the domain.
    const tickValues = viewScale.ticks(axisTickCount);
    const subTickValues = calculateSubTicks(tickValues);

    // create new axis
    const axis = axisTop(viewScale)
      .tickValues(tickValues)
      .tickFormat((d) => timeFormat(d as any)) // TODO: fix type; date or number depending on scale
      .tickSize(axisTickSize)
      .tickPadding(axisTickPadding)
      .tickSizeOuter(0);

    // Create axis if it doesn't exist, otherwise update it
    if (g.empty()) {
      g = svg
        .append<SVGGElement>("g")
        .attr("transform", `translate(0, ${axisHeight})`);
    }

    // transition axis positions
    g.call(axis);
    // getD3Transition(g).call(axis);

    const subTicks = g
      .selectAll<SVGLineElement, { x: number }>(".sub-tick")
      .data(subTickValues);

    // Enter new sub-ticks
    subTicks
      .enter()
      .append("line")
      .attr("class", "sub-tick")
      .merge(subTicks)
      .attr("x1", (d) => d.x)
      .attr("x2", (d) => d.x)
      .attr("y1", -axisSubTickSize)
      .attr("y2", 0)
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.5);

    // Remove old sub-ticks
    subTicks.exit().remove();
  }, [width, viewScale, axisTickCount, axisSubTickCount]);

  return (
    <svg
      className="rp-time-axis"
      ref={axisRef}
      width={width}
      height={axisHeight}
    />
  );
};
