import React, { useState } from 'react';

const Safari = () => {
  const [currentUrl, setCurrentUrl] = useState('https://www.wikipedia.org');
  const [inputValue, setInputValue] = useState('https://www.wikipedia.org');

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = inputValue.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    setCurrentUrl(url);
    setInputValue(url);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      <div className="bg-gray-100 border-b p-2 flex items-center space-x-2 text-sm text-gray-500">
        <div className="flex space-x-2">
           <button className="hover:bg-gray-200 p-1 rounded">{'<'}</button>
           <button className="hover:bg-gray-200 p-1 rounded">{'>'}</button>
        </div>
        <form onSubmit={handleSubmit} className="flex-1">
            <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-gray-200 rounded px-3 py-1 text-center text-black focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
            />
        </form>
        <button className="hover:bg-gray-200 p-1 rounded" onClick={() => setCurrentUrl(inputValue)}>↻</button>
      </div>
      <div className="flex-1 relative">
        <iframe 
          src={currentUrl}
          title="Safari"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

export default Safari;