import { PlannerProvider } from "./hooks/usePlanner";
import Planner from "./components/Planner";
import "./App.css";

function App() {
  return (
    <PlannerProvider>
      <Planner />
    </PlannerProvider>
  );
}

export default App;
