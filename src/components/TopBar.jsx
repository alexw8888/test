import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Apple, Wifi, Battery, Search, Monitor, Moon, Sun } from 'lucide-react';
import { useOSStore } from '../store/useOSStore';
import { apps } from '../utils/appRegistry';

const TopBar = () => {
  const [date, setDate] = useState(new Date());
  const { activeWindowId, windows, isDarkMode, toggleDarkMode } = useOSStore();
  
  const activeWindow = windows.find(w => w.id === activeWindowId);
  const activeAppName = activeWindow ? apps[activeWindow.appId]?.title : 'Finder';

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-9 bg-mac-window/50 backdrop-blur-md flex items-center justify-between px-4 z-[10000] text-xs font-medium select-none border-b border-white/10 text-gray-800 dark:text-white">
      <div className="flex items-center space-x-4">
        <div className="hover:bg-white/20 p-1 rounded cursor-pointer">
          <Apple size={16} />
        </div>
        <div className="font-bold">{activeAppName}</div>
        <div className="hidden sm:flex space-x-4">
            <span className="cursor-default">File</span>
            <span className="cursor-default">Edit</span>
            <span className="cursor-default">View</span>
            <span className="cursor-default">Go</span>
            <span className="cursor-default">Window</span>
            <span className="cursor-default">Help</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
         <div className="hover:bg-white/20 p-1 rounded cursor-pointer">
            <Battery size={18} />
         </div>
         <div className="hover:bg-white/20 p-1 rounded cursor-pointer">
            <Wifi size={16} />
         </div>
         <div className="hover:bg-white/20 p-1 rounded cursor-pointer">
            <Search size={16} />
          <div className="hover:bg-white/20 p-1 rounded cursor-pointer" onClick={toggleDarkMode}>
             {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </div>
         </div>
         <div className="hover:bg-white/20 p-1 rounded cursor-pointer">
            <Monitor size={16} />
         </div>
         <div className="hover:bg-white/20 px-2 py-1 rounded cursor-pointer min-w-[130px] text-center">
            {format(date, 'EEE MMM d h:mm aa')}
         </div>
      </div>
    </div>
  );
};

export default TopBar;
