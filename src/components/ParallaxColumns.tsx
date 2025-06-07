
import React, { useEffect, useState } from 'react';

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
    'Based in Los Angeles, CA'
  ];

  const workItems = [
    'Meta Reality Labs - AR Platform',
    'PlaybookXR - VR Training Solutions',
    'Wondr - Design System Architecture',
    'Vertiigo - Browser Extension UX',
    'ZOE - Health App Growth',
    'Kiwi.com - Travel Platform',
    'Undout - Brand Identity',
    'Zero - Mobile Experience'
  ];

  const playgroundItems = [
    'AI-Generated Art Experiments',
    'WebGL Interactive Installations',
    'AR Filter Development',
    'Generative Design Tools',
    'VR Prototypes',
    'Creative Coding Projects',
    'Machine Learning Models',
    'Digital Art Pieces'
  ];

  // Calculate transforms for parallax effect
  const leftTransform = `translateY(${scrollY * 0.1}px)`;
  const centerTransform = `translateY(${scrollY * 0.05}px)`;
  const rightTransform = `translateY(${scrollY * 0.1}px)`;

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <div className="sticky top-0 bg-background border-b border-border z-40">
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

      {/* Parallax content */}
      <div className="grid grid-cols-3 gap-8 px-8 py-16">
        {/* Left column - About */}
        <div 
          className="space-y-8"
          style={{ transform: leftTransform }}
        >
          {aboutItems.map((item, index) => (
            <div 
              key={index}
              className="p-6 border border-border transition-all duration-300 hover:border-foreground/30"
            >
              <p className="text-sm font-mono leading-relaxed">{item}</p>
            </div>
          ))}
          <div className="h-96"></div> {/* Spacer for scrolling */}
        </div>

        {/* Center column - Work */}
        <div 
          className="space-y-8"
          style={{ transform: centerTransform }}
        >
          {workItems.map((item, index) => (
            <div 
              key={index}
              className="p-6 border border-border transition-all duration-300 hover:border-foreground/30 cursor-pointer"
            >
              <p className="text-sm font-mono leading-relaxed">{item}</p>
            </div>
          ))}
          <div className="h-96"></div> {/* Spacer for scrolling */}
        </div>

        {/* Right column - Playground */}
        <div 
          className="space-y-8"
          style={{ transform: rightTransform }}
        >
          {playgroundItems.map((item, index) => (
            <div 
              key={index}
              className="p-6 border border-border transition-all duration-300 hover:border-foreground/30 cursor-pointer"
            >
              <p className="text-sm font-mono leading-relaxed">{item}</p>
            </div>
          ))}
          <div className="h-96"></div> {/* Spacer for scrolling */}
        </div>
      </div>
    </div>
  );
};

export default ParallaxColumns;
