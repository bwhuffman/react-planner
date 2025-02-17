import { create } from "zustand";
import { Task } from "../types";

interface TaskStore {
  // state
  tasks: Task[];
  selectedTasks: Task[];

  // getters
  getTask: (id: string) => Task | undefined;
  getTasks: () => Task[];

  // setters
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
