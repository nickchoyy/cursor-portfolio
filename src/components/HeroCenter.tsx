
import React from 'react';

const HeroCenter = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Central rotating element */}
      <div className="relative mb-8">
        <div className="w-48 h-48 rounded-full border border-foreground/20 flex items-center justify-center relative">
          <div className="w-32 h-32 rounded-full bg-foreground/10 animate-rotate relative">
            <div className="absolute top-4 left-1/2 w-2 h-2 bg-foreground rounded-full -translate-x-1/2"></div>
            <div className="absolute bottom-4 left-1/2 w-1 h-1 bg-foreground/60 rounded-full -translate-x-1/2"></div>
          </div>
          {/* Text around the circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xs font-mono text-muted-foreground tracking-[0.2em] transform -rotate-12">
              AR/AI • DESIGNER • ARTIST • PROTOTYPER •
            </div>
          </div>
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
