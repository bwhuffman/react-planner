import { Task as TaskType } from "../types";

export function Task({
  id,
  label,
  start,
  end,
  color = "#000000",
  hidden,
  selected,
}: TaskType) {
  return (
    <div
      key={id}
      style={{
        backgroundColor: color,
        border: `1px solid ${
          selected ? "var(--rp-color-accent)" : "transparent"
        }`,
        display: hidden ? "none" : "block",
      }}
    >
      <div>{label}</div>
      <div>{start.toISOString()}</div>
      <div>{end.toISOString()}</div>
      {/* <button onClick={() => deleteTasks([id])}>Delete Task</button> */}
    </div>
  );
}
