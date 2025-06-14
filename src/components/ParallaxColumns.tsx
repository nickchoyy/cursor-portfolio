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

  // Master scroll handler for synchronized Work and Playground scrolling with smooth momentum
  const handleMasterScroll = useCallback((deltaY: number) => {
    // Apply smooth momentum to scroll updates
    const smoothMultiplier = 0.6; // Reduced from 0.8 for smoother feel
    
    // Update cumulative progress (never resets)
    setCumulativeProgress(prev => Math.max(0, prev + (deltaY * smoothMultiplier)));
    
    setMasterScrollY(prev => {
      const newValue = prev + (deltaY * smoothMultiplier);
      
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
        <div ref={headerRef} className="sticky top-0 bg-background/90 backdrop-blur-sm border-b border-border/10 z-40" data-parallax-header>
          <div className="grid grid-cols-3 gap-2 px-8 py-6">
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-mono font-medium tracking-wide">
                  About
                </h2>
              </div>
              <div className="w-8 h-px bg-border/40 mt-2"></div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-mono font-medium tracking-wide">
                  Work
                </h2>
              </div>
              <div className="w-8 h-px bg-border/40 mt-2"></div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-mono font-medium tracking-wide">
                  Playground
                </h2>
              </div>
              <div className="w-8 h-px bg-border/40 mt-2"></div>
            </div>
          </div>
        </div>

        {/* Conditional rendering: Normal or Infinite loop */}
        {/* Content layout with consistent spacing to prevent jumping */}
        <div className="grid grid-cols-3 gap-2 px-8" data-parallax-container>
          {!isParallaxActive ? (
            <>
              {/* Static content before header hits top - consistent spacing */}
              <div className="pt-20 pb-0">
                <AboutSection 
                  items={aboutItems} 
                  offset={0} 
                  hoveredItem={hoveredItem}
                  visibleItems={visibleItems}
                  setHoveredItem={setHoveredItem}
                  themeChangeCount={0}
                />
              </div>
              <div className="pt-20 pb-0">
                <ColumnContent 
                  items={workItems} 
                  offset={0} 
                  title="Work" 
                  isWork={true}
                  hoveredItem={hoveredItem}
                  visibleItems={visibleItems}
                  setHoveredItem={setHoveredItem}
                  themeChangeCount={0}
                />
              </div>
              <div className="pt-20 pb-0">
                <ColumnContent 
                  items={playgroundItems} 
                  offset={0} 
                  title="Playground" 
                  isPlayground={true}
                  hoveredItem={hoveredItem}
                  visibleItems={visibleItems}
                  setHoveredItem={setHoveredItem}
                  themeChangeCount={0}
                />
              </div>
            </>
          ) : (
            <>
              {/* Parallax mode - header is sticky, content needs clearance */}
              {/* Left Column - About (Static, no scrolling) */}
              <div className="pt-20 pb-0 h-screen overflow-y-auto scrollbar-hide">
                <div className="space-y-8">
                  <AboutSection 
                    items={aboutItems} 
                    offset={0} 
                    hoveredItem={hoveredItem}
                    visibleItems={visibleItems}
                    setHoveredItem={setHoveredItem}
                    themeChangeCount={0}
                  />
                </div>
              </div>

              {/* Center Column - Work (Synchronized with Playground) */}
              <InfiniteScrollLoop 
                speedMultiplier={1.0} 
                className="pt-20 pb-0 h-screen"
                externalScrollY={masterScrollY}
                cumulativeProgress={cumulativeProgress}
                showProgressBar={true}
                isParallaxActive={isParallaxActive}
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
                    themeChangeCount={0}
                  />
                </div>
              </InfiniteScrollLoop>

              {/* Right Column - Playground (Synchronized with Work) */}
              <InfiniteScrollLoop 
                speedMultiplier={1.0} 
                className="pt-20 pb-0 h-screen"
                externalScrollY={masterScrollY}
                cumulativeProgress={cumulativeProgress}
                isParallaxActive={isParallaxActive}
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
                    themeChangeCount={0}
                  />
                </div>
              </InfiniteScrollLoop>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ParallaxColumns;
