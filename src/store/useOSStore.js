import { create } from 'zustand';

export const useOSStore = create((set, get) => ({
  activeWindowId: null,
  windows: [],
  isDarkMode: false,

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  openApp: (appId) => {
    const { windows } = get();
    const existingWindow = windows.find((w) => w.appId === appId);
    
    if (existingWindow) {
      get().focusWindow(existingWindow.id);
      return;
    }

    const newWindow = {
      id: Date.now().toString(),
      appId,
      title: appId, 
      zIndex: 100 + windows.length, 
      isMinimized: false,
      isMaximized: false,
      position: { x: 100 + (windows.length * 20), y: 50 + (windows.length * 20) },
      size: { width: 600, height: 400 },
    };

    const newWindows = [...windows, newWindow];
    
    set({
      activeWindowId: newWindow.id,
      windows: newWindows.map((w, i) => ({ ...w, zIndex: 100 + i })),
    });
  },

  closeWindow: (id) => {
    set((state) => {
        const remaining = state.windows.filter((w) => w.id !== id);
        return {
            windows: remaining, 
            activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
        };
    });
  },

  minimizeWindow: (id) => {
    set((state) => ({
      activeWindowId: null,
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    }));
  },

  maximizeWindow: (id) => {
    const { windows } = get();
    const windowToMax = windows.find(w => w.id === id);
    if (!windowToMax) return;
    
    const otherWindows = windows.filter(w => w.id !== id);
    const newOrder = [...otherWindows, windowToMax];
    
    set({
        activeWindowId: id,
        windows: newOrder.map((w, i) => ({ 
            ...w, 
            zIndex: 100 + i, 
            isMaximized: w.id === id ? !w.isMaximized : w.isMaximized 
        }))
    });
  },

  focusWindow: (id) => {
    const { windows } = get();
    const windowToFocus = windows.find(w => w.id === id);
    if (!windowToFocus) return;

    const otherWindows = windows.filter(w => w.id !== id);
    const newOrder = [...otherWindows, windowToFocus];

    set({
      activeWindowId: id,
      windows: newOrder.map((w, i) => ({ 
        ...w, 
        zIndex: 100 + i, 
        isMinimized: false 
      })),
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