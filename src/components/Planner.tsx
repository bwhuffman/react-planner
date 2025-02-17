// components
import { TimeAxis } from "./TimeAxis";
import { Tasks } from "./Tasks";

// helpers
import { useTasks } from "../hooks/useTasks";
import { usePlanner } from "../hooks/usePlanner";
import { useScale } from "../hooks/useScale";

// utils
import { v4 as uuidv4 } from "uuid";
import { getRandomTimeInRange } from "../utils";
import { utcDay } from "d3-time";

const utcPlanStart = new Date(Date.UTC(2025, 2, 2, 0, 0, 0));
const utcPlanEnd = utcDay.offset(utcPlanStart, 1);

export default function Planner() {
  const { tasks, addTasks, deleteTasks } = useTasks();
  const { width, height } = usePlanner();
  const { scale } = useScale({
    startDate: utcPlanStart,
    endDate: utcPlanEnd,
    width: width,
  });

  const handleAddTask = () => {
    const timeRange = getRandomTimeInRange(utcPlanStart, utcPlanEnd);
    addTasks([
      {
        id: uuidv4(),
        label: "New Task",
        start: timeRange.start,
        end: timeRange.end,
        color:
          "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
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
      <TimeAxis scale={scale} width={width} height={height} />
      <Tasks tasks={tasks} scale={scale} width={width} />
    </div>
  );
}
