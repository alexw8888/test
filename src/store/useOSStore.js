import { create } from 'zustand';

export const useOSStore = create((set, get) => ({
  activeWindowId: null,
  windows: [],
  zIndexCounter: 100, // Starting z-index
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  // Actions
  openApp: (appId) => {
    const { windows, zIndexCounter } = get();
    
    // Check if window is already open
    const existingWindow = windows.find((w) => w.appId === appId);
    
    if (existingWindow) {
      // If minimized, restore it. If just background, bring to front.
      set({
        activeWindowId: existingWindow.id,
        zIndexCounter: zIndexCounter + 1,
        windows: windows.map((w) => 
          w.id === existingWindow.id 
            ? { ...w, isMinimized: false, zIndex: zIndexCounter + 1 }
            : w
        ),
      });
      // Reorder windows so the focused one is last
      get().focusWindow(existingWindow.id);
    } else {
      // Open new window
      const newWindow = {
        id: Date.now().toString(),
        appId,
        title: appId, // Will be enriched by the UI layer
        zIndex: zIndexCounter + 1,
        isMinimized: false,
        isMaximized: false,
        position: { x: 100 + (windows.length * 20), y: 50 + (windows.length * 20) }, // Cascade effect
        size: { width: 600, height: 400 },
      };

      set({
        activeWindowId: newWindow.id,
        zIndexCounter: zIndexCounter + 1,
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
     set((state) => ({
      activeWindowId: id,
      zIndexCounter: state.zIndexCounter + 1,
      windows: state.windows.map((w) =>
        w.id === id 
          ? { ...w, isMaximized: !w.isMaximized, zIndex: state.zIndexCounter + 1 } 
          : w
      ),
    }));
  },

  focusWindow: (id) => {
    set((state) => {
      const windows = state.windows.filter((w) => w.id !== id);
      const focusedWindow = state.windows.find((w) => w.id === id);
      const reordered = windows.concat(focusedWindow || []);
      // Reassign zIndex based on order to keep them consistent and avoid runaway zIndexCounter
      const base = 100;
      const updated = reordered.map((w, idx) => ({ ...w, zIndex: base + idx }));
      return {
        activeWindowId: id,
        windows: updated,
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
