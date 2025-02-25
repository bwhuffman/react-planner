# React Planner (v1)

## TODO

- [x] Display regions
- [x] Group regions into channels
- [x] Display time axis
- [x] Display ticks & subticks
- [x] Control zoom
- [x] Control pan
- [x] Brush time ranges
- [x] Time formatting
- [ ] Dynamic width/height (responsive)

## Components & Layers

```tsx title="ReactPlanner"
<ReactPlanner>
  <Brush />
  <Axis />
  <Regions />
  <Background />
</ReactPlanner>
```

Future?

```tsx title="ReactPlanner"
<ReactPlannerProvider regions={regions} channels={channels}>
  <Brush />
  <Axis />
  <Plan>
    <Channel>
      <Region start={new Date()} end={new Date()} />
      <Region start={new Date()} end={new Date()} />
      <Region start={new Date()} end={new Date()} />
    </Channel>
    <Channel>
      <Region start={new Date()} end={new Date()} />
      <Region start={new Date()} end={new Date()} />
      <Region start={new Date()} end={new Date()} />
    </Channel>
  </Plan>
  <Background />
</ReactPlannerProvider>
```

### ReactPlanner

Organizes all elements for planner, handles rendering, initial state, provider, and defaults.

**Props**

| Property         | Type     | Description                                         |
| ---------------- | -------- | --------------------------------------------------- |
| width            | `number` | The width of the planner component.                 |
| height           | `number` | The height of the planner component.                |
| regionHeight     | `number` | The height of each region displayed in the planner. |
| regionPadding    | `number` | The padding between regions in the planner.         |
| axisHeight       | `number` | The height of the axis used for time units.         |
| axisTickCount    | `number` | The number of major ticks on the axis.              |
| axisSubTickCount | `number` | The number of minor ticks between major ticks.      |
| axisTickSize     | `number` | The size of the major ticks on the axis.            |
| axisSubTickSize  | `number` | The size of the minor ticks on the axis.            |
| brushHeight      | `number` | The height of the brush used for zooming/panning.   |
| brushColor       | `string` | The color of the brush used in the planner.         |

### Background

Adds gridlines behind regions based on tick and subtick settings. Provides a structured background to help users visually align regions with time units.

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

## Stores

### usePlannerStore

| Property         | Type                       | Description                                         |
| ---------------- | -------------------------- | --------------------------------------------------- |
| width            | `number`                   | The width of the planner component.                 |
| height           | `number`                   | The height of the planner component.                |
| setWidth         | `(width: number) => void`  | Function to update the width of the planner.        |
| setHeight        | `(height: number) => void` | Function to update the height of the planner.       |
| axisHeight       | `number`                   | The height of the axis used for time units.         |
| axisTickCount    | `number`                   | The number of major ticks on the axis.              |
| axisSubTickCount | `number`                   | The number of minor ticks between major ticks.      |
| axisTickSize     | `number`                   | The size of the major ticks on the axis.            |
| axisSubTickSize  | `number`                   | The size of the minor ticks on the axis.            |
| regionHeight     | `number`                   | The height of each region displayed in the planner. |
| regionPadding    | `number`                   | The padding between regions in the planner.         |
| brushHeight      | `number`                   | The height of the brush used for zooming/panning.   |
| brushColor       | `string`                   | The color of the brush used in the planner.         |

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

### useRegionStore

| Property           | Type                                          | Description                           |
| ------------------ | --------------------------------------------- | ------------------------------------- |
| regions            | `Region[]`                                    | The regions in the planner.           |
| selectedRegions    | `Region[]`                                    | The selected regions in the planner.  |
| getRegion          | `(id: string) => Region \| undefined`         | Function to get a region by id.       |
| getRegions         | `() => Region[]`                              | Function to get all regions.          |
| setSelectedRegions | `(regions: Region[]) => void`                 | Function to set the selected regions. |
| addRegions         | `(newRegions: Region[]) => void`              | Function to add new regions.          |
| updateRegion       | `(id: string, updatedRegion: Region) => void` | Function to update a region.          |
| deleteRegions      | `(ids: string[]) => void`                     | Function to delete regions.           |
| setRegions         | `(regions: Region[]) => void`                 | Function to set the regions.          |

## Hooks (TBD)

- `usePlanner`
- `useScale`
- `useChannel`
- `useRegion`

## Version 2

Interace Elements

- [ ] Region dragging
- [ ] Region resizing
- [ ] Channel groups
- [ ] Custom region components
- [ ] Dependency lines
- [ ] Minimap brush
- [ ] Markers (time markers)
- [ ] Grid snapping (and/or markers)
- [ ] Subtick labels
- [ ] Solid/dashed lines for background component

Channel controls

- [ ] Hide regions by channel
- [ ] Select regions by channel
- [ ] Disable select regions by channel
- [ ] Only show regions in channel

Canvas interactions

- [ ] Multi-select regions
- [ ] zoom on scroll
- [ ] pan on scroll
- [ ] zoom on double click
- [ ] pan on drag
- [ ] on pane click
- [ ] on pane scroll
- [ ] regions draggable
- [ ] regions resizable
- [ ] regions selectable
- [ ] regions connectable (dependencies)

Context Menus

- [ ] Canvas context menu
- [ ] Region context menu
- [ ] Dependency context menu

Hooks (extension)

- [ ] Undo/redo

Methods

- [ ] Detect region overlaps (same channel)
- [ ] Detect region dependencies (one region ends before another starts)

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

```javascript
// SUBTICK LABELS FOR LATER
const subTickValues = calculateSubTicks(tickValues);

const subTicks = g
  .selectAll<SVGGElement, { x: number; subtickIndex: number }>(".subtick")
  .data(subTickValues);

// Create new subtick groups
const subTickGroups = subTicks
  .enter()
  .append("g")
  .attr("class", "subtick")
  .merge(subTicks)
  .attr("transform", (d) => `translate(${d.x}, 0)`);

// Select and update subtick ines within groups
const subtickLines = subTickGroups
  .selectAll<SVGLineElement, { x: number; subtickIndex: number }>("line")
  .data((d) => [d]); // Bind single data point to ensure one line per group

subtickLines
  .enter()
  .append("line")
  .merge(subtickLines)
  .attr("y2", -axisSubTickSize)
  .attr("stroke", "currentColor")
  .attr("stroke-opacity", 0.5);

// Select and update subtick text within groups
const subtickLabels = subTickGroups
  .selectAll<SVGTextElement, { x: number; subtickIndex: number }>("text")
  .data((d) => [d]); // Bind single data point to ensure one text per group

subtickLabels
  .enter()
  .append("text")
  .merge(subtickLabels)
  .attr("y", -axisSubTickSize)
  .attr("text-anchor", "middle")
  .attr("fill", "currentColor")
  .text((d) => d.subtickIndex);

subtickLines.exit().remove(); // Remove old lines
subtickLabels.exit().remove(); // Remove old texts
subTickGroups.exit().remove(); // Remove old subticks
```
