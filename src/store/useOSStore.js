import { create } from 'zustand';

const Z_BASE = 100;

const recomputeZIndices = (windows) => {
  return windows.map((w, idx) => ({ ...w, zIndex: Z_BASE + idx }));
};

export const useOSStore = create((set, get) => ({
  activeWindowId: null,
  windows: [],
  darkMode: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('darkMode') || 'false') : false,

  // Actions
  openApp: (appId) => {
    const { windows } = get();

    const existingIndex = windows.findIndex((w) => w.appId === appId);

    if (existingIndex !== -1) {
      // Bring existing window to front and restore
      set((state) => {
        const updated = state.windows.map((w) => w.id === state.windows[existingIndex].id ? { ...w, isMinimized: false } : w);
        // move to end
        const windowToBring = updated.splice(existingIndex, 1)[0];
        updated.push(windowToBring);
        const withZ = recomputeZIndices(updated);
        return { windows: withZ, activeWindowId: windowToBring.id };
      });
    } else {
      const newWindow = {
        id: Date.now().toString(),
        appId,
        title: appId,
        isMinimized: false,
        isMaximized: false,
        position: { x: 100 + (get().windows.length * 20), y: 50 + (get().windows.length * 20) },
        size: { width: 600, height: 400 },
      };

      set((state) => {
        const updated = [...state.windows, newWindow];
        return { windows: recomputeZIndices(updated), activeWindowId: newWindow.id };
      });
    }
  },

  closeWindow: (id) => {
    set((state) => {
      const updated = state.windows.filter((w) => w.id !== id);
      const withZ = recomputeZIndices(updated);
      const last = withZ.length ? withZ[withZ.length - 1].id : null;
      return { windows: withZ, activeWindowId: state.activeWindowId === id ? last : state.activeWindowId };
    });
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },

  maximizeWindow: (id) => {
    set((state) => {
      const updated = state.windows.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
      // bring to front
      const idx = updated.findIndex((w) => w.id === id);
      if (idx !== -1) {
        const win = updated.splice(idx, 1)[0];
        updated.push(win);
      }
      return { windows: recomputeZIndices(updated), activeWindowId: id };
    });
  },

  focusWindow: (id) => {
    set((state) => {
      const idx = state.windows.findIndex((w) => w.id === id);
      if (idx === -1) return {};
      const updated = [...state.windows];
      const win = updated.splice(idx, 1)[0];
      win.isMinimized = false;
      updated.push(win);
      return { windows: recomputeZIndices(updated), activeWindowId: id };
    });
  },

  updateWindowPosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, position } : w)),
    }));
  },

  updateWindowSize: (id, size) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, size } : w)),
    }));
  },

  toggleDarkMode: () => {
    set((state) => {
      const next = !state.darkMode;
      try { localStorage.setItem('darkMode', JSON.stringify(next)); } catch (e) {}
      return { darkMode: next };
    });
  },
}));
