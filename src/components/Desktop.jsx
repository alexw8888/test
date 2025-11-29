import React from 'react';
import { useOSStore } from '../store/useOSStore';
import WindowFrame from './WindowFrame';
import Dock from './Dock';
import TopBar from './TopBar';

const Desktop = () => {
  const { windows, activeWindowId, darkMode } = useOSStore();

  return (
    <div 
      className={`relative w-screen h-screen overflow-hidden bg-cover bg-center font-sans ${darkMode ? 'dark' : ''}`}
      style={{ 
        backgroundImage: 'linear-gradient(180deg, #0f172a 0%, #001529 100%)',
        backgroundColor: '#001529' 
      }}
    >
      {/* Overlay to darken/tint if needed */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <TopBar />

      <div className="relative w-full h-full pt-9 pb-24 z-0">
        {windows.map((window) => (
          <WindowFrame key={window.id} windowItem={window} />
        ))}
      </div>

      <Dock />
    </div>
  );
};

export default Desktop;
