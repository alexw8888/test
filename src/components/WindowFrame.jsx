import React, { useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
// Removed framer-motion to avoid conflicts with react-draggable transforms
import { X, Minus, Maximize2 } from 'lucide-react';
import { useOSStore } from '../store/useOSStore';
import { apps } from '../utils/appRegistry';

const WindowFrame = ({ windowItem }) => {
  const { id, appId, isMinimized, isMaximized, zIndex, position, size } = windowItem;
  const { focusWindow, closeWindow, minimizeWindow, maximizeWindow, updateWindowPosition, darkMode } = useOSStore();
  const nodeRef = useRef(null);

  const appConfig = apps[appId];
  const AppComponent = appConfig ? appConfig.component : null;

  if (!AppComponent) return null;
  if (isMinimized) return null;

  const handleFocus = () => {
    focusWindow(id);
  };

  // removed animation variants — framer-motion and react-draggable may conflict

  return (
        <Draggable
          handle=".window-header"
          position={{ x: position.x, y: position.y }}
          onStart={handleFocus}
          onDrag={(e, data) => updateWindowPosition(id, { x: data.x, y: data.y })}
          onStop={(e, data) => updateWindowPosition(id, { x: data.x, y: data.y })}
          nodeRef={nodeRef}
          bounds="parent"
        >
          <div
            ref={nodeRef}
            className="absolute rounded-xl overflow-hidden shadow-mac-window bg-mac-window backdrop-blur-xl border border-white/20 flex flex-col"
            style={{
              width: isMaximized ? '100%' : size.width,
              height: isMaximized ? '100%' : size.height,
              zIndex: zIndex,
              left: isMaximized ? 0 : undefined, // Override draggable position if maximized
              top: isMaximized ? 0 : undefined,
              transform: isMaximized ? 'none !important' : undefined, // Force transform reset if maximized (tricky with draggable)
            }}
            onMouseDown={handleFocus}
          >
            {/* Window Header */}
            <div className={`window-header h-10 ${darkMode ? 'bg-gray-800/40 border-b border-gray-700/40 text-white' : 'bg-gray-200/50 border-b border-gray-300/30 text-gray-700'} flex items-center px-4 space-x-2 select-none cursor-grab active:cursor-grabbing`}>
              <div className="flex space-x-2 group">
                <button 
                  onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                  className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center hover:brightness-90 active:brightness-75"
                >
                  <X size={8} className="opacity-0 group-hover:opacity-100 text-black/60" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                  className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center hover:brightness-90 active:brightness-75"
                >
                  <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black/60" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
                  className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center hover:brightness-90 active:brightness-75"
                >
                  <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black/60" />
                </button>
              </div>
              <div className="flex-1 text-center text-sm font-medium text-gray-700 opacity-80">
                {appConfig.title}
              </div>
              <div className="w-14"></div> {/* Spacer for centering title */}
            </div>

            {/* Window Content */}
            <div className="flex-1 relative overflow-hidden">
              <div className="absolute inset-0 overflow-auto">
                <AppComponent />
              </div>
            </div>
          </div>
        </Draggable>
  );
};

export default WindowFrame;
