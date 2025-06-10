
import React, { useState, useEffect } from 'react';
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
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-light tracking-[0.2em] mb-4">
          <HackerText text="NICK CHOY" trigger={themeChangeCount} />
        </h1>
        <div className="text-sm font-mono tracking-[0.3em] text-muted-foreground">
          <HackerText text="DESIGN • MARKETING • GROWTH • ∞" trigger={themeChangeCount} />
        </div>
      </div>
    </div>
  );
};

export default HeroCenter;
