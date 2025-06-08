
import React, { useEffect, useState, useRef } from 'react';

const ParallaxColumns = () => {
  const [scrollY, setScrollY] = useState(0);
  const [rainbowUnlocked, setRainbowUnlocked] = useState(false);
  const loopHeightRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set initial loop height
    loopHeightRef.current = window.innerHeight * 3; // Approximate height of one loop
  }, []);

  useEffect(() => {
    const handleInfiniteScroll = () => {
      const scrollTop = window.scrollY;
      const loopHeight = loopHeightRef.current;

      // Loop logic - when we scroll past one loop, reset to beginning
      if (scrollTop >= loopHeight && loopHeight > 0) {
        window.scrollTo(0, scrollTop - loopHeight);
        setRainbowUnlocked(true);
      }
    };

    window.addEventListener('scroll', handleInfiniteScroll);
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
  const loopHeight = loopHeightRef.current;
  const progress = loopHeight > 0 ? ((scrollY % loopHeight) / loopHeight) * 100 : 0;

  // Parallax calculations for different column speeds
  const leftOffset = scrollY * 0.3;
  const centerOffset = scrollY * 0.8;
  const rightOffset = scrollY * 0.3;

  const ColumnContent = ({ items, offset, title }: { items: string[], offset: number, title: string }) => (
    <div className="w-full">
      <div 
        className="space-y-8 will-change-transform"
        style={{ 
          transform: `translateY(-${offset}px)`,
          transition: 'none'
        }}
      >
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div 
            key={index}
            className="p-6 border border-border transition-all duration-300 hover:border-foreground/30 min-h-[104px] flex items-center cursor-pointer"
          >
            <p className="text-sm font-mono leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Progress bar - only show when parallax is active */}
      {showParallax && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1">
          <div 
            className={`h-full transition-all duration-200 ${
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
        {/* Sticky header */}
        <div className="sticky top-1 bg-background border-b border-border z-40 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-8 px-8 py-6">
            <div className="text-center">
              <h2 className="text-lg font-mono font-medium">About</h2>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-mono font-medium">Work</h2>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-mono font-medium">Playground</h2>
            </div>
          </div>
        </div>

        {/* Infinite scrolling parallax content */}
        <div className="scroll-wrapper">
          {/* First loop */}
          <div className="loop grid grid-cols-3 gap-8 px-8 py-16 min-h-screen overflow-hidden">
            <ColumnContent items={aboutItems} offset={leftOffset} title="About" />
            <ColumnContent items={workItems} offset={centerOffset} title="Work" />
            <ColumnContent items={playgroundItems} offset={rightOffset} title="Playground" />
          </div>
          
          {/* Second loop (clone) */}
          <div className="loop grid grid-cols-3 gap-8 px-8 py-16 min-h-screen overflow-hidden">
            <ColumnContent items={aboutItems} offset={leftOffset} title="About" />
            <ColumnContent items={workItems} offset={centerOffset} title="Work" />
            <ColumnContent items={playgroundItems} offset={rightOffset} title="Playground" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ParallaxColumns;
