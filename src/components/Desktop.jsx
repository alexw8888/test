import React from 'react';
import { useOSStore } from '../store/useOSStore';
import WindowFrame from './WindowFrame';
import Dock from './Dock';
import TopBar from './TopBar';

const Desktop = () => {
  const { windows, windowOrder } = useOSStore();

  // Compute z-index based on position in windowOrder array (Task 5)
  const getZIndex = (windowId) => {
    const index = windowOrder.indexOf(windowId);
    return 100 + (index >= 0 ? index : 0); // Base z-index + position in stack
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden font-sans"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}
    >

      <TopBar />

      <div className="relative w-full h-full pt-[36px] pb-24 z-0">
        {windows.map((window) => (
          <WindowFrame
            key={window.id}
            windowItem={window}
            zIndex={getZIndex(window.id)}
          />
        ))}
      </div>

      <Dock />
    </div>
  );
};

export default Desktop;
