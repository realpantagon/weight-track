# Components

This folder contains all reusable UI components for the Weight Tracking application.

## Component Structure

### Core Components
- **`AddButton.tsx`** - Reusable button for adding new weight entries
- **`AddWeightModal.tsx`** - Modal form for adding new weight entries
- **`Header.tsx`** - Application header with title and entry count
- **`WeightChart.tsx`** - Interactive weight progress chart with smart data sampling
- **`WeightEntriesList.tsx`** - Paginated list of weight entries with navigation
- **`WeightScrollPicker.tsx`** - Custom scroll picker for weight selection
- **`WeightStatsComponent.tsx`** - Statistics display (total change, average, min/max)

### Component Index
- **`index.ts`** - Centralized exports for easy imports

## Usage

```tsx
import { 
  AddButton,
  AddWeightModal, 
  Header,
  WeightChart, 
  WeightEntriesList, 
  WeightStatsComponent 
} from "./Components";
```

## Features

### WeightChart
- Intelligent data sampling for large datasets (max 30 points)
- Conditional label display to prevent overcrowding
- Responsive design with hover tooltips
- Progress indicators and change tracking

### WeightEntriesList
- Pagination (10 entries per page)
- Smart pagination controls with ellipsis
- Latest entry highlighting
- Exercise indicators and notes display

### AddWeightModal
- TypeScript form validation
- Exercise tracking toggle
- Date/time picker
- Weight selection with dropdowns
- Loading states

## TypeScript Support
All components are fully typed with proper interfaces and type safety.
