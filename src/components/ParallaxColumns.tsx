import React, { useEffect, useState, useRef, useCallback } from 'react';
import ScrambleText from './ScrambleText';
import AboutSection from './AboutSection';
import ColumnContent from './ColumnContent';
import InfiniteScrollLoop from './InfiniteScrollLoop';
import { aboutItems } from '../data/aboutItems';
import { workItems } from '../data/workItems';
import { playgroundItems } from '../data/playgroundItems';

const ParallaxColumns = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentHeightRef = useRef<number>(2000); // Default fallback
  
  const [isParallaxActive, setIsParallaxActive] = useState(false);
  const [themeChangeCount, setThemeChangeCount] = useState(0);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [masterScrollY, setMasterScrollY] = useState(0);
  const [cumulativeProgress, setCumulativeProgress] = useState(0); // Separate progress tracking

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setThemeChangeCount(event.detail);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    return () => window.removeEventListener('themeChange', handleThemeChange as EventListener);
  }, []);

  // Activate Parallax Mode When Header Hits Top
  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      const top = headerRef.current.getBoundingClientRect().top;
      setIsParallaxActive(top <= 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update content height reference when parallax becomes active
  useEffect(() => {
    if (isParallaxActive) {
      // Get content height from any of the infinite scroll components
      const infiniteScrollElements = document.querySelectorAll('[data-infinite-scroll]');
      if (infiniteScrollElements.length > 0) {
        const firstElement = infiniteScrollElements[0] as HTMLElement;
        const contentElement = firstElement.querySelector('[data-content-ref]') as HTMLElement;
        if (contentElement) {
          contentHeightRef.current = contentElement.scrollHeight / 2; // Half because content is duplicated
        }
      }
    }
  }, [isParallaxActive]);

  // Intersection Observer for scroll highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newVisibleItems = new Set<string>();
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            newVisibleItems.add(entry.target.id);
          }
        });
        setVisibleItems(newVisibleItems);
      },
      {
        threshold: [0.3, 0.7],
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    const cards = document.querySelectorAll('[data-card-id]');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Master scroll handler for synchronized Work and Playground scrolling
  const handleMasterScroll = useCallback((deltaY: number) => {
    // Update cumulative progress (never resets)
    setCumulativeProgress(prev => Math.max(0, prev + (deltaY * 0.8)));
    
    setMasterScrollY(prev => {
      const newValue = prev + (deltaY * 0.8);
      
      // Use dynamic content height for early reset logic
      const contentHeight = contentHeightRef.current;
      const earlyResetThreshold = contentHeight * 0.3; // 30% into second copy
      
      // If we've scrolled too far down, reset the master scroll value early
      if (newValue > contentHeight + earlyResetThreshold) {
        // Reset to 20% into first copy equivalent - this drastically reduces upward scroll time
        return contentHeight * 0.2;
      }
      
      return newValue;
    });
  }, []);

  // Global wheel event handler for synchronized scrolling when parallax is active
  useEffect(() => {
    if (!isParallaxActive) return;

    const handleGlobalWheel = (e: WheelEvent) => {
      // If scrolling up and we're at the beginning of the loop, allow going back to hero
      if (e.deltaY < 0 && masterScrollY <= 0) {
        // Don't prevent default - let normal page scroll take over to go back to hero
        return;
      }
      
      // For all other cases (scrolling down, or scrolling up when not at beginning),
      // handle the scroll in the infinite loop system
      e.preventDefault();
      handleMasterScroll(e.deltaY);
    };

    window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleGlobalWheel);
  }, [isParallaxActive, handleMasterScroll, masterScrollY]);

  return (
    <>
      <div ref={containerRef} className="bg-gradient-to-br from-background via-background to-background/95 z-30">
        <div ref={headerRef} className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/20 z-40">
          <div className="grid grid-cols-3 gap-2 px-6 py-6">
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-mono font-medium tracking-wide">
                  <ScrambleText text="About" trigger={themeChangeCount} speed="fast" />
                </h2>
                {isParallaxActive && (
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-muted-foreground/50 rounded-full"></div>
                    <span className="text-xs text-muted-foreground/60 font-mono">Static</span>
                  </div>
                )}
              </div>
              <div className="w-8 h-px bg-border/40 mt-2"></div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-mono font-medium tracking-wide">
                  <ScrambleText text="Work" trigger={themeChangeCount} speed="medium" />
                </h2>
                {isParallaxActive && (
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-blue-500/50 rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground/60 font-mono">∞ 1.0x</span>
                  </div>
                )}
              </div>
              <div className="w-8 h-px bg-border/40 mt-2"></div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-mono font-medium tracking-wide">
                  <ScrambleText text="Playground" trigger={themeChangeCount} speed="slow" />
                </h2>
                {isParallaxActive && (
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground/60 font-mono">∞ 1.0x</span>
                  </div>
                )}
              </div>
              <div className="w-8 h-px bg-border/40 mt-2"></div>
            </div>
          </div>
        </div>

        {/* Conditional rendering: Normal or Infinite loop */}
        {!isParallaxActive ? (
          // Static content before header hits top - use same padding as parallax mode
          <div className="grid grid-cols-3 gap-2 px-6 pt-20 pb-8">
            <AboutSection 
              items={aboutItems} 
              offset={0} 
              hoveredItem={hoveredItem}
              visibleItems={visibleItems}
              setHoveredItem={setHoveredItem}
              themeChangeCount={themeChangeCount}
            />
            <ColumnContent 
              items={workItems} 
              offset={0} 
              title="Work" 
              isWork={true}
              hoveredItem={hoveredItem}
              visibleItems={visibleItems}
              setHoveredItem={setHoveredItem}
              themeChangeCount={themeChangeCount}
            />
            <ColumnContent 
              items={playgroundItems} 
              offset={0} 
              title="Playground" 
              isPlayground={true}
              hoveredItem={hoveredItem}
              visibleItems={visibleItems}
              setHoveredItem={setHoveredItem}
              themeChangeCount={themeChangeCount}
            />
          </div>
        ) : (
          // Mixed layout: Static About + Synchronized scroll Work/Playground
          <div className="grid grid-cols-3 gap-2 px-6 h-screen" data-parallax-container>
            {/* Left Column - About (Static, no scrolling) */}
            <div className="pt-20 pb-8 overflow-y-auto scrollbar-hide">
              <div className="space-y-8">
                <AboutSection 
                  items={aboutItems} 
                  offset={0} 
                  hoveredItem={hoveredItem}
                  visibleItems={visibleItems}
                  setHoveredItem={setHoveredItem}
                  themeChangeCount={themeChangeCount}
                />
              </div>
            </div>

            {/* Center Column - Work (Synchronized with Playground) */}
            <InfiniteScrollLoop 
              speedMultiplier={1.0} 
              className="pt-20 pb-8"
              externalScrollY={masterScrollY}
              cumulativeProgress={cumulativeProgress}
              showProgressBar={true}
            >
              <div className="space-y-8">
                <ColumnContent 
                  items={workItems} 
                  offset={0} 
                  title="Work" 
                  isWork={true}
                  hoveredItem={hoveredItem}
                  visibleItems={visibleItems}
                  setHoveredItem={setHoveredItem}
                  themeChangeCount={themeChangeCount}
                />
              </div>
            </InfiniteScrollLoop>

            {/* Right Column - Playground (Synchronized with Work) */}
            <InfiniteScrollLoop 
              speedMultiplier={1.0} 
              className="pt-20 pb-8"
              externalScrollY={masterScrollY}
              cumulativeProgress={cumulativeProgress}
            >
              <div className="space-y-8">
                <ColumnContent 
                  items={playgroundItems} 
                  offset={0} 
                  title="Playground" 
                  isPlayground={true}
                  hoveredItem={hoveredItem}
                  visibleItems={visibleItems}
                  setHoveredItem={setHoveredItem}
                  themeChangeCount={themeChangeCount}
                />
              </div>
            </InfiniteScrollLoop>
          </div>
        )}
      </div>
    </>
  );
};

export default ParallaxColumns;
