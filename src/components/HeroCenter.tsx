
import React from 'react';
import AsciiSky from './AsciiSky';

const HeroCenter = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Animated ASCII Art */}
      <div className="relative mb-8">
        <AsciiSky />
        
        {/* Text around the art */}
        <div className="mt-4 text-xs font-mono text-muted-foreground tracking-[0.2em]">
          AR/AI • DESIGNER • ARTIST • PROTOTYPER
        </div>
      </div>

      {/* Central title */}
      <div className="text-center">
        <h1 className="text-2xl font-mono font-medium mb-2">AR/AI designer, artist & prototyper</h1>
        <p className="text-sm font-mono text-muted-foreground">Los Angeles, California</p>
      </div>

      {/* Skills section */}
      <div className="mt-16 text-center max-w-2xl">
        <h2 className="text-sm font-mono font-medium mb-4">Skills</h2>
        <p className="text-xs font-mono text-muted-foreground leading-relaxed">
          Unity, C#, AI, Blender, Lens Studio, JavaScript, p5.js, SparkAR, 
          Lightship ARDK, Oculus SDK, Python, AI, VR, Growth, Design Systems
        </p>
      </div>
    </div>
  );
};

export default HeroCenter;
