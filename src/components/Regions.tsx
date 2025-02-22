import { useEffect, useRef, useMemo } from "react";
import { select } from "d3-selection";

// types
import { usePlannerStore, useScaleStore, useRegionStore } from "../store/store";
import { Region as RegionType } from "../types";
import { getTimeFromPosition } from "../utils";

export function Regions() {
  const regionsRef = useRef(null);
  const regions = useRegionStore((state) => state.regions);
  const selectedRegions = useRegionStore((state) => state.selectedRegions);
  const setSelectedRegions = useRegionStore(
    (state) => state.setSelectedRegions
  );
  const width = usePlannerStore((state) => state.width);
  const regionHeight = usePlannerStore((state) => state.regionHeight);
  const regionPadding = usePlannerStore((state) => state.regionPadding);
  const viewScale = useScaleStore.getState().getViewScale();

  // Group regions by channelId
  const groupedRegions = useMemo(() => {
    console.log("grouping regions");
    return regions.reduce((acc, region) => {
      if (!acc[region.channelId]) {
        acc[region.channelId] = [];
      }
      acc[region.channelId].push(region);
      return acc;
    }, {} as { [key: string]: RegionType[] });
  }, [regions]);

  const channelCount = Object.keys(groupedRegions).length;
  const channelIds = Object.keys(groupedRegions);

  useEffect(() => {
    if (!regionsRef.current) return;

    const regionsSvg = select(regionsRef.current);
    regionsSvg.selectAll("*").remove();

    // create channel groups
    const regionGroups = regionsSvg
      .selectAll("g")
      .data(channelIds)
      .enter()
      .append("g")
      .attr("class", (d) => `channel-${d}`)
      .attr(
        "transform",
        (_, channelIndex) =>
          `translate(0, ${channelIndex * (regionHeight + regionPadding)})`
      );

    // Create rectangles and text for each region in the grouped regions
    channelIds.forEach((channelId, channelIndex) => {
      const regionsInChannel = groupedRegions[channelId];

      regionsInChannel.forEach((region, regionIndex) => {
        const regionGroup = regionsSvg
          .select(`.channel-${channelId}`) // Select the specific channel group
          .append("g") // append region to channel
          .attr("class", (d) => `rp-region-group region-${d}`)
          .attr(
            "transform",
            `translate(${viewScale(new Date(region.start))}, 0)`
          ); //translate(${viewScale(new Date(region.start))}, ${i * (REGION_HEIGHT + REGION_PADDING)})`

        regionGroup
          .append("rect")
          .attr("class", "rp-region")
          .attr(
            "width",
            viewScale(new Date(region.end)) - viewScale(new Date(region.start))
          )
          .attr("height", regionHeight)
          .attr("fill", region.color || "black")
          .attr("opacity", 0.8)
          .attr(
            "stroke",
            selectedRegions.find((r) => r.id === region.id) ? "blue" : "none"
          )
          .attr("stroke-width", 2)
          .on("click", (event, d) => {
            event.preventDefault();
            setSelectedRegions([region]);
          });

        regionGroup
          .append("text")
          .attr("x", 5) // Align text to the start of the region
          .attr("y", regionHeight / 2 + 5) // Center the text vertically in the rectangle
          .attr("class", "rp-region-label")
          .text(region.label); // Optional: set text color
      });
    });

    // Add mouse move listener to show current time
    regionsSvg.on("mousemove", (event) => {
      if (!regionsRef.current) return;
      // const currentTime = getTimeFromPosition(event, viewScale, regionsRef.current);
      // console.log("Hover time:", currentTime.toISOString());
    });
  }, [width, regions, selectedRegions, viewScale]);

  return (
    <svg
      className="rp-regions"
      ref={regionsRef}
      width={width}
      height={channelCount * (regionHeight + regionPadding)}
    />
  );
}
