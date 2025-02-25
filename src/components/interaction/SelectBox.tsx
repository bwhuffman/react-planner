import { usePlannerStore } from "../../store/store";

import { boxToAbsRect } from "../../utils/interactions";

export function SelectBox() {
  const userIsSelecting = usePlannerStore((state) => state.userIsSelecting);
  const userSelectionBox = usePlannerStore((state) => state.userSelectionBox);
  const isActive = userIsSelecting && userSelectionBox;

  if (!isActive) {
    return null;
  }

  const selectionRect = boxToAbsRect(userSelectionBox);

  return (
    <div
      className="rp-select-box"
      style={{
        transform: `translate(${selectionRect.x}px, ${selectionRect.y}px)`,
        width: selectionRect.width,
        height: selectionRect.height,
      }}
    />
  );
}
