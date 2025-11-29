import React, { useState, useEffect } from 'react';
import { useOSStore } from '../store/useOSStore';

const Notepad = () => {
  const [text, setText] = useState('');
  const { theme } = useOSStore();
  const isDark = theme === 'dark';

  useEffect(() => {
    const saved = localStorage.getItem('notepad-content');
    if (saved) setText(saved);
  }, []);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    localStorage.setItem('notepad-content', newText);
  };

  return (
    <textarea
      className={`w-full h-full resize-none p-4 outline-none font-sans text-base border ${isDark ? 'bg-slate-900 text-gray-100 border-slate-700 placeholder-gray-500' : 'bg-white text-gray-800 border-gray-200'}`}
      value={text}
      onChange={handleChange}
      placeholder="Type something..."
    />
  );
};

export default Notepad;
