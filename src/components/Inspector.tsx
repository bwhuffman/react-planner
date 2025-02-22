import { useRegionStore } from "../store/store";

export default function Inspector() {
  const selectedRegions = useRegionStore((state) => state.selectedRegions);
  const deleteRegions = useRegionStore((state) => state.deleteRegions);
  const setSelectedRegions = useRegionStore(
    (state) => state.setSelectedRegions
  );

  const handleDeleteRegion = (id: string) => {
    deleteRegions([id]);
    setSelectedRegions([]);
  };

  const handleDeselectRegion = (id: string) => {
    const regions = selectedRegions.filter((region) => region.id !== id);
    setSelectedRegions(regions);
  };

  return (
    <div className="inspector">
      <h2>Inspector</h2>
      {selectedRegions.map((region) => (
        <div key={region.id}>
          <div style={{ paddingBottom: "16px" }}>
            <h3>Region: {region.label}</h3>
            <button onClick={() => handleDeleteRegion(region.id)}>
              Delete
            </button>
            <button onClick={() => handleDeselectRegion(region.id)}>
              Deselect
            </button>
          </div>
          {Object.entries(region).map(([key, value]) => (
            <div
              key={key}
              style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}
            >
              <strong>{key}:</strong> {String(value)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
