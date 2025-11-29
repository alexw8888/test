import React, { useState } from 'react';

const Safari = () => {
  const [url, setUrl] = useState('https://www.wikipedia.org');
  const [inputUrl, setInputUrl] = useState('wikipedia.org');
  const [history, setHistory] = useState(['https://www.wikipedia.org']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    let newUrl = inputUrl;
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      newUrl = 'https://' + newUrl;
    }
    setUrl(newUrl);
    const newHistory = [...history.slice(0, historyIndex + 1), newUrl];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
      setInputUrl(history[newIndex].replace(/^https?:\/\//, ''));
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
      setInputUrl(history[newIndex].replace(/^https?:\/\//, ''));
    }
  };

  const reload = () => {
    setUrl(url + ''); // Force re-render
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      <form onSubmit={handleUrlSubmit} className="bg-gray-100 border-b p-2 flex items-center space-x-2 text-sm text-gray-500">
        <div className="flex space-x-2">
           <button type="button" onClick={goBack} className="hover:bg-gray-200 p-1 rounded disabled:opacity-50" disabled={historyIndex === 0}>{'<'}</button>
           <button type="button" onClick={goForward} className="hover:bg-gray-200 p-1 rounded disabled:opacity-50" disabled={historyIndex >= history.length - 1}>{'>'}</button>
        </div>
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="flex-1 bg-gray-200 rounded px-3 py-1 text-center text-black outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter URL..."
        />
        <button type="button" onClick={reload} className="hover:bg-gray-200 p-1 rounded">↻</button>
      </form>
      <div className="flex-1 relative">
        <iframe 
          src={url} 
          title="Safari"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

export default Safari;
