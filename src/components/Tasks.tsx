import { useEffect, useRef } from "react";
import { select } from "d3-selection";

// types
import { usePlannerStore, useScaleStore, useTaskStore } from "../store/store";
import { Task as TaskType } from "../types";

// CONFIGURATIONS
const TASK_HEIGHT = 20;
const TASK_PADDING = 4; // Added padding between tasks

export function Tasks() {
  const tasksRef = useRef(null);
  const tasks = useTaskStore((state) => state.tasks);
  const selectedTasks = useTaskStore((state) => state.selectedTasks);
  const setSelectedTasks = useTaskStore((state) => state.setSelectedTasks);
  const scale = useScaleStore((state) => state.scale);
  const width = usePlannerStore((state) => state.width);

  // Group tasks by channelId
  const groupedTasks: { [key: string]: TaskType[] } = tasks.reduce(
    (acc, task) => {
      if (!acc[task.channelId]) {
        acc[task.channelId] = [];
      }
      acc[task.channelId].push(task);
      return acc;
    },
    {} as { [key: string]: TaskType[] }
  );

  const channelCount = Object.keys(groupedTasks).length;

  console.log("grouped tasks", groupedTasks);

  useEffect(() => {
    if (!tasksRef.current) return;

    const tasksSvg = select(tasksRef.current);
    tasksSvg.selectAll("*").remove();

    // get channel IDs
    const channelIds = Object.keys(groupedTasks);

    // create channel groups
    const taskGroups = tasksSvg
      .selectAll("g")
      .data(channelIds)
      .enter()
      .append("g")
      .attr("class", (d) => `channel-${d}`)
      .attr(
        "transform",
        (_, channelIndex) =>
          `translate(0, ${channelIndex * (TASK_HEIGHT + TASK_PADDING)})`
      );

    // Create rectangles and text for each task in the grouped tasks
    channelIds.forEach((channelId, channelIndex) => {
      const tasksInChannel = groupedTasks[channelId];

      tasksInChannel.forEach((task, taskIndex) => {
        const taskGroup = tasksSvg
          .select(`.channel-${channelId}`) // Select the specific channel group
          .append("g") // append task to channel
          .attr("class", (d) => `task-${d}`)
          .attr("transform", `translate(${scale(new Date(task.start))}, 0)`); //translate(${scale(new Date(task.start))}, ${i * (TASK_HEIGHT + TASK_PADDING)})`

        taskGroup
          .append("rect")
          .attr(
            "width",
            scale(new Date(task.end)) - scale(new Date(task.start))
          )
          // .attr(
          //   "transform",
          //   `translate(${scale(new Date(task.start))}, ${
          //     TASK_HEIGHT + TASK_PADDING
          //   })`
          // )
          .attr("height", TASK_HEIGHT)
          .attr("fill", task.color || "black")
          .attr("opacity", 0.5)
          .attr(
            "stroke",
            selectedTasks.find((t) => t.id === task.id) ? "blue" : "none"
          )
          .attr("stroke-width", 2)
          .on("click", (event, d) => {
            event.preventDefault();
            console.log(d);
            setSelectedTasks([task]);
          });

        taskGroup
          .append("text")
          .attr("x", 5) // Align text to the start of the task
          .attr("y", TASK_HEIGHT / 2 + 5) // Center the text vertically in the rectangle
          .text(task.label)
          .attr("fill", "white")
          .attr("style", "pointer-events: none"); // Optional: set text color
      });
    });
  }, [width, tasks, selectedTasks, scale]);

  return (
    <svg
      ref={tasksRef}
      width={width}
      height={channelCount * (TASK_HEIGHT + TASK_PADDING)}
    />
  );
}
