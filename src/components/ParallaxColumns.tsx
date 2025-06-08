
import React, { useEffect, useState } from 'react';
import { Progress } from './ui/progress';

const ParallaxColumns = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Show parallax section earlier
  const showParallax = scrollY > window.innerHeight * 0.3;
  
  // Calculate progress through the page
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = Math.min((scrollY / maxScroll) * 100, 100);
  
  // When we reach 80% scroll, enable infinite mode (rainbow progress)
  const isInfiniteMode = scrollProgress >= 80;

  // Enhanced parallax calculations for true infinite scrolling
  const leftOffset = (scrollY * 0.4) % (aboutItems.length * 120);
  const centerOffset = (scrollY * 1.2) % (workItems.length * 120);
  const rightOffset = (scrollY * 0.4) % (playgroundItems.length * 120);

  // Create multiple duplicated arrays for seamless infinite scroll
  const duplicatedAbout = [...aboutItems, ...aboutItems, ...aboutItems, ...aboutItems];
  const duplicatedWork = [...workItems, ...workItems, ...workItems, ...workItems];
  const duplicatedPlayground = [...playgroundItems, ...playgroundItems, ...playgroundItems, ...playgroundItems];

  return (
    <>
      {/* Progress bar - only show when parallax is active */}
      {showParallax && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1">
          <Progress 
            value={scrollProgress} 
            className={`h-full transition-all duration-300 ${
              isInfiniteMode 
                ? 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500' 
                : ''
            }`}
          />
        </div>
      )}

      {/* Overlay to hide contact/experience when parallax is active */}
      <div 
        className={`fixed inset-0 bg-background z-20 transition-opacity duration-700 ${
          showParallax ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      
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
        <div className="grid grid-cols-3 gap-8 px-8 py-16 h-screen overflow-hidden">
          {/* Left column - About (slower) */}
          <div 
            className="space-y-8 will-change-transform"
            style={{ 
              transform: `translateY(-${leftOffset}px)`,
              transition: 'none'
            }}
          >
            {duplicatedAbout.map((item, index) => (
              <div 
                key={index}
                className="p-6 border border-border transition-all duration-300 hover:border-foreground/30 min-h-[104px] flex items-center"
              >
                <p className="text-sm font-mono leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Center column - Work (fastest) */}
          <div 
            className="space-y-8 will-change-transform"
            style={{ 
              transform: `translateY(-${centerOffset}px)`,
              transition: 'none'
            }}
          >
            {duplicatedWork.map((item, index) => (
              <div 
                key={index}
                className="p-6 border border-border transition-all duration-300 hover:border-foreground/30 cursor-pointer min-h-[104px] flex items-center"
              >
                <p className="text-sm font-mono leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Right column - Playground (slower) */}
          <div 
            className="space-y-8 will-change-transform"
            style={{ 
              transform: `translateY(-${rightOffset}px)`,
              transition: 'none'
            }}
          >
            {duplicatedPlayground.map((item, index) => (
              <div 
                key={index}
                className="p-6 border border-border transition-all duration-300 hover:border-foreground/30 cursor-pointer min-h-[104px] flex items-center"
              >
                <p className="text-sm font-mono leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ParallaxColumns;
