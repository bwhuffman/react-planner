import { useTaskStore } from "../store/store";

export default function Inspector() {
  const selectedTasks = useTaskStore((state) => state.selectedTasks);
  const deleteTasks = useTaskStore((state) => state.deleteTasks);
  const setSelectedTasks = useTaskStore((state) => state.setSelectedTasks);

  const handleDeleteTask = (id: string) => {
    deleteTasks([id]);
    setSelectedTasks([]);
  };

  const handleDeselectTask = (id: string) => {
    const tasks = selectedTasks.filter((task) => task.id !== id);
    setSelectedTasks(tasks);
  };

  return (
    <div className="inspector">
      <h2>Inspector</h2>
      {selectedTasks.map((task) => (
        <div key={task.id}>
          <div style={{ paddingBottom: "16px" }}>
            <h3>Task: {task.label}</h3>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            <button onClick={() => handleDeselectTask(task.id)}>
              Deselect
            </button>
          </div>
          {Object.entries(task).map(([key, value]) => (
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
