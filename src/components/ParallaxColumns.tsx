
import React, { useEffect, useState, useRef } from 'react';
import { Progress } from './ui/progress';
import HackerText from './HackerText';
import AboutSection from './AboutSection';
import ColumnContent from './ColumnContent';
import { aboutItems } from '../data/aboutItems';
import { workItems } from '../data/workItems';
import { playgroundItems } from '../data/playgroundItems';

const ParallaxColumns = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerAtTop, setHeaderAtTop] = useState(false);
  const [parallaxStartY, setParallaxStartY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [themeChangeCount, setThemeChangeCount] = useState(0);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setThemeChangeCount(event.detail);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    return () => window.removeEventListener('themeChange', handleThemeChange as EventListener);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        const isAtTop = headerRect.top <= 0;
        
        if (isAtTop && !headerAtTop) {
          setParallaxStartY(currentScrollY);
        }
        
        setHeaderAtTop(isAtTop);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerAtTop]);

  // Progress calculation
  useEffect(() => {
    if (!headerAtTop || !containerRef.current) {
      setProgress(0);
      return;
    }

    const parallaxScroll = Math.max(0, scrollY - parallaxStartY);
    const containerHeight = containerRef.current.scrollHeight;
    const viewportHeight = window.innerHeight;
    const totalScrollableHeight = containerHeight - viewportHeight;
    
    const rawProgress = Math.max(0, Math.min(100, (parallaxScroll / totalScrollableHeight) * 100));
    setProgress(rawProgress);
  }, [scrollY, headerAtTop, parallaxStartY]);

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

  // Smooth parallax offsets without physics
  const parallaxScroll = headerAtTop ? Math.max(0, scrollY - parallaxStartY) : 0;
  const leftOffset = parallaxScroll * 0.3;
  const centerOffset = parallaxScroll * 0.1;
  const rightOffset = parallaxScroll * 0.3;

  return (
    <>
      <div ref={containerRef} className="bg-gradient-to-br from-background via-background to-background/95 z-30">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Progress 
            value={progress} 
            className="h-1 rounded-none bg-background/20" 
          />
        </div>

        <div ref={headerRef} className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/20 z-40">
          <div className="grid grid-cols-3 gap-2 px-6 py-6">
            <div className="text-left">
              <h2 className="text-xs font-mono font-medium tracking-wide">
                <HackerText text="About" trigger={themeChangeCount} />
              </h2>
              <div className="w-8 h-px bg-border/40 mt-2"></div>
            </div>
            <div className="text-left">
              <h2 className="text-xs font-mono font-medium tracking-wide">
                <HackerText text="Work" trigger={themeChangeCount} />
              </h2>
              <div className="w-8 h-px bg-border/40 mt-2"></div>
            </div>
            <div className="text-left">
              <h2 className="text-xs font-mono font-medium tracking-wide">
                <HackerText text="Playground" trigger={themeChangeCount} />
              </h2>
              <div className="w-8 h-px bg-border/40 mt-2"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 px-6 py-8 pb-0">
          <AboutSection 
            items={aboutItems} 
            offset={leftOffset} 
            hoveredItem={hoveredItem}
            visibleItems={visibleItems}
            setHoveredItem={setHoveredItem}
            themeChangeCount={themeChangeCount}
          />
          <ColumnContent 
            items={workItems} 
            offset={centerOffset} 
            title="Work" 
            isWork={true}
            hoveredItem={hoveredItem}
            visibleItems={visibleItems}
            setHoveredItem={setHoveredItem}
            themeChangeCount={themeChangeCount}
          />
          <ColumnContent 
            items={playgroundItems} 
            offset={rightOffset} 
            title="Playground" 
            isPlayground={true}
            hoveredItem={hoveredItem}
            visibleItems={visibleItems}
            setHoveredItem={setHoveredItem}
            themeChangeCount={themeChangeCount}
          />
        </div>
      </div>
    </>
  );
};

export default ParallaxColumns;
