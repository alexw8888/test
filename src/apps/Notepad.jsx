import React, { useState, useEffect } from 'react';
import { useOSStore } from '../store/useOSStore';

const Notepad = () => {
  const [text, setText] = useState('');
  const { isDarkMode } = useOSStore();

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
      className={`w-full h-full resize-none p-4 outline-none font-sans text-base ${
        isDarkMode 
          ? 'text-gray-100 bg-gray-900 placeholder-gray-500' 
          : 'text-gray-800 bg-white'
      }`}
      value={text}
      onChange={handleChange}
      placeholder="Type something..."
    />
  );
};

export default Notepad;
