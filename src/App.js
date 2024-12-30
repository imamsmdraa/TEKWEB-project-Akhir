import React from 'react';
import DeepSeaExplorer from './Components/DeepSeaExplorer';

import './App.css';

function App() {
  return (
    <div className="App relative">
      {/* Header dengan background gradient, efek blur, dan partikel */}
      <header className="relative h-screen flex items-center justify-center bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100">
        {/* Partikel bergerak */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-3 h-3 bg-white rounded-full opacity-50 animate-bubble" style={{ top: '10%', left: '20%' }}></div>
          <div className="absolute w-4 h-4 bg-white rounded-full opacity-40 animate-bubble" style={{ top: '30%', left: '50%' }}></div>
          <div className="absolute w-5 h-5 bg-white rounded-full opacity-30 animate-bubble" style={{ top: '60%', left: '80%' }}></div>
        </div>

        {/* Konten Header */}
        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold text-navy-900 mb-2 tracking-wide drop-shadow-lg bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-transparent bg-clip-text animate-fade-in">
            Skema Biota Laut
          </h1>
          <p className="text-lg font-medium text-blue-800 opacity-80 animate-fade-in-delay tracking-wider">
            By Imam Samudra
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-3"></div>
        </div>
      </header>

      <DeepSeaExplorer />
    </div>
  );
}

export default App;
