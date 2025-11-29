# LLM Benchmark Suite for React Web OS

This document contains a series of tasks designed to test the capabilities of LLM agents in navigating, understanding, and modifying this React-based Web OS codebase.

## Overview
The project is a MacOS-like desktop environment running in the browser, built with React, Vite, and Tailwind CSS.

## Benchmark Tasks

### Task 1: Basic UI Customization
**Goal:** Modify the visual appearance of the Desktop.
- **Instruction:** Change the desktop background color to a deep blue gradient and increase the height of the TopBar by 4px.
- **Success Criteria:** The background style is updated in `index.css` or `Desktop.jsx`, and the TopBar height is visibly taller.

### Task 2: Critical Bug Fixes
**Goal:** Repair broken functionality in existing components.
- **Instruction:**
    1. **Window Dragging:** Users are currently unable to drag application windows. Investigate `WindowFrame.jsx` (and potentially `useOSStore.js`) to enable drag functionality.
    2. **Calculator Display:** The Calculator app (`Calculator.jsx`) is missing its display screen. Add a display area that shows the current input/result.
    3. **Safari URL Input:** The address bar in `Safari.jsx` is read-only or non-functional. Make the URL input editable so users can "navigate" (simulate navigation) to different URLs.
- **Success Criteria:** Windows can be moved around the desktop, the calculator shows numbers when buttons are clicked, and the Safari address bar accepts text input.

### Task 3: New App Creation (Simple)
**Goal:** Add a completely new application called "HelloApp".
- **Instruction:** 
    1. Create a `HelloApp.jsx` in `src/apps/` that displays "Hello World" in the center.
    2. Register it in `src/utils/appRegistry.jsx`.
    3. Ensure it appears in the Dock and opens a window when clicked.
- **Success Criteria:** A new icon appears in the dock, and clicking it opens a window rendering the new component.

### Task 4: State Management & Features (Medium)
**Goal:** Implement a "Dark Mode" toggle.
- **Instruction:** 
    1. Add a "Dark Mode" toggle switch to the `TopBar` or a new `Settings` app.
    2. Use `useOSStore.js` to manage the theme state.
    3. Apply dark mode styles to `WindowFrame` and `Notepad`.
- **Success Criteria:** Toggling the switch persists state in the store and updates the visual theme of the specified components.

### Task 5: System Architecture (Hard)
**Goal:** Refactor Window Z-Index Handling.
- **Instruction:** Currently, window focusing might be simple. Implement a robust z-index management system in `useOSStore.js` such that clicking any window brings it to the absolute front, handling an arbitrary number of open windows correctly.
- **Success Criteria:** `useOSStore.js` contains logic to reorder window IDs, and `Desktop.jsx` renders them with correct z-indexes.

---
*Use this file to prompt the LLM. For example: "Perform Task 2 from the LLM_BENCHMARK.md file."*