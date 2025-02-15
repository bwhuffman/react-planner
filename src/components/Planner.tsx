import { v4 as uuidv4 } from "uuid";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../types";

export default function Planner() {
  const { tasks, addTask, deleteTask } = useTasks();
  return (
    <div>
      <button
        onClick={() =>
          addTask({
            id: uuidv4(),
            label: "New Task",
            start: new Date(),
            end: new Date(),
          })
        }
      >
        Add Task
      </button>
      {tasks.map((task: Task) => (
        <div key={task.id} style={{ border: "1px solid #000000" }}>
          <div>{task.label}</div>
          <div>{task.start.toISOString()}</div>
          <div>{task.end.toISOString()}</div>
          <button onClick={() => deleteTask(task.id)}>Delete Task</button>
        </div>
      ))}
    </div>
  );
}
