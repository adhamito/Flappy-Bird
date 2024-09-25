import React from 'react';
import { RiCoinLine } from 'react-icons/ri';

const Coin = ({ position, height, slotHeight }) => {
  return (
    <div
      style={{
        top: `${height + slotHeight / 2}%`, // Position in the middle of the slot
        right: `${position}%`,
      }}
      className="absolute"
    >
      <RiCoinLine className="text-yellow-500 text-xl" />
    </div>
  );
};

export default Coin;
