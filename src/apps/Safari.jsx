import React, { useState } from 'react';

const Safari = () => {
  const [url, setUrl] = useState('https://www.wikipedia.org');
  const [inputValue, setInputValue] = useState('wikipedia.org');
  const [iframeSrc, setIframeSrc] = useState('https://www.wikipedia.org');

  const formatUrlForDisplay = (fullUrl) => {
    try {
      const urlObj = new URL(fullUrl);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return fullUrl;
    }
  };

  const handleNavigate = () => {
    let newUrl = inputValue;
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      newUrl = 'https://' + newUrl;
    }
    setUrl(newUrl);
    setIframeSrc(newUrl);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNavigate();
    }
  };

  const handleRefresh = () => {
    // Force iframe refresh by toggling src
    setIframeSrc('');
    setTimeout(() => setIframeSrc(url), 100);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      <div className="bg-gray-100 border-b p-2 flex items-center space-x-2 text-sm text-gray-500">
        <div className="flex space-x-2">
           <button className="hover:bg-gray-200 p-1 rounded">{'<'}</button>
           <button className="hover:bg-gray-200 p-1 rounded">{'>'}</button>
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleNavigate}
          className="flex-1 bg-gray-200 rounded px-3 py-1 text-center text-black outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter URL..."
        />
        <button
          className="hover:bg-gray-200 p-1 rounded"
          onClick={handleRefresh}
        >
          ↻
        </button>
      </div>
      <div className="flex-1 relative">
        <iframe
          src={iframeSrc}
          title="Safari"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

export default Safari;
