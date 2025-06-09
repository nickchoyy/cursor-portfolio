
import React, { useEffect, useState } from 'react';

const DarkModeTransition = () => {
  const [themeChangeCount, setThemeChangeCount] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target as HTMLElement;
          if (target.classList.contains('dark') || !target.classList.contains('dark')) {
            // Increment counter to trigger text scrambling
            setThemeChangeCount(prev => prev + 1);
            console.log('Theme change detected, count:', themeChangeCount + 1);
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [themeChangeCount]);

  // Store the theme change count in a global variable so other components can access it
  useEffect(() => {
    (window as any).themeChangeCount = themeChangeCount;
    // Dispatch custom event for components to listen to
    window.dispatchEvent(new CustomEvent('themeChange', { detail: themeChangeCount }));
    console.log('Dispatching themeChange event with count:', themeChangeCount);
  }, [themeChangeCount]);

  return null;
};

export default DarkModeTransition;
