import { createContext, useContext, ReactNode } from "react";
import { useTasks } from "./useTasks";

interface PlannerContextType {}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

interface PlannerProviderProps {
  children: ReactNode;
}

export function PlannerProvider({ children }: PlannerProviderProps) {
  const tasks = useTasks();

  const value = {
    ...tasks,
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
