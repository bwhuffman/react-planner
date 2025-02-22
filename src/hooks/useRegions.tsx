import { useRegionStore } from "../store/store";

export const useRegions = () => {
  const regions = useRegionStore((state) => state.regions);
  const addRegions = useRegionStore((state) => state.addRegions);
  const updateRegion = useRegionStore((state) => state.updateRegion);
  const deleteRegions = useRegionStore((state) => state.deleteRegions);
  const selectedRegions = useRegionStore((state) => state.selectedRegions);
  const setSelectedRegions = useRegionStore(
    (state) => state.setSelectedRegions
  );
  const getRegion = useRegionStore((state) => state.getRegion);
  const getRegions = useRegionStore((state) => state.getRegions);
  const setRegions = useRegionStore((state) => state.setRegions);

  return {
    regions,
    getRegion,
    getRegions,
    setRegions,
    addRegions,
    updateRegion,
    deleteRegions,
    selectedRegions,
    setSelectedRegions,
  };
};
