import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';
import { appList } from '../utils/appRegistry';

const Dock = () => {
  const mouseX = useMotionValue(null);
  const { openApp, windows, activeWindowId } = useOSStore();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999]">
      <div 
        className="flex items-end h-16 gap-4 px-4 py-2 rounded-2xl bg-mac-dock backdrop-blur-md border border-white/20 shadow-2xl"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(null)}
      >
        {appList.map((app) => (
          <DockItem 
            key={app.id} 
            app={app} 
            mouseX={mouseX} 
            isOpen={windows.some(w => w.appId === app.id)}
            isActive={activeWindowId && windows.find(w => w.id === activeWindowId)?.appId === app.id}
            onClick={() => openApp(app.id)}
          />
        ))}
      </div>
    </div>
  );
};

const DockItem = ({ app, mouseX, isOpen, isActive, onClick }) => {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const Icon = app.icon;

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square flex flex-col items-center justify-end relative group cursor-pointer"
      onClick={onClick}
    >
      <motion.div 
        className="w-full h-full rounded-xl bg-white/90 shadow-lg flex items-center justify-center mb-1 overflow-hidden hover:brightness-110 transition-all"
      >
         <Icon size="60%" className="text-gray-800" />
      </motion.div>
      
      <div className={`w-1 h-1 rounded-full bg-black/50 absolute -bottom-1 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition pointer-events-none backdrop-blur">
        {app.title}
      </div>
    </motion.div>
  );
};

export default Dock;
