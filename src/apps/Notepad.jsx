import React, { useState, useEffect } from 'react';
import { useOSStore } from '../store/useOSStore';

const Notepad = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('notepad-content');
    if (saved) setText(saved);
  }, []);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    localStorage.setItem('notepad-content', newText);
  };

  const { darkMode } = useOSStore();

  return (
    <textarea
      className={`w-full h-full resize-none p-4 outline-none text-base ${darkMode ? 'text-white bg-gray-900' : 'text-gray-800 bg-white'} font-sans`}
      value={text}
      onChange={handleChange}
      placeholder="Type something..."
    />
  );
};

export default Notepad;
