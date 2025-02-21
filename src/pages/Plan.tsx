// components
import { ReactPlanner } from "../components/ReactPlanner";
import { Tasks } from "../components/Tasks";
import { Background } from "../components/Background";
import { Axis } from "../components/Axis";
import { Brush } from "../components/Brush";

import Inspector from "../components/Inspector";

// hooks
import { useScaleStore, useTaskStore } from "../store/store";

// utils
import { v4 as uuidv4 } from "uuid";
import { getRandomTimeInRange, getHexColor } from "../utils";
import { utcDay } from "d3-time";

const utcPlanStart = new Date(Date.UTC(2025, 2, 2, 0, 0, 0));
const utcPlanEnd = utcDay.offset(utcPlanStart, 1);

export default function Plan() {
  const tasks = useTaskStore((state) => state.tasks);
  const addTasks = useTaskStore((state) => state.addTasks);
  const deleteTasks = useTaskStore((state) => state.deleteTasks);
  const extentStartDate = useScaleStore((state) => state.extentStartDate);
  const extentEndDate = useScaleStore((state) => state.extentEndDate);
  const viewStartDate = useScaleStore((state) => state.viewStartDate);
  const viewEndDate = useScaleStore((state) => state.viewEndDate);
  const zoomToFit = useScaleStore((state) => state.zoomToFit);
  const zoomToExtent = useScaleStore((state) => state.zoomToExtent);
  const zoomOut = useScaleStore((state) => state.zoomOut);
  const zoomIn = useScaleStore((state) => state.zoomIn);

  const handleAddTask = () => {
    const timeRange = getRandomTimeInRange(utcPlanStart, utcPlanEnd);
    const timeRange2 = getRandomTimeInRange(utcPlanStart, utcPlanEnd);
    const channelId = uuidv4();

    addTasks([
      {
        id: uuidv4(),
        channelId: channelId,
        label: "New Task",
        start: timeRange.start,
        end: timeRange.end,
        color: getHexColor(),
      },
      {
        id: uuidv4(),
        channelId: channelId,
        label: "New Task 2",
        start: timeRange2.start,
        end: timeRange2.end,
        color: getHexColor(),
      },
    ]);
  };

  const handleDeleteTasks = () => {
    deleteTasks([...tasks.map((task) => task.id)]);
  };

  return (
    <div className="app" style={{ height: "100%" }}>
      <div className="header">
        <div className="header-title">
          <h1>Planner</h1>
          <div>
            <div>
              {extentStartDate.toISOString()} - {extentEndDate.toISOString()}
            </div>
            <div style={{ color: "#ccc" }}>
              {viewStartDate.toISOString()} - {viewEndDate.toISOString()}
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button onClick={handleAddTask}>Add Task</button>
          <button onClick={handleDeleteTasks}>Delete All Tasks</button>
          <button onClick={zoomToFit}>Zoom to Fit</button>
          <button onClick={zoomToExtent}>Zoom to Extent</button>
          <button onClick={zoomIn}>Zoom In</button>
          <button onClick={zoomOut}>Zoom Out</button>
        </div>
      </div>
      <div
        style={{
          height: "100%",
          display: "grid",
          gridTemplateColumns: "4fr 1fr",
        }}
      >
        <ReactPlanner taskHeight={40} taskPadding={4} axisHeight={48}>
          <Brush />
          <Axis />
          <Background />
          <Tasks />
        </ReactPlanner>
        <Inspector />
      </div>
    </div>
  );
}
