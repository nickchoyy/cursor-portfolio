import React, { useRef, useState, useEffect, useCallback } from 'react';

interface InfiniteScrollLoopProps {
  children: React.ReactNode;
  speedMultiplier?: number;
  className?: string;
  externalScrollY?: number;
  onScroll?: (deltaY: number) => void;
  showProgressBar?: boolean;
  cumulativeProgress?: number;
}

export default function InfiniteScrollLoop({ 
  children, 
  speedMultiplier = 1,
  className = "",
  externalScrollY,
  onScroll,
  showProgressBar = false,
  cumulativeProgress = 0
}: InfiniteScrollLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasLooped, setHasLooped] = useState(false);
  const [totalScrollDistance, setTotalScrollDistance] = useState(0);
  const isResettingRef = useRef(false);

  // Initialize scroll position to start (top of first copy)
  useEffect(() => {
    if (!containerRef.current || !contentRef.current || isInitialized) return;
    
    const container = containerRef.current;
    
    // Start at the top of the first copy
    container.scrollTop = 0;
    setScrollY(0);
    setTotalScrollDistance(0);
    setIsInitialized(true);
  }, [isInitialized]);

  // Handle external scroll updates
  useEffect(() => {
    if (externalScrollY === undefined || !containerRef.current || !contentRef.current) return;
    
    const container = containerRef.current;
    const singleCopyHeight = contentRef.current.scrollHeight / 2;
    
    // Use external cumulative progress instead of internal tracking
    if (cumulativeProgress > 0) {
      setTotalScrollDistance(cumulativeProgress);
    }
    
    // Mark as looped when we've scrolled past one full cycle using cumulative progress
    if (cumulativeProgress > singleCopyHeight && !hasLooped) {
      setHasLooped(true);
    }
    
    // Allow both positive and negative scrolling for going back to hero
    const scrollY = externalScrollY * speedMultiplier;
    
    // Handle infinite loop with earlier resets to reduce upward scroll distance
    let finalPosition = scrollY;
    
    // Early reset when scrolling down - don't let user get too deep into second copy
    const earlyResetThreshold = singleCopyHeight * 0.3;
    if (finalPosition > singleCopyHeight + earlyResetThreshold) {
      // Reset to 20% into first copy instead of exact position
      finalPosition = singleCopyHeight * 0.2 + (finalPosition % (singleCopyHeight * 0.3));
    } else if (finalPosition > singleCopyHeight) {
      // Normal modulo reset for positions just past first copy
      finalPosition = finalPosition % singleCopyHeight;
    }
    
    // For upward scrolling, allow negative values to go back to hero
    if (finalPosition < -singleCopyHeight) {
      finalPosition = finalPosition % singleCopyHeight;
    }
    
    if (!isResettingRef.current) {
      isResettingRef.current = true;
      
      // Smoother scroll position updates
      const targetPosition = Math.max(0, finalPosition);
      container.scrollTop = targetPosition;
      setScrollY(targetPosition);
      
      // Use shorter timeout for smoother transitions
      setTimeout(() => {
        isResettingRef.current = false;
      }, 10);
    }
  }, [externalScrollY, speedMultiplier, hasLooped, cumulativeProgress]);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !contentRef.current || isResettingRef.current) return;
    
    const container = containerRef.current;
    const currentScrollTop = container.scrollTop;
    const singleCopyHeight = contentRef.current.scrollHeight / 2;
    
    setScrollY(currentScrollTop);
    
    // Prevent upward scrolling
    if (currentScrollTop < 0) {
      container.scrollTop = 0;
      setScrollY(0);
      return;
    }
    
    // Earlier reset logic - don't let user scroll too deep into second copy
    const earlyResetThreshold = singleCopyHeight * 0.3; // Reset at 30% into second copy instead of 90%
    
    // If we've scrolled past the early threshold (going down)
    if (currentScrollTop > singleCopyHeight + earlyResetThreshold) {
      // Mark as looped when we complete the first full cycle
      if (!hasLooped) setHasLooped(true);
      
      isResettingRef.current = true;
      // Reset to a position closer to the middle (20% into first copy)
      const resetPosition = singleCopyHeight * 0.2;
      container.scrollTop = resetPosition;
      setScrollY(resetPosition);
      setTimeout(() => {
        isResettingRef.current = false;
      }, 10);
      return;
    }
  }, [hasLooped]);

  // Handle wheel events - allow both up and down scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (onScroll) {
      e.preventDefault();
      // Allow both positive and negative deltaY for up/down scrolling
      onScroll(e.deltaY);
      return;
    }
    // If no external control, let native scrolling handle it
  };

  // Touch support - only downward
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || !onScroll) return;
    
    const touchCurrent = e.targetTouches[0].clientY;
    const distance = touchStart - touchCurrent;
    
    // Allow both upward and downward swiping
    if (onScroll) {
      e.preventDefault();
      onScroll(distance * 0.5);
    }
  };

  // Calculate progress using external cumulative progress
  const getProgress = () => {
    if (!contentRef.current) return 0;
    const singleCopyHeight = contentRef.current.scrollHeight / 2;
    
    // Use cumulative progress for accurate progress calculation
    const progress = Math.min(100, (cumulativeProgress / singleCopyHeight) * 100);
    return progress;
  };

  return (
    <div className={className} style={{ position: 'relative', height: '100vh', overflow: 'hidden' }} data-infinite-scroll>
      {/* Top Progress Bar */}
      {showProgressBar && (
        <div 
          className="fixed top-0 left-0 right-0 h-1 bg-muted-foreground/10 z-50"
        >
          <div 
            className={`h-full transition-all duration-500 ease-out ${
              hasLooped 
                ? 'bg-gradient-to-r from-red-300 via-yellow-300 via-green-300 via-blue-300 via-indigo-300 to-purple-300 dark:from-red-400 dark:via-yellow-400 dark:via-green-400 dark:via-blue-400 dark:via-indigo-400 dark:to-purple-400 animate-pulse' 
                : 'bg-foreground dark:bg-foreground'
            }`}
            style={{ 
              width: `${getProgress()}%`,
              transition: 'width 0.1s ease-out, background 0.5s ease-out'
            }}
          />
        </div>
      )}
      
      <div
        ref={containerRef}
        style={{
          height: '100%',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="scrollbar-hide"
        onScroll={handleScroll}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div ref={contentRef} data-content-ref>
          {/* First copy */}
          <div key="copy-1">
            {children}
          </div>
          {/* Second copy for seamless loop */}
          <div key="copy-2">
            {children}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
} 