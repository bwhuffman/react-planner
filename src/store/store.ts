import { create } from "zustand";
import { Task } from "../types";
import { ScaleTime } from "d3-scale";
import { scaleUtc } from "d3-scale";
import { isoFormat } from "d3-time-format";

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
  tasks: [],
  selectedTasks: [],
  setSelectedTasks: (tasks: Task[]) => set({ selectedTasks: tasks }),
  getTask: (id: string) => get().tasks.find((task) => task.id === id),
  getTasks: () => get().tasks,
  setTasks: (tasks: Task[]) => set({ tasks }),
  addTasks: (newTasks: Task[]) =>
    set((state) => ({
      tasks: [...state.tasks, ...newTasks],
    })),
  updateTask: (id: string, updatedTask: Task) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
    })),
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
  axisTickPadding: number;
  timeFormat: (d: Date) => string;
  setTimeFormat: (timeFormat: (d: Date) => string) => void;
}

export const usePlannerStore = create<PlannerStore>((set) => ({
  width: 960,
  height: 960,
  setWidth: (width: number) => set({ width }),
  setHeight: (height: number) => set({ height }),
  axisHeight: 48,
  axisTickCount: 8,
  axisSubTickCount: 4,
  axisTickSize: 8,
  axisSubTickSize: 3,
  axisTickPadding: 8,
  taskHeight: 20,
  taskPadding: 4,
  brushHeight: 40,
  brushColor: "#f0f0f0",
  timeFormat: isoFormat,
  setTimeFormat: (timeFormat: (d: Date) => string) => set({ timeFormat }),
}));

interface ScaleStore {
  extentStartDate: Date; // Full date range start date
  extentEndDate: Date; // Full date range end date
  setExtentRange: (start: Date, end: Date) => void;
  getExtentScale: () => ScaleTime<number, number>;
  viewStartDate: Date; // Current view window start date
  viewEndDate: Date; // Current view window end date
  setViewRange: (start: Date, end: Date) => void;
  getViewScale: () => ScaleTime<number, number>;
  zoomToExtent: () => void;
  zoomToFit: () => void;
  zoomOut: () => void;
  zoomIn: () => void;
  zoomTo: (start: Date, end: Date) => void;
  panLeft: (step: number) => void;
  panRight: (step: number) => void;
}

export const useScaleStore = create<ScaleStore>((set, get) => ({
  // Full date range
  extentStartDate: new Date(Date.UTC(2025, 2, 2, 0, 0, 0)),
  extentEndDate: new Date(Date.UTC(2025, 2, 3, 0, 0, 0)),
  setExtentRange: (start: Date, end: Date) => {
    set(() => ({
      extentStartDate: start,
      extentEndDate: end,
    }));
  },
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
  setViewRange: (start: Date, end: Date) => {
    set(() => ({
      viewStartDate: start,
      viewEndDate: end,
    }));
  },
  getViewScale: () => {
    const width = usePlannerStore.getState().width;
    // const tickCount = usePlannerStore.getState().axisTickCount;
    return scaleUtc()
      .domain([get().viewStartDate, get().viewEndDate])
      .range([0, width]);
    //.nice(tickCount); // remove for smoother zooming
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
    const extentStartTime = extentStartDate.getTime();
    const extentEndTime = extentEndDate.getTime();

    const newStartDate = new Date((viewStartTime + extentStartTime) / 2);
    const newEndDate = new Date((viewEndTime + extentEndTime) / 2);
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
  zoomTo: (start: Date, end: Date) => {
    get().setViewRange(start, end);
  },
  /**
   * Pan left
   * @param step milliseconds
   */
  panLeft: (step: number) => {
    const { viewStartDate, viewEndDate, extentStartDate } = get();
    const viewStartTime = viewStartDate.getTime();
    const viewEndTime = viewEndDate.getTime();
    const extentStartTime = extentStartDate.getTime();

    // don't pan left outside the extent
    if (extentStartTime > viewStartTime - step) {
      const newStartDate = new Date(extentStartTime);
      const newEndDate = new Date(
        extentStartTime + (viewEndTime - viewStartTime)
      );
      get().setViewRange(newStartDate, newEndDate);
      return;
    }

    const newStartDate = new Date(viewStartTime - step);
    const newEndDate = new Date(viewEndTime - step);
    get().setViewRange(newStartDate, newEndDate);
  },
  /**
   * Pan left
   * @param step milliseconds
   */
  panRight: (step: number) => {
    const { viewStartDate, viewEndDate, extentEndDate } = get();
    const viewStartTime = viewStartDate.getTime();
    const viewEndTime = viewEndDate.getTime();
    const extentEndTime = extentEndDate.getTime();

    // don't pan right outside the extent
    if (extentEndTime < viewEndTime + step) {
      const newEndDate = new Date(extentEndTime);
      const newStartDate = new Date(
        extentEndTime - (viewEndTime - viewStartTime)
      );
      get().setViewRange(newStartDate, newEndDate);
      return;
    }

    const newStartDate = new Date(viewStartTime + step);
    const newEndDate = new Date(viewEndTime + step);
    get().setViewRange(newStartDate, newEndDate);
  },
}));
