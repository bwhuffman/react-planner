import { useRef, useMemo } from "react";
import { Channel } from "./Channel";
import { useRegionStore } from "../store/store";
import { Region } from "../types";

export function Channels() {
  const channelsRef = useRef(null);
  const regions = useRegionStore((state) => state.regions);

  // Group regions by channelId
  const channels = useMemo(() => {
    console.log("grouping regions");
    return regions.reduce((acc, region) => {
      if (!acc[region.channelId]) acc[region.channelId] = [];
      acc[region.channelId].push(region);
      return acc;
    }, {} as { [key: string]: Region[] });
  }, [regions]);

  const channelIds = Object.keys(channels);

  return (
    <div ref={channelsRef} className="rp-channels">
      {channelIds.map((channelId) => (
        <Channel
          key={channelId}
          channelId={channelId}
          regions={channels[channelId]}
        />
      ))}
    </div>
  );
}
