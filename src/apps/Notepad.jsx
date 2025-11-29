import React, { useState, useEffect } from 'react';

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

  return (
    <textarea
      className="w-full h-full resize-none p-4 outline-none text-gray-800 font-sans text-base bg-white"
      value={text}
      onChange={handleChange}
      placeholder="Type something..."
    />
  );
};

export default Notepad;
