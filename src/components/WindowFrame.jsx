import React, { useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useOSStore } from '../store/useOSStore';
import { apps } from '../utils/appRegistry';

const WindowFrame = ({ windowItem }) => {
  const { id, appId, isMinimized, isMaximized, zIndex, position, size } = windowItem;
  const { focusWindow, closeWindow, minimizeWindow, maximizeWindow, updateWindowPosition, isDarkMode } = useOSStore();
  const nodeRef = useRef(null);

  const appConfig = apps[appId];
  const AppComponent = appConfig ? appConfig.component : null;

  if (!AppComponent) return null;

  const handleFocus = () => {
    focusWindow(id);
  };

  const variants = {
    hidden: { opacity: 0, scale: 0.8, y: 100 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 100, transition: { duration: 0.2 } },
  };

  // Disable dragging when maximized
  const isDraggable = !isMaximized;

  // For minimized windows, return nothing
  if (isMinimized) return null;

  // For draggable windows, use simpler structure without AnimatePresence
  if (isDraggable) {
    return (
      <Draggable
        handle=".window-header"
        position={position}
        onStart={handleFocus}
        onStop={(e, data) => updateWindowPosition(id, { x: data.x, y: data.y })}
        nodeRef={nodeRef}
        bounds="parent"
      >
        <div
          ref={nodeRef}
          className={`absolute rounded-xl overflow-hidden shadow-mac-window backdrop-blur-xl border flex flex-col cursor-move ${
            isDarkMode 
              ? 'bg-gray-900/90 border-gray-700/50' 
              : 'bg-mac-window border-white/20'
          }`}
          style={{
            width: size.width,
            height: size.height,
            zIndex: zIndex,
          }}
          onMouseDown={handleFocus}
        >
          {/* Window Header */}
          <div className={`window-header h-10 border-b flex items-center px-4 space-x-2 select-none cursor-move ${
            isDarkMode 
              ? 'bg-gray-800/50 border-gray-700/30' 
              : 'bg-gray-200/50 border-gray-300/30'
          }`}>
            <div className="flex space-x-2 group">
              <button 
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); closeWindow(id); }}
                className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center hover:brightness-90 active:brightness-75"
              >
                <X size={8} className="opacity-0 group-hover:opacity-100 text-black/60" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); minimizeWindow(id); }}
                className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center hover:brightness-90 active:brightness-75"
              >
                <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black/60" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); maximizeWindow(id); }}
                className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center hover:brightness-90 active:brightness-75"
              >
                <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black/60" />
              </button>
            </div>
            <div className={`flex-1 text-center text-sm font-medium opacity-80 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
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
  }

  // For maximized windows, use AnimatePresence but disable dragging
  return (
    <AnimatePresence>
      <motion.div
        ref={nodeRef}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`absolute rounded-xl overflow-hidden shadow-mac-window backdrop-blur-xl border flex flex-col cursor-default ${
          isDarkMode 
            ? 'bg-gray-900/90 border-gray-700/50' 
            : 'bg-mac-window border-white/20'
        }`}
        style={{
          width: '100%',
          height: '100%',
          zIndex: zIndex,
          left: 0,
          top: 0,
        }}
        onMouseDown={handleFocus}
      >
        {/* Window Header */}
        <div className={`window-header h-10 border-b flex items-center px-4 space-x-2 select-none cursor-default ${
          isDarkMode 
            ? 'bg-gray-800/50 border-gray-700/30' 
            : 'bg-gray-200/50 border-gray-300/30'
        }`}>
          <div className="flex space-x-2 group">
            <button 
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); closeWindow(id); }}
              className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center hover:brightness-90 active:brightness-75"
            >
              <X size={8} className="opacity-0 group-hover:opacity-100 text-black/60" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); minimizeWindow(id); }}
              className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center hover:brightness-90 active:brightness-75"
            >
              <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black/60" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); maximizeWindow(id); }}
              className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center hover:brightness-90 active:brightness-75"
            >
              <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black/60" />
            </button>
          </div>
          <div className={`flex-1 text-center text-sm font-medium opacity-80 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
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
      </motion.div>
    </AnimatePresence>
  );
};

export default WindowFrame;
