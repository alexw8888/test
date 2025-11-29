import React from 'react';
import { useOSStore } from '../store/useOSStore';
import WindowFrame from './WindowFrame';
import Dock from './Dock';
import TopBar from './TopBar';

const Desktop = () => {
  const { windows, theme } = useOSStore();
  const orderedWindows = [...windows].sort((a, b) => a.zIndex - b.zIndex);
  const isDark = theme === 'dark';

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#0b1b3a] via-[#0f2e63] to-[#0a1f4f] font-sans ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
    >
      {/* Overlay to darken/tint if needed */}
      <div className={`absolute inset-0 ${isDark ? 'bg-black/30' : 'bg-black/10'} pointer-events-none`} />

      <TopBar />

      <div className="relative w-full h-full pt-10 pb-24 z-0">
        {orderedWindows.map((window) => (
          <WindowFrame key={window.id} windowItem={window} />
        ))}
      </div>

      <Dock />
    </div>
  );
};

export default Desktop;
