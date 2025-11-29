import React from 'react';
import { Heart } from 'lucide-react';

const HelloApp = () => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Heart size={48} className="text-red-500 mr-3" />
          <h1 className="text-4xl font-bold text-gray-800">Hello World</h1>
          <Heart size={48} className="text-red-500 ml-3" />
        </div>
        <p className="text-lg text-gray-600">Welcome to the Hello App!</p>
        <div className="mt-6 text-sm text-gray-500">
          This is a new application created for the LLM Benchmark.
        </div>
      </div>
    </div>
  );
};

export default HelloApp;