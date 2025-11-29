import React from 'react';
import { Heart } from 'lucide-react';

const HelloApp = () => (
  <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-700 text-white">
    <div className="text-center">
      <Heart size={48} className="text-red-400 mx-auto mb-4" />
      <h1 className="text-4xl font-bold">Hello World</h1>
      <p className="mt-2 text-lg text-white/80">This is the new HelloApp.</p>
    </div>
  </div>
);

export default HelloApp;