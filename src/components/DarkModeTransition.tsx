import React, { useEffect, useState } from 'react';

const DarkModeTransition = () => {
  const [themeChangeCount, setThemeChangeCount] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target as HTMLElement;
          // More reliable detection - increment on any class change to html element
          if (target === document.documentElement) {
            setThemeChangeCount(prev => {
              const newCount = prev + 1;
              console.log('Theme change detected, count:', newCount);
              return newCount;
            });
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Store the theme change count in a global variable and dispatch event
  useEffect(() => {
    (window as any).themeChangeCount = themeChangeCount;
    // Always dispatch event when count changes
    if (themeChangeCount > 0) {
      window.dispatchEvent(new CustomEvent('themeChange', { detail: themeChangeCount }));
      console.log('Dispatching themeChange event with count:', themeChangeCount);
    }
  }, [themeChangeCount]);

  return null;
};

export default DarkModeTransition;
