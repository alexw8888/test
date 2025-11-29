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
    1. **Window Dragging:** Users are currently unable to drag application windows. Investigate and fix drag functionality.
    2. **Calculator Display:** The Calculator app (`Calculator.jsx`) display screen.cannot be seen. Find out why and fix it. 
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

### Task 6: Virtual File System for Terminal
**Goal:** Make the Terminal operate on a real in-memory filesystem.
- **Instruction:** Add a virtual filesystem layer and wire `cd`, `ls`, `pwd`, `mkdir`, `touch`, and `cat` commands in `Terminal` to read/write that state instead of returning placeholders. Persist the FS state in a store (e.g., `useOSStore.js`) so sessions share the same structure.
- **Success Criteria:** Terminal commands mutate and reflect the virtual filesystem accurately (directories change with `cd`, `ls` shows actual contents, files can be created/read), and state survives across multiple Terminal windows.

### Task 7: File Explorer Integration
**Goal:** Make File Explorer browse the same virtual filesystem as the Terminal.
- **Instruction:** Update the File Explorer to render folders/files from the shared virtual filesystem store. Support opening folders, creating/deleting files or folders, and keep Terminal and File Explorer views in sync when either changes the filesystem.
- **Success Criteria:** Navigating folders shows the live virtual filesystem, create/delete actions update both apps immediately, and no mocked/static file lists remain in File Explorer.

### Task 8: Calendar App
**Goal:** Add a Calendar app that manages user events.
- **Instruction:** Create `Calendar.jsx` (or similar) in `src/apps/`, register it in `appRegistry`, and add UI to view days/weeks and add events with title, date, and time. Store events in the global store so reopening the Calendar shows existing events.
- **Success Criteria:** A Calendar icon appears in the dock; opening it shows a calendar view; users can add events that persist while the desktop session is active; events render on their dates.
