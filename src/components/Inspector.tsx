import { useTaskStore } from "../store/store";

export default function Inspector() {
  const selectedTasks = useTaskStore((state) => state.selectedTasks);

  return (
    <div className="inspector" style={{ minWidth: "300px" }}>
      <h2>Inspector</h2>
      {selectedTasks.map((task) => (
        <div key={task.id}>{JSON.stringify(task, null, 2)}</div>
      ))}
    </div>
  );
}
