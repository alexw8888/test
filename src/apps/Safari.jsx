import React, { useState } from 'react';

const HOME_URL = 'https://www.wikipedia.org';

const Safari = () => {
  const [address, setAddress] = useState(HOME_URL);
  const [currentUrl, setCurrentUrl] = useState(HOME_URL);

  const handleNavigate = () => {
    if (!address.trim()) return;
    const normalized = address.startsWith('http://') || address.startsWith('https://')
      ? address
      : `https://${address}`;
    setCurrentUrl(normalized);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNavigate();
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      <div className="bg-gray-100 border-b p-2 flex items-center space-x-2 text-sm text-gray-600">
        <div className="flex space-x-2">
          <button className="hover:bg-gray-200 p-1 rounded" onClick={() => setCurrentUrl(HOME_URL)}>{'<'}</button>
          <button className="hover:bg-gray-200 p-1 rounded" onClick={handleNavigate}>{'>'}</button>
        </div>
        <input
          className="flex-1 bg-gray-200 rounded px-3 py-1 text-black outline-none focus:ring-2 focus:ring-blue-400"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Address bar"
        />
        <button 
          className="hover:bg-gray-200 px-3 py-1 rounded border border-gray-300 bg-white text-gray-700"
          onClick={handleNavigate}
        >
          Go
        </button>
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
