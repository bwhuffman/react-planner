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
  brushHeight: number;
  brushColor: string;
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
  axisHeight: 48,
  axisTickCount: 8,
  axisSubTickCount: 4,
  axisTickSize: 6,
  axisSubTickSize: 3,
  taskHeight: 20,
  taskPadding: 4,
  brushHeight: 40,
  brushColor: "#f0f0f0",
}));

interface ScaleStore {
  extentStartDate: Date; // Full date range start date
  extentEndDate: Date; // Full date range end date
  getExtentScale: () => ScaleTime<number, number>;
  viewStartDate: Date; // Current view window start date
  viewEndDate: Date; // Current view window end date
  getViewScale: () => ScaleTime<number, number>;
  setViewRange: (start: Date, end: Date) => void;
  zoomToFit: () => void;
  zoomToExtent: () => void;
  zoomOut: () => void;
  zoomIn: () => void;
}

export const useScaleStore = create<ScaleStore>((set, get) => ({
  // Full date range
  extentStartDate: new Date(Date.UTC(2025, 2, 2, 0, 0, 0)),
  extentEndDate: new Date(Date.UTC(2025, 2, 3, 0, 0, 0)),
  getExtentScale: () => {
    const width = usePlannerStore.getState().width;
    // const tickCount = usePlannerStore.getState().axisTickCount;
    return scaleUtc()
      .domain([get().extentStartDate, get().extentEndDate])
      .range([0, width]);
    //.nice(tickCount); // remove for smoother zooming
  },

  // Initial view is full range
  viewStartDate: new Date(Date.UTC(2025, 2, 2, 0, 0, 0)),
  viewEndDate: new Date(Date.UTC(2025, 2, 3, 0, 0, 0)),

  getViewScale: () => {
    const width = usePlannerStore.getState().width;
    // const tickCount = usePlannerStore.getState().axisTickCount;
    return scaleUtc()
      .domain([get().viewStartDate, get().viewEndDate])
      .range([0, width]);
    //.nice(tickCount); // remove for smoother zooming
  },
  // set view range
  setViewRange: (viewStartDate: Date, viewEndDate: Date) => {
    set(() => ({
      viewStartDate: viewStartDate,
      viewEndDate: viewEndDate,
    }));
  },
  zoomToExtent: () => {
    const { extentStartDate, extentEndDate } = get();
    get().setViewRange(extentStartDate, extentEndDate);
  },
  zoomToFit: () => {
    const tasks = useTaskStore.getState().tasks;
    if (tasks.length === 0) return;

    const earliestStart = Math.min(
      ...tasks.map((task) => task.start.getTime())
    );
    const latestEnd = Math.max(...tasks.map((task) => task.end.getTime()));

    const newStartDate = new Date(earliestStart);
    const newEndDate = new Date(latestEnd);

    get().setViewRange(newStartDate, newEndDate);
  },
  zoomOut: () => {
    const { viewStartDate, viewEndDate, extentStartDate, extentEndDate } =
      get();
    const viewStartTime = viewStartDate.getTime();
    const viewEndTime = viewEndDate.getTime();
    const startTime = extentStartDate.getTime();
    const endTime = extentEndDate.getTime();

    const newStartDate = new Date((viewStartTime + startTime) / 2);
    const newEndDate = new Date((viewEndTime + endTime) / 2);
    get().setViewRange(newStartDate, newEndDate);
  },
  zoomIn: () => {
    const { viewStartDate, viewEndDate } = get();
    const startTime = viewStartDate.getTime();
    const endTime = viewEndDate.getTime();
    const midpointTime = (startTime + endTime) / 2;

    const newStartDate = new Date((midpointTime + startTime) / 2);
    const newEndDate = new Date((endTime + midpointTime) / 2);
    get().setViewRange(newStartDate, newEndDate);
  },
}));
