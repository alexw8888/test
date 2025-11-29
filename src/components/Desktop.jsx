import React from 'react';
import { useOSStore } from '../store/useOSStore';
import WindowFrame from './WindowFrame';
import Dock from './Dock';
import TopBar from './TopBar';

const Desktop = () => {
  const { windows, activeWindowId } = useOSStore();

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center font-sans"
      style={{
        // Deep blue gradient background
        background: 'linear-gradient(135deg, #00121a 0%, #002b54 50%, #003b7a 100%)',
      }}
    >
      {/* Overlay to darken/tint if needed */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      <TopBar />

      <div className="relative w-full h-full pt-8 pb-24 z-0">
        {windows.map((window) => (
          <WindowFrame key={window.id} windowItem={window} />
        ))}
      </div>

      <Dock />
    </div>
  );
};

export default Desktop;
