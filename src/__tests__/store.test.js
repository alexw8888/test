import { describe, it, expect, beforeEach } from 'vitest';
import { useOSStore } from '../store/useOSStore';

describe('useOSStore window management', () => {
  beforeEach(() => {
    // Reset store by re-initializing to ensure clean state between tests
    const state = useOSStore.getState();
    state.windows = [];
    state.activeWindowId = null;
  });

  it('opens windows and focuses them on open', () => {
    const state = useOSStore.getState();

    state.openApp('calculator');
    state.openApp('notepad');

    const windows = useOSStore.getState().windows;
    expect(windows.length).toBe(2);
    // last opened window should be top
    const topWindow = windows[windows.length - 1];
    expect(topWindow.appId).toBe('notepad');
  });

  it('focusWindow brings window to top and reassigns zIndex', () => {
    const state = useOSStore.getState();

    state.openApp('calculator');
    state.openApp('notepad');
    state.openApp('safari');

    const windowsBefore = useOSStore.getState().windows;
    const firstWin = windowsBefore[0];

    state.focusWindow(firstWin.id);

    const windowsAfter = useOSStore.getState().windows;
    const topWindow = windowsAfter[windowsAfter.length - 1];

    expect(topWindow.id).toBe(firstWin.id);
    // ensure zIndex is highest
    const zIndices = windowsAfter.map(w => w.zIndex);
    const maxZ = Math.max(...zIndices);
    expect(topWindow.zIndex).toBe(maxZ);
  });

  it('updateWindowPosition updates a windows position', () => {
    const state = useOSStore.getState();

    state.openApp('calculator');
    const win = useOSStore.getState().windows[0];
    state.updateWindowPosition(win.id, { x: 200, y: 300 });
    const updated = useOSStore.getState().windows.find(w => w.id === win.id);
    expect(updated.position.x).toBe(200);
    expect(updated.position.y).toBe(300);
  });
});
