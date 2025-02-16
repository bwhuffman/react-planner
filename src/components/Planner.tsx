import { TimeAxis } from "./TimeAxis";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../types";
import { scaleUtc } from "d3-scale";

export default function Planner() {
  const { tasks, addTask, deleteTask } = useTasks();

  const x = scaleUtc(
    [new Date("2000-01-01"), new Date("2000-01-02")],
    [0, 960]
  );
  x(new Date("2000-01-01T05:00Z")); // 200
  x(new Date("2000-01-01T16:00Z")); // 640
  x.invert(200); // 2000-01-01T05:00Z
  x.invert(640); // 2000-01-01T16:00Z

  return (
    <div>
      <TimeAxis
        startDate={new Date("2000-01-01")}
        endDate={new Date("2000-01-02")}
      />
      <hr />
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
