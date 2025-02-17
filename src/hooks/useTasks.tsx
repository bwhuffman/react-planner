import { useState } from "react";
import { Task } from "../types";

export const useTasks = (initialTasks: Task[] = []) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTasks = (newTasks: Task[]) => {
    setTasks([...tasks, ...newTasks]);
  };

  const updateTask = (id: string, updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  const deleteTasks = (ids: string[]) => {
    setTasks(tasks.filter((task) => !ids.includes(task.id)));
  };

  return { tasks, addTasks, updateTask, deleteTasks };
};
