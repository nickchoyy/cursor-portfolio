
import React from 'react';
import AsciiSky from './AsciiSky';

const HeroCenter = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative z-10">
      {/* Background sky animation */}
      <AsciiSky />
      
      {/* Minimal text around the art */}
      <div className="text-center">
        <div className="text-xs font-mono text-muted-foreground tracking-[0.2em] mb-4">
          AR/AI • DESIGNER • ARTIST • PROTOTYPER
        </div>
      </div>
    </div>
  );
};

export default HeroCenter;
