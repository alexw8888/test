import React from 'react';
import { useOSStore } from '../store/useOSStore';
import WindowFrame from './WindowFrame';
import Dock from './Dock';
import TopBar from './TopBar';

const Desktop = () => {
  const { windows, activeWindowId, darkMode } = useOSStore();

  const sortedWindows = [...windows].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div 
      className={`relative w-screen h-screen overflow-hidden bg-cover bg-center font-sans ${darkMode ? 'dark' : ''}`}
      style={{ 
        background: 'linear-gradient(to bottom, #00008B, #0000FF)',
      }}
    >
      {/* Overlay to darken/tint if needed */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <TopBar />

      <div className="relative w-full h-full pt-9 pb-24 z-0">
        {sortedWindows.map((window) => (
          <WindowFrame key={window.id} windowItem={window} />
        ))}
      </div>

      <Dock />
    </div>
  );
};

export default Desktop;
