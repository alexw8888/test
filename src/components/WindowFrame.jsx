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

  return (
    <AnimatePresence>
      {!isMinimized && (
        <Draggable
          handle=".window-header"
          defaultPosition={position}
          onStart={handleFocus}
          onStop={(e, data) => updateWindowPosition(id, { x: data.x, y: data.y })}
          nodeRef={nodeRef}
          bounds="parent"
        >
          <div
            ref={nodeRef}
            className="absolute flex flex-col"
            style={{
              width: isMaximized ? '100%' : size.width,
              height: isMaximized ? '100%' : size.height,
              zIndex: zIndex,
              left: isMaximized ? 0 : undefined,
              top: isMaximized ? 0 : undefined,
            }}
            onMouseDown={handleFocus}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`w-full h-full rounded-xl overflow-hidden shadow-mac-window backdrop-blur-xl border flex flex-col transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-900/90 border-gray-700' 
                  : 'bg-mac-window border-white/20'
              }`}
            >
              {/* Window Header */}
              <div className={`window-header h-10 border-b flex items-center px-4 space-x-2 select-none cursor-default transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-gray-200/50 border-gray-300/30'
              }`}>
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
                <div className={`flex-1 text-center text-sm font-medium opacity-80 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
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
          </div>
        </Draggable>
      )}
    </AnimatePresence>
  );
};

export default WindowFrame;