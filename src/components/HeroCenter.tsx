
import React, { useEffect, useState } from 'react';
import AsciiSky from './AsciiSky';
import HackerText from './HackerText';

const HeroCenter = () => {
  const [themeChangeCount, setThemeChangeCount] = useState(0);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setThemeChangeCount(event.detail);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    return () => window.removeEventListener('themeChange', handleThemeChange as EventListener);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative z-10">
      {/* Background sky animation */}
      <AsciiSky />
      
      {/* Minimal text around the art */}
      <div className="text-center">
        <div className="text-xs font-mono text-muted-foreground tracking-[0.2em] mb-4">
          <HackerText text="AR/AI • DESIGNER • ARTIST • PROTOTYPER" trigger={themeChangeCount > 0} />
        </div>
      </div>
    </div>
  );
};

export default HeroCenter;
