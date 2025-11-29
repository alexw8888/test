import React from 'react';

const Safari = () => {
  return (
    <div className="flex flex-col h-full w-full bg-white">
      <div className="bg-gray-100 border-b p-2 flex items-center space-x-2 text-sm text-gray-500">
        <div className="flex space-x-2">
           <button className="hover:bg-gray-200 p-1 rounded">{'<'}</button>
           <button className="hover:bg-gray-200 p-1 rounded">{'>'}</button>
        </div>
        <div className="flex-1 bg-gray-200 rounded px-3 py-1 text-center text-black">
           wikipedia.org
        </div>
        <button className="hover:bg-gray-200 p-1 rounded">↻</button>
      </div>
      <div className="flex-1 relative">
        <iframe 
          src="https://www.wikipedia.org" 
          title="Safari"
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

export default Safari;
