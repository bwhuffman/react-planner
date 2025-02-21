import { useScaleStore } from "../store/store";

export const useScale = () => {
  const viewStartDate = useScaleStore((state) => state.viewStartDate);
  const viewEndDate = useScaleStore((state) => state.viewEndDate);
  const extentStartDate = useScaleStore((state) => state.extentStartDate);
  const extentEndDate = useScaleStore((state) => state.extentEndDate);
  const viewScale = useScaleStore.getState().getViewScale();
  const extentScale = useScaleStore.getState().getExtentScale();

  return {
    viewStartDate,
    viewEndDate,
    extentStartDate,
    extentEndDate,
    viewScale,
    extentScale,
  };
};
