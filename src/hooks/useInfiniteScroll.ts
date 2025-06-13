import { useState, useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number; // Percentage of scroll to trigger duplication (0-1)
  debounceMs?: number; // Debounce time to prevent multiple triggers
}

interface UseInfiniteScrollReturn<T> {
  displayedItems: T[];
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
  totalDuplications: number;
}

export function useInfiniteScroll<T>(
  originalItems: T[],
  options: UseInfiniteScrollOptions = {}
): UseInfiniteScrollReturn<T> {
  const { threshold = 0.8, debounceMs = 100 } = options;
  
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalDuplications, setTotalDuplications] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Initialize with original items
  useEffect(() => {
    setDisplayedItems([...originalItems]);
    setTotalDuplications(0);
  }, [originalItems]);

  // Duplicate items when threshold is reached
  const duplicateItems = useCallback(() => {
    if (isLoading || originalItems.length === 0) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setDisplayedItems(prev => [...prev, ...originalItems]);
      setTotalDuplications(prev => prev + 1);
      setIsLoading(false);
    }, debounceMs);
  }, [originalItems, isLoading, debounceMs]);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    if (scrollPercentage >= threshold) {
      duplicateItems();
    }
  }, [threshold, duplicateItems]);

  // Attach scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return {
    displayedItems,
    scrollContainerRef,
    isLoading,
    totalDuplications
  };
} 