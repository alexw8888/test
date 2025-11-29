import React, { useState } from 'react';

const Safari = () => {
  const [url, setUrl] = useState('https://www.wikipedia.org');
  const [src, setSrc] = useState(url);

  const navigate = (e) => {
    e.preventDefault();
    // Ensure protocol exists for iframe
    const safeUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    setSrc(safeUrl);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      <form onSubmit={navigate} className="bg-gray-100 border-b p-2 flex items-center space-x-2 text-sm text-gray-500">
        <div className="flex space-x-2">
           <button type="button" className="hover:bg-gray-200 p-1 rounded">{'<'}</button>
           <button type="button" className="hover:bg-gray-200 p-1 rounded">{'>'}</button>
        </div>
        <input
          aria-label="Address bar"
          className="flex-1 bg-white rounded px-3 py-1 text-sm border border-gray-200"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" className="hover:bg-gray-200 p-1 rounded">↻</button>
      </form>
      <div className="flex-1 relative">
        <iframe 
          src={src} 
          title="Safari"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

export default Safari;
