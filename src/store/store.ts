import { create } from "zustand";
import { Task } from "../types";
import { ScaleTime } from "d3-scale";
import { scaleUtc } from "d3-scale";

interface TaskStore {
  tasks: Task[];
  selectedTasks: Task[];
  getTask: (id: string) => Task | undefined;
  getTasks: () => Task[];
  setSelectedTasks: (tasks: Task[]) => void;
  addTasks: (newTasks: Task[]) => void;
  updateTask: (id: string, updatedTask: Task) => void;
  deleteTasks: (ids: string[]) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  // tasks
  tasks: [],

  // selected tasks
  selectedTasks: [],

  // set selected tasks
  setSelectedTasks: (tasks: Task[]) => set({ selectedTasks: tasks }),

  // get task
  getTask: (id: string) => get().tasks.find((task) => task.id === id),

  // get tasks
  getTasks: () => get().tasks,

  // set tasks
  setTasks: (tasks: Task[]) => set({ tasks }),

  // add tasks
  addTasks: (newTasks: Task[]) =>
    set((state) => ({
      tasks: [...state.tasks, ...newTasks],
    })),

  // update task
  updateTask: (id: string, updatedTask: Task) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
    })),

  // delete tasks
  deleteTasks: (ids: string[]) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => !ids.includes(task.id)),
    })),
}));

interface PlannerStore {
  width: number;
  height: number;
  taskHeight: number;
  taskPadding: number;
  axisHeight: number;
  axisTickCount: number;
  axisSubTickCount: number;
  axisTickSize: number;
  axisSubTickSize: number;
}

export const usePlannerStore = create<PlannerStore>((set) => ({
  width: 960,
  height: 960,
  setWidth: (width: number) => set({ width }),
  setHeight: (height: number) => set({ height }),
  // axis
  axisHeight: 48,
  axisTickCount: 8,
  axisSubTickCount: 4,
  axisTickSize: 6,
  axisSubTickSize: 3,
  // task
  taskHeight: 20,
  taskPadding: 4,
}));

interface ScaleStore {
  scale: ScaleTime<number, number>;
  startDate: Date;
  endDate: Date;
  viewStartDate: Date; // Current view window
  viewEndDate: Date; // Current view window
  setViewRange: (start: Date, end: Date) => void;
  zoomToFit: () => void;
}

export const useScaleStore = create<ScaleStore>((set, get) => ({
  // Full date range
  startDate: new Date(Date.UTC(2025, 2, 2, 0, 0, 0)),
  endDate: new Date(Date.UTC(2025, 2, 3, 0, 0, 0)),

  // Initial view is full range
  viewStartDate: new Date(Date.UTC(2025, 2, 2, 0, 0, 0)),
  viewEndDate: new Date(Date.UTC(2025, 2, 3, 0, 0, 0)),

  // scale
  scale: scaleUtc()
    .domain([
      new Date(Date.UTC(2025, 2, 2, 0, 0, 0)),
      new Date(Date.UTC(2025, 2, 3, 0, 0, 0)),
    ])
    .range([0, 960]),

  // set view range
  setViewRange: (viewStartDate: Date, viewEndDate: Date) => {
    const width = usePlannerStore.getState().width;
    set(() => ({
      viewStartDate,
      viewEndDate,
      scale: scaleUtc().domain([viewStartDate, viewEndDate]).range([0, width]),
    }));
  },

  // zoom to fit
  zoomToFit: () => {
    const { startDate, endDate } = get();
    get().setViewRange(startDate, endDate);
  },
}));
