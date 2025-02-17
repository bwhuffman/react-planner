import { useTaskStore } from "../store/store";

export const useTasks = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const addTasks = useTaskStore((state) => state.addTasks);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTasks = useTaskStore((state) => state.deleteTasks);
  const selectedTasks = useTaskStore((state) => state.selectedTasks);
  const setSelectedTasks = useTaskStore((state) => state.setSelectedTasks);
  const getTask = useTaskStore((state) => state.getTask);
  const getTasks = useTaskStore((state) => state.getTasks);
  const setTasks = useTaskStore((state) => state.setTasks);

  return {
    tasks,
    getTask,
    getTasks,
    setTasks,
    addTasks,
    updateTask,
    deleteTasks,
    selectedTasks,
    setSelectedTasks,
  };
};
