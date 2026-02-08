import React from 'react';

const BackgroundEffect: React.FC = () => {
  // Define the number of vertical bars you want
  const finCount = 15;

  return (
    <div className="relative flex h-screen w-full items-end overflow-hidden bg-black">
      {/* Container for the vertical bars */}
      <div className="flex w-full h-full items-end justify-between px-2">
        {[...Array(finCount)].map((_, i) => (
          <div
            key={i}
            className="h-[60%] w-[2px] md:w-[3px] opacity-40"
            style={{
              background: 'linear-gradient(to top, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%)',
            }}
          />
        ))}
      </div>

      {/* Overlay for that soft, dark depth at the top */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent" />
    </div>
  );
};

export default BackgroundEffect;