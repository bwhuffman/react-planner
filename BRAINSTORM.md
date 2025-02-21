# React Planner

## Roadmap

## Components & Layers

### ReactPlanner

Organizes all elements for planner, handles rendering, initial state, provider, and defaults

- width `(number)`
- height `(number)`
- taskHeight `(number)`
- taskPadding `(number)`
- axisHeight `(number)`
- axisTickCount `(number)`
- axisSubTickCount `(number)`
- axisTickSize `(number)`
- axisSubTickSize `(number)`
- brushHeight `(number)`
- brushColor `(number)`

### Background

Add gridlines behind tasks based on tick and subtick settings

-

- Brush (time range selection)
  - Allows user to select a time range
  - Allows user to pan across timeline
  - Allows user to zoom in and out
- Axis (time units)
  - Displays time units (e.g. day, week, month)
  - Helps users navigate project timeline
- Tasks (tasks plotted)
  - Displays tasks
  - Allows user to select tasks
- Channels (task grouping)

  - Displays task groups
  - Allows user to select task groups

- Tasks
- Header
- Footer
- Zoom controls
- Playback controls
- Inspector
- Context menu
- Drag handle
- Selection box

# Components

## Core

### Chart

- Organizes all elements
- Handles rendering timeline, tasks, grid

### Grid

- provides strucutred background aligning with time units
- Help users visually align tasks with respective timeframes

### Header

- Displays time units (e.g. day, week, month)
- Helps users navigate project timeline

### Task

- Represents individual task as a bar spanning start to end.

### DependencyLine

- TBD

### Marker

- Creates vertical marker (e.g. at today's date)
- Helps quickly identify important dates

### Tooltip

- hover information for tasks

### Context Menu

- Right click options on tasks

### Drag Handle

- Resize tasks in-line on canvas

### Selection Box

- Allow user to select multiple tasks for bulk actions

## Interactive

## Interaction props (reference: reactflow)

- tasksDraggable
- tasksConnectable (dependencies)
- tasksResizable
- tasksSelectable
- zoomOnScroll
- panOnScroll
- panOnScrollMode
- zoomOnDoubleClick
- panOnDrag
- onPaneClick
- onPaneScroll

### Scrollbar

- Smooth horizontal scroll through large timelines

### Zoom controls

- zoom in
- zoom out
- fit to view (e.g. task, all tasks)

### Playback Controls

- start
- stop
- pause
- step-forward
- step-backward
- fast-forward
- fast-backward
- playback speed

### Calculations

- overlapping (e.g. task 1 end is after task 2 start in same channel)
-

### Undo/redo controls

- Undo or redo modifications

## Actions

- Import (e.g. JSON, CSV)
- Export (e.g. JSON, image)
