import React from 'react';

const DepthIndicator = ({ depth }) => (
  <div className="fixed top-8 left-1/2 transform -translate-x-1/2 text-white p-4 rounded-lg z-20 text-center w-full max-w-screen-md">
    <span className="text-2xl font-bold">{depth}m</span>
    <div className="mt-2 border-t-2 border-dashed border-white w-full"></div>
  </div>
);

export default DepthIndicator;
