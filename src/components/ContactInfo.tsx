
import React, { useState, useEffect } from 'react';
import HackerText from './HackerText';

const ContactInfo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [themeChangeCount, setThemeChangeCount] = useState(0);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      console.log('ContactInfo received theme change:', event.detail);
      setThemeChangeCount(event.detail);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    return () => window.removeEventListener('themeChange', handleThemeChange as EventListener);
  }, []);

  return (
    <div className="absolute top-8 left-8 z-50">
      <div className="text-sm font-mono">
        <div className="mb-1">
          <HackerText text="nickchoy@berkeley.edu" trigger={themeChangeCount > 0} />
        </div>
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="text-muted-foreground text-xs cursor-pointer">
            <HackerText text="@nickchoy+" trigger={themeChangeCount > 0} />
          </span>
          
          <div className={`absolute top-full left-0 mt-1 transition-all duration-200 ${
            isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
            <div className="bg-background/90 backdrop-blur-md border border-border/20 rounded-md p-2 shadow-lg">
              <div className="space-y-1">
                <a 
                  href="#" 
                  className="block text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-background/50"
                >
                  <HackerText text="Resume" trigger={themeChangeCount > 0} />
                </a>
                <a 
                  href="#" 
                  className="block text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-background/50"
                >
                  <HackerText text="Twitter" trigger={themeChangeCount > 0} />
                </a>
                <a 
                  href="#" 
                  className="block text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-background/50"
                >
                  <HackerText text="LinkedIn" trigger={themeChangeCount > 0} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
