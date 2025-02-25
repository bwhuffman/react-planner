import { useEffect, useRef, useMemo } from "react";
import { select } from "d3-selection";

// types
import { usePlannerStore, useScaleStore, useRegionStore } from "../store/store";
import { Region } from "../types";

interface ChannelProps {
  channelId: string;
  regions: Region[];
}

export function Channel({ channelId, regions }: ChannelProps) {
  const channelRef = useRef(null);
  const selectedRegions = useRegionStore((state) => state.selectedRegions);
  const setSelectedRegions = useRegionStore(
    (state) => state.setSelectedRegions
  );
  const width = usePlannerStore((state) => state.width);
  const regionHeight = usePlannerStore((state) => state.regionHeight);
  const regionPadding = usePlannerStore((state) => state.regionPadding);
  const viewScale = useScaleStore.getState().getViewScale();

  useEffect(() => {
    if (!channelRef.current) return;

    const channelSvg = select(channelRef.current);
    channelSvg.selectAll("*").remove();

    const regionGroup = channelSvg
      .attr("class", "rp-channel")
      .attr("data-channel-id", channelId)
      .selectAll("g")
      .data(regions)
      .enter()
      .append("g")
      .attr("class", (d) => `rp-region-group region-${d.id}`)
      .attr(
        "transform",
        (d) => `translate(${viewScale(new Date(d.start))}, 0)`
      ); //translate(${viewScale(new Date(region.start))}, ${i * (REGION_HEIGHT + REGION_PADDING)})`

    regionGroup
      .append("rect")
      .attr("class", "rp-region")
      .attr(
        "width",
        (d) => viewScale(new Date(d.end)) - viewScale(new Date(d.start))
      )
      .attr("height", regionHeight)
      .attr("fill", (d) => d.color || "black")
      .attr("opacity", 0.8)
      .attr("stroke", (d) =>
        selectedRegions.find((r) => r.id === d.id) ? "blue" : "none"
      )
      .attr("stroke-width", 2)
      .on("click", (event, d) => {
        event.preventDefault();
        console.log("REGION CLICKED");
        setSelectedRegions([d]);
      });

    regionGroup
      .append("text")
      .attr("x", 5) // Align text to the start of the region
      .attr("y", regionHeight / 2 + 5) // Center the text vertically in the rectangle
      .attr("class", "rp-region-label")
      .text((d) => d.label); // Optional: set text color
  }, [width, regions, selectedRegions, viewScale]);

  return (
    <svg
      className="rp-channel"
      ref={channelRef}
      width={width}
      height={regionHeight + regionPadding}
    />
  );
}
