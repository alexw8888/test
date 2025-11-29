import { create } from 'zustand';
import { apps } from '../utils/appRegistry';

const BASE_Z_INDEX = 100;
const getStoredTheme = () => {
  if (typeof window === 'undefined') return 'light';
  return localStorage.getItem('os-theme') || 'light';
};

const applyZOrder = (windows) => (
  windows.map((windowItem, index) => ({
    ...windowItem,
    zIndex: BASE_Z_INDEX + index,
  }))
);

const moveWindowToFront = (windows, id) => {
  const target = windows.find((w) => w.id === id);
  if (!target) return applyZOrder(windows);

  const remaining = windows.filter((w) => w.id !== id);
  return applyZOrder([...remaining, target]);
};

export const useOSStore = create((set, get) => ({
  activeWindowId: null,
  windows: [],
  theme: getStoredTheme(),

  // Actions
  openApp: (appId) => {
    const { windows } = get();
    
    const existingWindow = windows.find((w) => w.appId === appId);
    
    if (existingWindow) {
      set((state) => ({
        activeWindowId: existingWindow.id,
        windows: moveWindowToFront(
          state.windows.map((w) =>
            w.id === existingWindow.id 
              ? { ...w, isMinimized: false }
              : w
          ),
          existingWindow.id
        ),
      }));
    } else {
      const defaultSize = apps[appId]?.defaultSize || { width: 600, height: 400 };
      const newWindow = {
        id: Date.now().toString(),
        appId,
        title: appId,
        isMinimized: false,
        isMaximized: false,
        position: { x: 100 + (windows.length * 20), y: 50 + (windows.length * 20) },
        size: defaultSize,
      };

      set((state) => ({
        activeWindowId: newWindow.id,
        windows: applyZOrder([...state.windows, newWindow]),
      }));
    }
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: applyZOrder(state.windows.filter((w) => w.id !== id)),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
      windows: applyZOrder(state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      )),
    }));
  },

  maximizeWindow: (id) => {
    set((state) => {
      const updatedWindows = state.windows.map((w) =>
        w.id === id 
          ? { ...w, isMaximized: !w.isMaximized, isMinimized: false } 
          : w
      );

      return {
        activeWindowId: id,
        windows: moveWindowToFront(updatedWindows, id),
      };
    });
  },

  focusWindow: (id) => {
    set((state) => ({
      activeWindowId: id,
      windows: moveWindowToFront(
        state.windows.map((w) =>
          w.id === id ? { ...w, isMinimized: false } : w
        ),
        id
      ),
    }));
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

  toggleTheme: () => {
    set((state) => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('os-theme', nextTheme);
      }
      return { theme: nextTheme };
    });
  },
}));
