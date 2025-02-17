import { useState, useEffect, useRef } from "react";
import { Task } from "./Task";

import { select } from "d3-selection";
import { ScaleTime } from "d3-scale";

// types
import { Task as TaskType } from "../types";

interface TasksProps {
  scale: ScaleTime<number, number>;
  tasks: TaskType[];
  width: number;
}

export function Tasks({ tasks, scale, width }: TasksProps) {
  const tasksRef = useRef(null);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const TASK_HEIGHT = 20;
  const TASK_PADDING = 4; // Added padding between tasks

  useEffect(() => {
    if (!tasksRef.current) return;

    const tasksSvg = select(tasksRef.current);
    tasksSvg.selectAll("*").remove();

    const taskGroups = tasksSvg
      .selectAll("g")
      .data(tasks)
      .enter()
      .append("g")
      .attr(
        "transform",
        (_, i) => `translate(0, ${i * (TASK_HEIGHT + TASK_PADDING)})`
      ) // Updated to use TASK_HEIGHT and TASK_PADDING
      .on("click", (event, d) => {
        event.preventDefault();
        console.log(d);
        setSelectedTask(d);
      });

    taskGroups
      .append("rect")
      .attr("x", (d) => scale(new Date(d.start)))
      .attr("width", (d) => scale(new Date(d.end)) - scale(new Date(d.start)))
      .attr("height", TASK_HEIGHT) // Updated to use TASK_HEIGHT
      .attr("fill", (d) => d.color || "black")
      .attr("stroke", (d) =>
        selectedTask && selectedTask.id === d.id ? "blue" : "none"
      ) // Set border color for selected task
      .attr("stroke-width", 2); // Optional: set stroke width

    taskGroups
      .append("text")
      .attr("x", (d) => scale(new Date(d.start)) + 5) // Align text to the start of the task
      .attr("y", TASK_HEIGHT / 2 + 5) // Center the text vertically in the rectangle
      .text((d) => d.label)
      .attr("fill", "white"); // Optional: set text color
  }, [width, tasks, selectedTask]); // Added selectedTask to dependencies

  return (
    <svg
      ref={tasksRef}
      width={width}
      height={tasks.length * (TASK_HEIGHT + TASK_PADDING)}
    />
  ); // Updated height calculation
}
