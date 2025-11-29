import { create } from 'zustand';

export const useOSStore = create((set, get) => ({
  activeWindowId: null,
  windows: [],
  windowOrder: [], // Array of window IDs for z-index management (Task 5)
  zIndexCounter: 100, // Starting z-index
  isDarkMode: false, // Dark mode state (Task 4)

  // Dark mode toggle
  toggleDarkMode: () => {
    set((state) => ({ isDarkMode: !state.isDarkMode }));
  },

  // Actions
  openApp: (appId) => {
    const { windows, windowOrder } = get();
    
    // Check if window is already open
    const existingWindow = windows.find((w) => w.appId === appId);
    
    if (existingWindow) {
      // If minimized, restore it. If just background, bring to front.
      // Move window to end of windowOrder (top of stack)
      const newOrder = windowOrder.filter(id => id !== existingWindow.id);
      newOrder.push(existingWindow.id);
      
      set({
        activeWindowId: existingWindow.id,
        windowOrder: newOrder,
        windows: windows.map((w) =>
          w.id === existingWindow.id
            ? { ...w, isMinimized: false }
            : w
        ),
      });
    } else {
      // Open new window
      const newWindow = {
        id: Date.now().toString(),
        appId,
        title: appId, // Will be enriched by the UI layer
        isMinimized: false,
        isMaximized: false,
        position: { x: 100 + (windows.length * 20), y: 50 + (windows.length * 20) }, // Cascade effect
        size: { width: 600, height: 400 },
      };

      set({
        activeWindowId: newWindow.id,
        windowOrder: [...windowOrder, newWindow.id], // Add to end (top of stack)
        windows: [...windows, newWindow],
      });
    }
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      windowOrder: state.windowOrder.filter((wId) => wId !== id), // Remove from order
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      activeWindowId: null, // Deselect when minimizing
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    }));
  },

  maximizeWindow: (id) => {
     set((state) => {
      // Move window to end of windowOrder (top of stack)
      const newOrder = state.windowOrder.filter(wId => wId !== id);
      newOrder.push(id);
      
      return {
        activeWindowId: id,
        windowOrder: newOrder,
        windows: state.windows.map((w) =>
          w.id === id
            ? { ...w, isMaximized: !w.isMaximized }
            : w
        ),
      };
    });
  },

  focusWindow: (id) => {
    set((state) => {
      // Move window to end of windowOrder (top of stack)
      const newOrder = state.windowOrder.filter(wId => wId !== id);
      newOrder.push(id);
      
      return {
        activeWindowId: id,
        windowOrder: newOrder,
        windows: state.windows.map((w) =>
          w.id === id ? { ...w, isMinimized: false } : w
        ),
      };
    });
  },

  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    }));
  },
  
  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    }));
  },
}));
