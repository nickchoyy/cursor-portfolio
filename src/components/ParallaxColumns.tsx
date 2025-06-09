
import React, { useEffect, useState, useRef } from 'react';

const ParallaxColumns = () => {
  const [scrollY, setScrollY] = useState(0);
  const [rainbowUnlocked, setRainbowUnlocked] = useState(false);
  const loopHeightRef = useRef(0);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Calculate loop height after component mounts
    const calculateLoopHeight = () => {
      if (scrollWrapperRef.current) {
        const firstLoop = scrollWrapperRef.current.querySelector('.loop');
        if (firstLoop) {
          loopHeightRef.current = firstLoop.clientHeight;
        }
      }
    };

    calculateLoopHeight();
    window.addEventListener('resize', calculateLoopHeight);
    return () => window.removeEventListener('resize', calculateLoopHeight);
  }, []);

  useEffect(() => {
    const handleInfiniteScroll = () => {
      const scrollTop = window.scrollY;
      const loopHeight = loopHeightRef.current;
      const heroHeight = window.innerHeight;

      // Only apply infinite scroll logic when in parallax section
      if (scrollTop > heroHeight * 0.7 && loopHeight > 0) {
        const parallaxScrollTop = scrollTop - (heroHeight * 0.7);
        
        // When we scroll past one loop, reset to beginning smoothly
        if (parallaxScrollTop >= loopHeight) {
          const resetPosition = (heroHeight * 0.7) + (parallaxScrollTop - loopHeight);
          window.scrollTo(0, resetPosition);
          setRainbowUnlocked(true);
        }
      }
    };

    window.addEventListener('scroll', handleInfiniteScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, []);

  const aboutItems = [
    'AR/AI Designer with 8+ years experience',
    'Specialized in immersive experiences',
    'Unity & C# development',
    'Creative technologist',
    'Based in Los Angeles, CA',
    'Expert in spatial computing',
    'Design systems architect',
    'User research specialist'
  ];

  const workItems = [
    'Meta Reality Labs - AR Platform',
    'PlaybookXR - VR Training Solutions', 
    'Wondr - Design System Architecture',
    'Vertiigo - Browser Extension UX',
    'ZOE - Health App Growth',
    'Kiwi.com - Travel Platform',
    'Undout - Brand Identity',
    'Zero - Mobile Experience',
    'Rigup - Workforce Platform',
    'Avocode - Design Tools',
    'Avast - Security Products',
    'DevCompany - Digital Solutions'
  ];

  const playgroundItems = [
    'AI-Generated Art Experiments',
    'WebGL Interactive Installations',
    'AR Filter Development',
    'Generative Design Tools',
    'VR Prototypes',
    'Creative Coding Projects',
    'Machine Learning Models',
    'Digital Art Pieces',
    'Experimental Interfaces',
    'Motion Graphics',
    'Interactive Visualizations',
    'Parametric Design'
  ];

  // Show parallax section when scrolled past hero
  const showParallax = scrollY > window.innerHeight * 0.7;
  
  // Calculate progress within the current loop
  const heroHeight = window.innerHeight * 0.7;
  const parallaxScrollTop = Math.max(0, scrollY - heroHeight);
  const loopHeight = loopHeightRef.current;
  const progress = loopHeight > 0 ? ((parallaxScrollTop % loopHeight) / loopHeight) * 100 : 0;

  const ColumnContent = ({ items, title }: { items: string[], title: string }) => (
    <div className="w-full space-y-8">
      {items.map((item, index) => (
        <div 
          key={index}
          className="p-6 border border-border transition-all duration-300 hover:border-foreground/30 min-h-[104px] flex items-center cursor-pointer"
        >
          <p className="text-sm font-mono leading-relaxed">{item}</p>
        </div>
      ))}
    </div>
  );

  const LoopSection = () => (
    <div className="loop min-h-screen">
      {/* Welcome Section */}
      <div className="h-screen flex items-center justify-center bg-background border-b border-border">
        <div className="grid grid-cols-3 gap-8 px-8 w-full max-w-7xl">
          <div className="text-center">
            <h2 className="text-2xl font-mono font-medium mb-8">About</h2>
            <ColumnContent items={aboutItems.slice(0, 3)} title="About" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-mono font-medium mb-8">Work</h2>
            <ColumnContent items={workItems.slice(0, 3)} title="Work" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-mono font-medium mb-8">Playground</h2>
            <ColumnContent items={playgroundItems.slice(0, 3)} title="Playground" />
          </div>
        </div>
      </div>

      {/* Scroll More Section */}
      <div className="h-screen flex items-center justify-center bg-background border-b border-border">
        <div className="grid grid-cols-3 gap-8 px-8 w-full max-w-7xl">
          <div className="text-center">
            <ColumnContent items={aboutItems.slice(3, 6)} title="About" />
          </div>
          <div className="text-center">
            <ColumnContent items={workItems.slice(3, 6)} title="Work" />
          </div>
          <div className="text-center">
            <ColumnContent items={playgroundItems.slice(3, 6)} title="Playground" />
          </div>
        </div>
      </div>

      {/* You Made It Section */}
      <div className="h-screen flex items-center justify-center bg-background border-b border-border">
        <div className="grid grid-cols-3 gap-8 px-8 w-full max-w-7xl">
          <div className="text-center">
            <ColumnContent items={aboutItems.slice(6)} title="About" />
          </div>
          <div className="text-center">
            <ColumnContent items={workItems.slice(6)} title="Work" />
          </div>
          <div className="text-center">
            <ColumnContent items={playgroundItems.slice(6)} title="Playground" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Progress bar - only show when parallax is active */}
      {showParallax && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
          <div 
            className={`h-full transition-all duration-200 ease-out ${
              rainbowUnlocked 
                ? 'bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-violet-500' 
                : 'bg-foreground'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Parallax content wrapper */}
      <div 
        className={`fixed inset-0 bg-background z-30 transition-all duration-700 ease-out ${
          showParallax ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Infinite scrolling content */}
        <div ref={scrollWrapperRef} className="scroll-wrapper h-full overflow-hidden">
          {/* First loop */}
          <LoopSection />
          
          {/* Second loop (identical copy) */}
          <LoopSection />
        </div>
      </div>

      {/* Extended height for scrolling */}
      <div className="h-[800vh]"></div>
    </>
  );
};

export default ParallaxColumns;
