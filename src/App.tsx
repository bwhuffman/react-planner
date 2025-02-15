import { PlannerProvider } from "./hooks/usePlanner";
import "./App.css";

function App() {
  return (
    <>
      <h1>React Gantt Chart</h1>
      <PlannerProvider>
        <div className="header">
          {/* <GanttZoomControls />
          <GanttExport />
          <GanttImport /> */}
        </div>
        <div className="gantt-container">
          {/* <GanttTaskList />
          <GanttChart /> */}
        </div>
      </PlannerProvider>
    </>
  );
}

export default App;
