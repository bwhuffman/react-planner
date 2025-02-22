# React Planner (v1)

## TODO

- [x] Display tasks
- [x] Group tasks into channels
- [x] Display time axis
- [x] Display ticks & subticks
- [x] Control zoom
- [x] Control pan
- [x] Brush time ranges
- [ ] Dynamic width/height

## Components & Layers

```tsx title="ReactPlanner"
<ReactPlanner>
  <Brush />
  <Axis />
  <Tasks />
  <Background />
</ReactPlanner>
```

### ReactPlanner

Organizes all elements for planner, handles rendering, initial state, provider, and defaults.

**Props**

| Property         | Type     | Description                                       |
| ---------------- | -------- | ------------------------------------------------- |
| width            | `number` | The width of the planner component.               |
| height           | `number` | The height of the planner component.              |
| taskHeight       | `number` | The height of each task displayed in the planner. |
| taskPadding      | `number` | The padding between tasks in the planner.         |
| axisHeight       | `number` | The height of the axis used for time units.       |
| axisTickCount    | `number` | The number of major ticks on the axis.            |
| axisSubTickCount | `number` | The number of minor ticks between major ticks.    |
| axisTickSize     | `number` | The size of the major ticks on the axis.          |
| axisSubTickSize  | `number` | The size of the minor ticks on the axis.          |
| brushHeight      | `number` | The height of the brush used for zooming/panning. |
| brushColor       | `string` | The color of the brush used in the planner.       |

### Background

Adds gridlines behind tasks based on tick and subtick settings. Provides a structured background to help users visually align tasks with time units.

**Props**

| Property | Type                                    | Description                     |
| -------- | --------------------------------------- | ------------------------------- |
| variant  | `'ticks'   \| 'subticks' \| 'channels'` | The variant type for gridlines. |
| color    | `(string)`                              | The color of the gridlines.     |

### Axis

View time units from time scale.

**Props**

| Property | Type                    | Description                     |
| -------- | ----------------------- | ------------------------------- |
| variant  | `'ticks' \| 'subticks'` | The variant type for gridlines. |
| color    | `(string)`              | The color of the gridlines.     |

### Brush

Interact with the time scale with a brush (zooming/panning).

## Hooks

### usePlannerStore

| Property         | Type                       | Description                                       |
| ---------------- | -------------------------- | ------------------------------------------------- |
| width            | `number`                   | The width of the planner component.               |
| height           | `number`                   | The height of the planner component.              |
| setWidth         | `(width: number) => void`  | Function to update the width of the planner.      |
| setHeight        | `(height: number) => void` | Function to update the height of the planner.     |
| axisHeight       | `number`                   | The height of the axis used for time units.       |
| axisTickCount    | `number`                   | The number of major ticks on the axis.            |
| axisSubTickCount | `number`                   | The number of minor ticks between major ticks.    |
| axisTickSize     | `number`                   | The size of the major ticks on the axis.          |
| axisSubTickSize  | `number`                   | The size of the minor ticks on the axis.          |
| taskHeight       | `number`                   | The height of each task displayed in the planner. |
| taskPadding      | `number`                   | The padding between tasks in the planner.         |
| brushHeight      | `number`                   | The height of the brush used for zooming/panning. |
| brushColor       | `string`                   | The color of the brush used in the planner.       |

### useScaleStore

| Property        | Type                               | Description                                          |
| --------------- | ---------------------------------- | ---------------------------------------------------- |
| extentStartDate | `Date`                             | The start date of the extent of the planner.         |
| extentEndDate   | `Date`                             | The end date of the extent of the planner.           |
| setExtentRange  | `(start: Date, end: Date) => void` | Function to update the extent of the planner.        |
| getExtentScale  | `() => ScaleTime<number, number>`  | The scale of the extent of the planner.              |
| viewStartDate   | `Date`                             | The start date of the view of the planner.           |
| viewEndDate     | `Date`                             | The end date of the view of the planner.             |
| setViewRange    | `(start: Date, end: Date) => void` | Function to update the view of the planner.          |
| getViewScale    | `() => ScaleTime<number, number>`  | The scale of the view of the planner.                |
| zoomToExtent    | `() => void`                       | Function to zoom to the extent of the planner.       |
| zoomToFit       | `() => void`                       | Function to zoom to fit the view of the planner.     |
| zoomOut         | `() => void`                       | Function to zoom out of the view of the planner.     |
| zoomIn          | `() => void`                       | Function to zoom in on the view of the planner.      |
| zoomTo          | `(start: Date, end: Date) => void` | Function to zoom to a specific range of the planner. |
| panLeft         | `(step: number) => void`           | Function to pan left on the view of the planner.     |
| panRight        | `(step: number) => void`           | Function to pan right on the view of the planner.    |

### useTaskStore

| Property         | Type                                      | Description                         |
| ---------------- | ----------------------------------------- | ----------------------------------- |
| tasks            | `Task[]`                                  | The tasks in the planner.           |
| selectedTasks    | `Task[]`                                  | The selected tasks in the planner.  |
| getTask          | `(id: string) => Task \| undefined`       | Function to get a task by id.       |
| getTasks         | `() => Task[]`                            | Function to get all tasks.          |
| setSelectedTasks | `(tasks: Task[]) => void`                 | Function to set the selected tasks. |
| addTasks         | `(newTasks: Task[]) => void`              | Function to add new tasks.          |
| updateTask       | `(id: string, updatedTask: Task) => void` | Function to update a task.          |
| deleteTasks      | `(ids: string[]) => void`                 | Function to delete tasks.           |
| setTasks         | `(tasks: Task[]) => void`                 | Function to set the tasks.          |

### DependencyLine

- TBD

### Marker

- Creates vertical marker (e.g. at today's date)
- Helps quickly identify important dates

### Tooltip

- hover information for tasks

### Drag Handle

- Resize tasks in-line on canvas

### Selection Box

- Allow user to select multiple tasks for bulk actions

## Version 2

Interace Elements

- [ ] Task dragging
- [ ] Task resizing
- [ ] Channel groups
- [ ] Custom region components
- [ ] Dependency lines
- [ ] Minimap brush
- [ ] Markers (time markers)
- [ ] Grid snapping (and/or markers)

Canvas interactions

- [ ] Multi-select regions
- [ ] zoom on scroll
- [ ] pan on scroll
- [ ] zoom on double click
- [ ] pan on drag
- [ ] on pane click
- [ ] on pane scroll
- [ ] tasks draggable
- [ ] tasks resizable
- [ ] tasks selectable
- [ ] tasks connectable (dependencies)

Context Menus

- [ ] Canvas context menu
- [ ] Task context menu
- [ ] Dependency context menu

Hooks (extension)

- [ ] Undo/redo

Methods

- [ ] Detect task overlaps (same channel)
- [ ] Detect task dependencies (one task ends before another starts)

Animation (extension)

- [ ] Playback controls hook
  - [ ] start
  - [ ] stop
  - [ ] pause
  - [ ] restart
  - [ ] step-forward
  - [ ] step-backward
  - [ ] fast-forward
  - [ ] fast-backward
  - [ ] playback speed
- [ ] Repeat/loop hooks
  - [ ] repeat
