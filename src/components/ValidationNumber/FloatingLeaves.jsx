import React from 'react';

const FloatingLeaves = () => {
  const leaves = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: `${Math.random() * 15}s`,
    duration: `${15 + Math.random() * 20}s`,
    size: 15 + Math.floor(Math.random() * 20),
    left: `${Math.random() * 100}%`,
    rotation: Math.random() > 0.5 ? 'clockwise' : 'counterclockwise'
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className={`absolute rounded-full bg-green-500 opacity-20 ${
            leaf.rotation === 'clockwise' ? 'animate-float-rotate' : 'animate-float-rotate-reverse'
          }`}
          style={{
            width: `${leaf.size}px`,
            height: `${leaf.size * 1.3}px`,
            left: leaf.left,
            top: '-50px',
            animationDelay: leaf.delay,
            animationDuration: leaf.duration,
          }}
        ></div>
      ))}
    </div>
  );
};

export default FloatingLeaves;
