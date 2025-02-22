// components
import { ReactPlanner } from "../components/ReactPlanner";
import { Regions } from "../components/Regions";
import { Background } from "../components/Background";
import { Axis } from "../components/Axis";
import { Brush } from "../components/Brush";

import Inspector from "../components/Inspector";

// hooks
import { useScaleStore, useRegionStore } from "../store/store";

// utils
import { v4 as uuidv4 } from "uuid";
import { getRandomTimeInRange, getHexColor } from "../utils";
import { utcDay } from "d3-time";

import { BackgroundVariant } from "../types";

const utcPlanStart = new Date(Date.UTC(2025, 2, 2, 0, 0, 0));
const utcPlanEnd = utcDay.offset(utcPlanStart, 1);

export default function Plan() {
  const regions = useRegionStore((state) => state.regions);
  const addRegions = useRegionStore((state) => state.addRegions);
  const deleteRegions = useRegionStore((state) => state.deleteRegions);
  const extentStartDate = useScaleStore((state) => state.extentStartDate);
  const extentEndDate = useScaleStore((state) => state.extentEndDate);
  const viewStartDate = useScaleStore((state) => state.viewStartDate);
  const viewEndDate = useScaleStore((state) => state.viewEndDate);
  const zoomToFit = useScaleStore((state) => state.zoomToFit);
  const zoomToExtent = useScaleStore((state) => state.zoomToExtent);
  const zoomOut = useScaleStore((state) => state.zoomOut);
  const zoomIn = useScaleStore((state) => state.zoomIn);
  const panLeft = useScaleStore((state) => state.panLeft);
  const panRight = useScaleStore((state) => state.panRight);

  const handleAddRegion = () => {
    const timeRange = getRandomTimeInRange(utcPlanStart, utcPlanEnd);
    const timeRange2 = getRandomTimeInRange(utcPlanStart, utcPlanEnd);
    const channelId = uuidv4();

    addRegions([
      {
        id: uuidv4(),
        channelId: channelId,
        label: "New Region",
        start: timeRange.start,
        end: timeRange.end,
        color: getHexColor(),
      },
      {
        id: uuidv4(),
        channelId: channelId,
        label: "New Region 2",
        start: timeRange2.start,
        end: timeRange2.end,
        color: getHexColor(),
      },
    ]);
  };

  const handleDeleteRegions = () => {
    deleteRegions([...regions.map((region) => region.id)]);
  };

  return (
    <div className="app" style={{ height: "100%" }}>
      <div className="header">
        <div className="header-title">
          <h1>Planner</h1>
          <div>
            <div>
              {extentStartDate.toISOString()} - {extentEndDate.toISOString()}
            </div>
            <div style={{ color: "#ccc" }}>
              {viewStartDate.toISOString()} - {viewEndDate.toISOString()}
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button onClick={handleAddRegion}>Add Region</button>
          <button onClick={handleDeleteRegions}>Delete All Regions</button>
          <button onClick={zoomToFit}>Zoom to Fit</button>
          <button onClick={zoomToExtent}>Zoom to Extent</button>
          <button onClick={zoomIn}>Zoom In</button>
          <button onClick={zoomOut}>Zoom Out</button>
          <button onClick={() => panLeft(1000 * 60 * 60)}>Pan Left</button>
          <button onClick={() => panRight(1000 * 60 * 60)}>Pan Right</button>
        </div>
      </div>
      <div
        style={{
          height: "100%",
          display: "grid",
          gridTemplateColumns: "4fr 1fr",
        }}
      >
        <ReactPlanner regionHeight={40} regionPadding={4} axisHeight={48}>
          <Brush />
          <Axis />
          <Background variant={BackgroundVariant.SubTicks} color="#ccc" />
          <Regions />
        </ReactPlanner>
        <Inspector />
      </div>
    </div>
  );
}
