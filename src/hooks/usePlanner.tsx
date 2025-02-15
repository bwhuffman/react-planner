import { createContext, useContext, useState, ReactNode } from "react";

interface Task {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  dependencies?: string[];
}

interface PlannerContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  scale: "day" | "week" | "month";
  setScale: (scale: "day" | "week" | "month") => void;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

interface PlannerProviderProps {
  children: ReactNode;
}

export function PlannerProvider({ children }: PlannerProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [zoom, setZoom] = useState(1);
  const [scale, setScale] = useState<"day" | "week" | "month">("day");

  const value = {
    tasks,
    setTasks,
    zoom,
    setZoom,
    scale,
    setScale,
  };

  return (
    <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>
  );
}

export function usePlanner() {
  const context = useContext(PlannerContext);
  if (context === undefined) {
    throw new Error("usePlanner must be used within a PlannerProvider");
  }
  return context;
}
