import { create } from 'zustand';

export const useOSStore = create((set, get) => ({
  activeWindowId: null,
  windows: [],
  zIndexCounter: 1000, // Starting z-index (higher value for more room)
  isDarkMode: false, // Dark mode state

  // Get current maximum z-index from all windows
  getMaxZIndex: () => {
    const { windows } = get();
    return windows.length > 0 ? Math.max(...windows.map(w => w.zIndex)) : 1000;
  },

  // Bring window to front with proper z-index management
  bringToFront: (windowId) => {
    const { windows } = get();
    const maxZ = get().getMaxZIndex();
    const newZ = maxZ + 1;
    
    set({
      activeWindowId: windowId,
      zIndexCounter: newZ,
      windows: windows.map(w => 
        w.id === windowId 
          ? { ...w, zIndex: newZ, isMinimized: false }
          : w
      ),
    });
  },

  // Actions
  openApp: (appId) => {
    const { windows } = get();
    
    // Check if window is already open
    const existingWindow = windows.find((w) => w.appId === appId);
    
    if (existingWindow) {
      // If minimized, restore it. If just background, bring to front.
      get().bringToFront(existingWindow.id);
    } else {
      // Open new window with proper z-index
      const maxZ = get().getMaxZIndex();
      const newWindow = {
        id: Date.now().toString(),
        appId,
        title: appId, // Will be enriched by the UI layer
        zIndex: maxZ + 1,
        isMinimized: false,
        isMaximized: false,
        position: { x: 100 + (windows.length * 30), y: 50 + (windows.length * 30) }, // Cascade effect
        size: { width: 600, height: 400 },
      };

      set({
        activeWindowId: newWindow.id,
        zIndexCounter: newWindow.zIndex,
        windows: [...windows, newWindow],
      });
    }
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
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
       const maxZ = get().getMaxZIndex();
       const newZ = maxZ + 1;
       return {
        activeWindowId: id,
        zIndexCounter: newZ,
        windows: state.windows.map((w) =>
          w.id === id 
            ? { ...w, isMaximized: !w.isMaximized, zIndex: newZ } 
            : w
        ),
      };
    });
  },

  focusWindow: (id) => {
    get().bringToFront(id);
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

  // Dark mode actions
  toggleDarkMode: () => {
    set((state) => ({ isDarkMode: !state.isDarkMode }));
  },

  // Window ordering and z-index management
  reorderWindows: () => {
    set((state) => {
      const sortedWindows = [...state.windows].sort((a, b) => a.zIndex - b.zIndex);
      const baseZ = 1000;
      const reorderedWindows = sortedWindows.map((window, index) => ({
        ...window,
        zIndex: baseZ + index,
      }));
      
      return {
        windows: reorderedWindows,
        zIndexCounter: baseZ + reorderedWindows.length,
      };
    });
  },

  // Get windows sorted by z-index for proper rendering
  getWindowsSorted: () => {
    const { windows } = get();
    return [...windows].sort((a, b) => a.zIndex - b.zIndex);
  },
}));
