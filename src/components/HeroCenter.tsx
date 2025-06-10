import React, { useState, useEffect } from 'react';

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
        {/* Content removed as requested */}
      </div>
    </div>
  );
};

export default HeroCenter;
