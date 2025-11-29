import React from 'react';
import { useOSStore } from '../store/useOSStore';
import WindowFrame from './WindowFrame';
import Dock from './Dock';
import TopBar from './TopBar';

const Desktop = () => {
  const { windows, activeWindowId } = useOSStore();

  // Sort windows by z-index for correct rendering order
  const sortedWindows = [...windows].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center font-sans"
      style={{ 
        background: 'linear-gradient(135deg, #0a1628 0%, #1a365d 50%, #1e3a5f 100%)',
      }}
    >
      {/* Overlay to darken/tint if needed */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <TopBar />

      <div className="relative w-full h-full pt-8 pb-24 z-0">
        {sortedWindows.map((window) => (
          <WindowFrame key={window.id} windowItem={window} />
        ))}
      </div>

      <Dock />
    </div>
  );
};

export default Desktop;
