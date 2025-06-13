import React, { useEffect, useState } from 'react';
import ScrambleText from './ScrambleText';
import { experiences } from '../data/experiences';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const InfiniteScrollExperiences = () => {
  const [themeChangeCount, setThemeChangeCount] = useState(0);
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);

  // Use the infinite scroll hook
  const { 
    displayedItems: displayedExperiences, 
    scrollContainerRef, 
    isLoading, 
    totalDuplications 
  } = useInfiniteScroll(experiences, { 
    threshold: 0.8, 
    debounceMs: 150 
  });

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setThemeChangeCount(event.detail);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    return () => window.removeEventListener('themeChange', handleThemeChange as EventListener);
  }, []);

  return (
    <div className="absolute top-6 right-8 w-72">
      {/* Scrollable Experience Container */}
      <div 
        ref={scrollContainerRef}
        className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/40 transition-colors"
        style={{
          scrollbarWidth: 'thin',
        }}
      >
        <div className="space-y-2 pr-2">
          {displayedExperiences.map((exp, index) => (
            <div 
              key={`${exp.company}-${exp.year}-${index}`}
              className={`flex gap-3 text-xs font-mono transition-all duration-300 cursor-pointer group ${
                hoveredExperience === index ? 'text-muted-foreground/50' : ''
              }`}
              onMouseEnter={() => setHoveredExperience(index)}
              onMouseLeave={() => setHoveredExperience(null)}
            >
              <div className="text-muted-foreground min-w-[2.5rem] shrink-0 text-left group-hover:text-foreground transition-colors">
                <ScrambleText text={exp.year} trigger={themeChangeCount} speed="fast" />
              </div>
              <div className="flex-1">
                <div className="font-medium leading-tight group-hover:text-foreground transition-colors">
                  <ScrambleText text={exp.company} trigger={themeChangeCount} speed="medium" />
                </div>
                <div className="text-muted-foreground leading-tight group-hover:text-muted-foreground/80 transition-colors">
                  <ScrambleText text={exp.role} trigger={themeChangeCount} speed="slow" />
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Skills Container */}
      <div className="mt-6">
        <div className="text-xs font-mono leading-relaxed text-muted-foreground">
          <ScrambleText 
            text="Figma, Adobe Creative Suite, Blender, Framer, Oragami, Framer, Design Systems, Python, Prototyping, Marketing, Product Design, Accessibility Design, A/B Testing" 
            trigger={themeChangeCount} 
          />
        </div>
      </div>
    </div>
  );
};

export default InfiniteScrollExperiences; 