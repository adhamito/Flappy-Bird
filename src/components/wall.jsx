import React from 'react';

const Wall = () => {
  const slotHeight = 20; // Fixed height for the slot
  const slotPosition = Math.random() * (100 - slotHeight - 10); // Random slot position

  return (
    <div className='flex justify-around p-2'>
      <div className='bg-black w-24' style={{ height: `${slotPosition}%` }} />
      <div className='bg-[#87ceeb] w-24' style={{ height: `${slotHeight}%` }} />
      <div className='bg-black w-24' style={{ height: `${100 - slotPosition - slotHeight}%` }} />
    </div>
  );
};

export default Wall;
