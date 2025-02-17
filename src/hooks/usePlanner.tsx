import { createContext, useContext, ReactNode } from "react";

interface PlannerContextType {
  width: number;
  height: number;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

interface PlannerProviderProps {
  children: ReactNode;
}

export function PlannerProvider({ children }: PlannerProviderProps) {
  const width = 960;
  const height = 48;

  const value = {
    width,
    height,
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
