// components
import { TimeGrid } from "./TimeGrid";
import { TimeAxis } from "./TimeAxis";
import { Tasks } from "./Tasks";
import Inspector from "./Inspector";

// hooks
import { useTaskStore } from "../store/store";

// utils
import { v4 as uuidv4 } from "uuid";
import { getRandomTimeInRange, getHexColor } from "../utils";
import { utcDay } from "d3-time";

const utcPlanStart = new Date(Date.UTC(2025, 2, 2, 0, 0, 0));
const utcPlanEnd = utcDay.offset(utcPlanStart, 1);

export default function Planner() {
  const tasks = useTaskStore((state) => state.tasks);
  const addTasks = useTaskStore((state) => state.addTasks);
  const deleteTasks = useTaskStore((state) => state.deleteTasks);

  const handleAddTask = () => {
    const timeRange = getRandomTimeInRange(utcPlanStart, utcPlanEnd);
    addTasks([
      {
        id: uuidv4(),
        label: "New Task",
        start: timeRange.start,
        end: timeRange.end,
        color: getHexColor(),
      },
    ]);
  };

  const handleDeleteTasks = () => {
    deleteTasks([...tasks.map((task) => task.id)]);
  };

  return (
    <div className="planner">
      <div className="header">
        <div className="header-title">
          <h1>Planner</h1>
        </div>
        <div className="header-actions">
          <button onClick={handleAddTask}>Add Task</button>
          <button onClick={handleDeleteTasks}>Reset</button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ position: "relative" }}>
          <TimeGrid />
          <TimeAxis />
          <Tasks />
        </div>
        <Inspector />
      </div>
    </div>
  );
}
