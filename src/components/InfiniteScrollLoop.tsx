import React, { useRef, useState, useEffect, useCallback } from 'react';

interface InfiniteScrollLoopProps {
  children: React.ReactNode;
  speedMultiplier?: number;
  className?: string;
  externalScrollY?: number;
  onScroll?: (deltaY: number) => void;
  showProgressBar?: boolean;
  cumulativeProgress?: number;
  isParallaxActive?: boolean;
}

export default function InfiniteScrollLoop({ 
  children, 
  speedMultiplier = 1,
  className = "",
  externalScrollY,
  onScroll,
  showProgressBar = false,
  cumulativeProgress = 0,
  isParallaxActive = false
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
    container.scrollTop = 0;
    setScrollY(0);
    setTotalScrollDistance(0);
    setIsInitialized(true);
  }, [isInitialized]);

  // Reset progress when parallax becomes inactive
  useEffect(() => {
    if (!isParallaxActive) {
      setHasLooped(false);
      setTotalScrollDistance(0);
      setScrollY(0);
    }
  }, [isParallaxActive]);

  // Handle external scroll updates with pixel-perfect resets
  useEffect(() => {
    if (!externalScrollY || !containerRef.current || !contentRef.current) return;
    
    const container = containerRef.current;
    const singleCopyHeight = contentRef.current.scrollHeight / 2;
    
    // Use external cumulative progress
    if (cumulativeProgress > 0) {
      setTotalScrollDistance(cumulativeProgress);
    }
    
    // Apply smooth momentum to scroll updates
    const smoothMultiplier = 0.8;
    const newScrollY = externalScrollY * speedMultiplier * smoothMultiplier;
    
    // Handle infinite loop with pixel-perfect resets
    let finalPosition = newScrollY;
    
    // If we've scrolled past the first copy
    if (finalPosition > singleCopyHeight) {
      if (!hasLooped) {
        setHasLooped(true);
      }
      // Pixel-perfect reset by exactly one copy's height
      finalPosition = finalPosition - singleCopyHeight;
    }
    
    // Reset hasLooped when scrolling back up to beginning
    if (finalPosition <= 10 && hasLooped) {
      setHasLooped(false);
    }
    
    // For upward scrolling, allow negative values to go back to hero
    if (finalPosition < -singleCopyHeight) {
      finalPosition = finalPosition % singleCopyHeight;
    }
    
    if (!isResettingRef.current) {
      isResettingRef.current = true;
      
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        const targetPosition = Math.max(0, finalPosition);
        container.scrollTop = targetPosition;
        setScrollY(targetPosition);
        
        // Reset the flag after a short delay
        setTimeout(() => {
          isResettingRef.current = false;
        }, 16); // One frame at 60fps
      });
    }
  }, [externalScrollY, speedMultiplier, hasLooped, cumulativeProgress]);

  // Handle scroll events with pixel-perfect resets
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
    
    // If we've scrolled past the first copy
    if (currentScrollTop > singleCopyHeight) {
      if (!hasLooped) setHasLooped(true);
      
      isResettingRef.current = true;
      // Pixel-perfect reset by exactly one copy's height
      container.scrollTop = currentScrollTop - singleCopyHeight;
      setScrollY(currentScrollTop - singleCopyHeight);
      setTimeout(() => {
        isResettingRef.current = false;
      }, 16);
      return;
    }
  }, [hasLooped]);

  // Handle wheel events
  const handleWheel = (e: React.WheelEvent) => {
    if (onScroll) {
      e.preventDefault();
      onScroll(e.deltaY);
      return;
    }
  };

  // Touch support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const lastTouchYRef = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
    lastTouchYRef.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || !onScroll) return;
    
    const touchCurrent = e.targetTouches[0].clientY;
    const distance = lastTouchYRef.current - touchCurrent;
    lastTouchYRef.current = touchCurrent;
    
    if (onScroll) {
      e.preventDefault();
      onScroll(distance);
    }
  };

  // Calculate progress with pixel-perfect transitions
  const getProgress = () => {
    if (!contentRef.current || !isParallaxActive) return 0;
    const singleCopyHeight = contentRef.current.scrollHeight / 2;
    
    const currentPosition = Math.max(0, externalScrollY || scrollY);
    
    // If we're at the very top, return 0%
    if (currentPosition <= 10) {
      return 0;
    }
    
    // If we've looped, stay at 100%
    if (hasLooped) {
      return 100;
    }
    
    // Calculate progress based on position within the first copy
    // This ensures 0% at start of first copy and 100% at start of second copy
    const progress = Math.min(100, (currentPosition / singleCopyHeight) * 100);
    
    // Ensure we don't go below 0% or above 100%
    return Math.max(0, Math.min(100, progress));
  };

  return (
    <div className={className} style={{ position: 'relative', height: '100vh', overflow: 'hidden' }} data-infinite-scroll>
      {showProgressBar && isParallaxActive && (
        <div 
          className="fixed top-0 left-0 right-0 h-1 bg-muted-foreground/10 z-50"
        >
          <div 
            className={`h-full transition-all duration-300 ease-out ${
              hasLooped 
                ? 'bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 via-indigo-400 to-purple-400 animate-pulse' 
                : 'bg-black dark:bg-white'
            }`}
            style={{ 
              width: `${getProgress()}%`,
              transition: 'width 0.1s ease-out, background 0.3s ease-out'
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
          scrollBehavior: 'auto',
        }}
        className="scrollbar-hide"
        onScroll={handleScroll}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div ref={contentRef} data-content-ref>
          <div key="copy-1" style={{ minHeight: '100vh' }}>
            {children}
          </div>
          <div key="copy-2" style={{ minHeight: '100vh' }}>
            {children}
          </div>
        </div>
      </div>
      
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
} 