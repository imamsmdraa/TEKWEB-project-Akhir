import React, { useState, useEffect } from 'react';
import DepthIndicator from './DepthIndicator';
import SeaCreatures from './SeaCreatures';

const DeepSeaExplorer = () => {
  const [scrollDepth, setScrollDepth] = useState(0);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (position / maxScroll) * 5000;
      setScrollDepth(scrollPercentage);
      setDepth(Math.floor(scrollPercentage * 0.5));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const interpolateColor = (color1, color2, factor) => {
    const c1 = color1.match(/\w\w/g).map((hex) => parseInt(hex, 16));
    const c2 = color2.match(/\w\w/g).map((hex) => parseInt(hex, 16));
    const result = c1.map((v, i) => Math.round(v + factor * (c2[i] - v)));
    return `rgb(${result.join(',')})`;
  };

  const getInterpolatedBackground = (depth) => {
    if (depth < 500) {
      return interpolateColor('#87CEEB', '#4682B4', depth / 200); // Light blue to deeper blue
    } else if (depth < 1000) {
      return interpolateColor('#4682B4', '#2F4F4F', (depth - 200) / 300); // Deeper blue to dark slate gray
    } else if (depth < 2000) {
      return interpolateColor('#2F4F4F', '#000000', (depth - 500) / 100); 
    } else {
      return '#000000'; // Complete darkness
    }
  };

  const renderParticles = () => {
    const particles = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 5 + 2,
    }));

    return particles.map((particle) => (
      <div
        key={particle.id}
        className="absolute rounded-full bg-white opacity-50 animate-bubble"
        style={{
          top: `${Math.random() * 1000}vh`,
          left: `${particle.left}%`, 
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          animationDelay: `${particle.delay}s`,
        }}
      />
    ));
  };

  return (
    <div
      className="relative min-h-[2000vh] overflow-hidden transition-colors duration-300"
      style={{ background: getInterpolatedBackground(depth) }}
    >
      {/* Particles */}
      {renderParticles()}

      {/* Depth indicator */}
      <DepthIndicator depth={depth} />

      {/* Sea creatures */}
      <SeaCreatures scrollDepth={scrollDepth} />

      {/* Horizon light */}
      {depth < 100 && (
        <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-white to-transparent pointer-events-none opacity-50" />
      )}
    </div>
  );
};

export default DeepSeaExplorer;
