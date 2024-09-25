import React from 'react';

const Obstacle = ({ height, position, slotHeight }) => {
  return (
    <>
      <div
        className="bg-green-600 absolute"
        style={{ width: '5%', height: `${height}%`, top: 0, right: `${position}%` }}
      />
      <div
        className="bg-green-600 absolute"
        style={{ width: '5%', height: `${100 - height - slotHeight}%`, bottom: 0, right: `${position}%` }}
      />
      {/* Slot for passing the bird */}
      <div
        className="bg-white absolute border border-green-600"
        style={{
          width: '5%',
          height: `${slotHeight}%`,
          top: `${height}%`,
          right: `${position}%`,
        }}
      />
    </>
  );
};

export default Obstacle;
