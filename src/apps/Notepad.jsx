import React, { useState, useEffect } from 'react';

const Notepad = ({ darkMode }) => {
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

  return (
    <textarea
      className={`w-full h-full resize-none p-4 outline-none font-sans text-base ${
        darkMode 
          ? 'bg-gray-900 text-gray-100 placeholder-gray-500' 
          : 'bg-white text-gray-800 placeholder-gray-400'
      }`}
      value={text}
      onChange={handleChange}
      placeholder="Type something..."
    />
  );
};

export default Notepad;
