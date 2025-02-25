import { useRef, useMemo, MouseEvent, WheelEvent } from "react";
import { Channel } from "./Channel";
import { usePlannerStore, useRegionStore, useScaleStore } from "../store/store";

import { SelectBox } from "./interaction/SelectBox";

import { getTimeFromPosition } from "../utils";

// types
import { Region, Rect } from "../types";
import {
  boxToAbsRect,
  getOverlappingArea,
  pointInRect,
} from "../utils/interactions";

export function Plan() {
  const channelsRef = useRef<HTMLDivElement>(null);

  const viewScale = useScaleStore.getState().getViewScale();

  const regions = useRegionStore((state) => state.regions);
  const regionHeight = usePlannerStore((state) => state.regionHeight);
  const regionPadding = usePlannerStore((state) => state.regionPadding);

  const setSelectedRegions = useRegionStore(
    (state) => state.setSelectedRegions
  );

  const selectionOnDrag = usePlannerStore((state) => state.selectionOnDrag);
  const selectionBox = usePlannerStore((state) => state.userSelectionBox);
  const userIsSelecting = usePlannerStore((state) => state.userIsSelecting);
  const setUserSelection = usePlannerStore((state) => state.setUserSelection);

  // TODO: figure out better way to deal with memoizing channels than querying all regions.
  const channels = useMemo(
    () => useRegionStore.getState().getChannels(),
    [regions]
  );
  const channelIds = Object.keys(channels);

  const onPaneMouseDown = (e: MouseEvent) => {
    console.log("on mouse down");
    // Check if the click is on a child region
    if ((e.target as HTMLElement).closest(".rp-region-group")) {
      return; // Prevent selection if clicking on a region
    }

    if (!channelsRef.current) return;
    const rect = channelsRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    setUserSelection(true, {
      x: startX,
      y: startY,
      x2: startX,
      y2: startY,
    });
  };

  const onPaneMouseMove = (e: MouseEvent) => {
    if (!channelsRef.current) return;

    // get current time on channel hover
    // const cursorValue = getTimeFromPosition(e, viewScale, channelsRef.current);
    // console.log("cursor time:", cursorValue.toISOString());

    if (!userIsSelecting) return;
    const rect = channelsRef.current.getBoundingClientRect();

    setUserSelection(true, {
      ...selectionBox!,
      x2: e.clientX - rect.left,
      y2: e.clientY - rect.top,
    });
  };

  const onPaneMouseUp = () => {
    console.log("on mouse up");
    if (!userIsSelecting || !selectionBox) return;
    // Get selected regions from overlap between box and region rects
    const selectedRegions = regions.filter((region) => {
      // get channel index for calculating abs height
      const channelIndex = channelIds.indexOf(region.channelId);
      const absHeight = channelIndex * (regionPadding + regionHeight);

      const regionRect: Rect = {
        x: viewScale(region.start),
        y: absHeight + regionPadding,
        width: viewScale(region.end) - viewScale(region.start),
        height: absHeight + regionHeight + regionPadding,
      };
      return getOverlappingArea(regionRect, boxToAbsRect(selectionBox)) > 0;
    });

    // update selected regions
    setSelectedRegions(selectedRegions);
    // reset selection box
    setUserSelection(false, null);
  };

  const onPaneClick = () => {
    console.log("on pane click");
    setSelectedRegions([]);
    setUserSelection(false, null);
  };

  const onPaneContextMenu = (e: MouseEvent) => {
    e.preventDefault(); // stop browser context menu from opening
    console.log("on pane context menu");
    // TODO: trigger custom pane context menu later
    // onPaneContextMenu?.(e);
  };

  return (
    <div
      ref={channelsRef}
      className="rp-channels"
      onClick={onPaneClick}
      onContextMenu={onPaneContextMenu}
      // onWheel={onPaneWheel}
      // onMouseEnter={onPaneMouseEnter}
      onMouseDown={selectionOnDrag ? onPaneMouseDown : undefined}
      onMouseUp={selectionOnDrag ? onPaneMouseUp : undefined}
      onMouseMove={selectionOnDrag ? onPaneMouseMove : undefined}
      // onMouseLeave={onPaneMouseLeave}
      style={{ position: "relative" }}
    >
      {channelIds.map((channelId) => (
        <Channel
          key={channelId}
          channelId={channelId}
          regions={channels[channelId]}
        />
      ))}
      <SelectBox />
    </div>
  );
}
