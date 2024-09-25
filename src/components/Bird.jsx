import React, { useEffect, useState } from 'react';
import { GiHummingbird } from 'react-icons/gi';

const Bird = ({ gravity, setBirdPosition }) => {
  const [position, setPosition] = useState(50); // Bird's Y position

  const handleJump = () => {
    setPosition(pos => Math.max(pos - 20, 0)); // Move up
    setBirdPosition(position); // Update bird position in parent
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(pos => Math.min(pos + gravity, 100)); // Apply gravity
      setBirdPosition(pos => Math.min(pos + gravity, 100));
    }, 24);
    return () => clearInterval(interval);
  }, [gravity]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') handleJump();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="absolute"
      style={{ top: `${position}%`, left: '10%', fontSize: '2rem' }}
    >
      <GiHummingbird className="text-yellow-400" />
    </div>
  );
};

export default Bird;
