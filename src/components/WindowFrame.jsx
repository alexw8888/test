import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useOSStore } from '../store/useOSStore';
import { apps } from '../utils/appRegistry';

const WindowFrame = ({ windowItem }) => {
  const { id, appId, isMinimized, isMaximized, zIndex, position, size } = windowItem;
  const { focusWindow, closeWindow, minimizeWindow, maximizeWindow, updateWindowPosition, theme } = useOSStore();
  const nodeRef = useRef(null);

  const appConfig = apps[appId];
  const AppComponent = appConfig ? appConfig.component : null;
  const isDark = theme === 'dark';

  if (!AppComponent || isMinimized) return null;

  const handleFocus = () => {
    focusWindow(id);
  };

  return (
    <Draggable
      handle=".window-header"
      position={isMaximized ? { x: 0, y: 0 } : position}
      onStart={handleFocus}
      onDrag={(e, data) => updateWindowPosition(id, { x: data.x, y: data.y })}
      nodeRef={nodeRef}
      bounds="parent"
      disabled={isMaximized}
    >
      <div
        ref={nodeRef}
        className={`absolute rounded-xl overflow-hidden shadow-mac-window backdrop-blur-xl border flex flex-col transition-colors ${isDark ? 'bg-slate-900/80 border-slate-700 text-gray-100' : 'bg-mac-window border-white/20 text-gray-900'}`}
        style={{
          width: isMaximized ? '100%' : size.width,
          height: isMaximized ? '100%' : size.height,
          zIndex,
          left: isMaximized ? 0 : undefined,
          top: isMaximized ? 0 : undefined,
        }}
        onMouseDown={handleFocus}
      >
        {/* Window Header */}
        <div className={`window-header h-10 border-b flex items-center px-4 space-x-2 select-none cursor-move ${isDark ? 'bg-slate-800/80 border-slate-700 text-gray-100' : 'bg-gray-200/50 border-gray-300/30 text-gray-700'}`}>
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
