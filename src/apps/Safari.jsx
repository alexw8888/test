import React, { useState, useRef } from 'react';

const Safari = () => {
  const [url, setUrl] = useState('https://www.wikipedia.org');
  const [input, setInput] = useState('wikipedia.org');
  const iframeRef = useRef(null);

  const navigate = (next) => {
    let dest = next;
    if (!dest.startsWith('http')) dest = 'https://' + dest;
    setUrl(dest);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      <div className="bg-gray-100 border-b p-2 flex items-center space-x-2 text-sm text-gray-500">
        <div className="flex space-x-2">
           <button className="hover:bg-gray-200 p-1 rounded">{'<'}</button>
           <button className="hover:bg-gray-200 p-1 rounded">{'>'}</button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(input);
          }}
          className="flex-1 flex items-center"
        >
          <input
            className="flex-1 bg-gray-200 rounded px-3 py-1 text-black outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Address Bar"
          />
          <button type="submit" className="ml-2 hover:bg-gray-200 p-1 rounded">Go</button>
        </form>

        <button onClick={() => navigate(input)} className="hover:bg-gray-200 p-1 rounded">↻</button>
      </div>
      <div className="flex-1 relative">
        <iframe 
          src={url} 
          title="Safari"
          ref={iframeRef}
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

export default Safari;
