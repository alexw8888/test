import React, { useState } from 'react';

const Safari = () => {
  const [currentUrl, setCurrentUrl] = useState('wikipedia.org');
  const [displayUrl, setDisplayUrl] = useState('wikipedia.org');

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    setCurrentUrl(displayUrl);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      <div className="bg-gray-100 border-b p-2 flex items-center space-x-2 text-sm text-gray-500">
        <div className="flex space-x-2">
           <button className="hover:bg-gray-200 p-1 rounded">{'<'}</button>
           <button className="hover:bg-gray-200 p-1 rounded">{'>'}</button>
        </div>
        <form onSubmit={handleUrlSubmit} className="flex-1">
          <input 
            type="text"
            value={displayUrl}
            onChange={(e) => setDisplayUrl(e.target.value)}
            className="w-full bg-gray-200 rounded px-3 py-1 text-black outline-none focus:bg-white focus:border focus:border-blue-400"
            placeholder="Enter URL..."
          />
        </form>
        <button className="hover:bg-gray-200 p-1 rounded">↻</button>
      </div>
      <div className="flex-1 relative">
        <iframe 
          src={`https://www.${currentUrl.includes('.') ? currentUrl : currentUrl + '.org'}`} 
          title="Safari"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

export default Safari;
