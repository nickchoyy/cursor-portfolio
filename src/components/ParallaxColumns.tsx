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
    'Based in Los Angeles, CA',
    'Expert in spatial computing',
    'Design systems architect',
    'User research specialist'
  ];

  const workItems = [
    {
      title: 'Meta Reality Labs',
      subtitle: 'AR Platform Experience',
      description: 'Led AR interface design for next-generation social experiences using Unity and C#',
      year: '2024'
    },
    {
      title: 'PlaybookXR',
      subtitle: 'VR Training Solutions',
      description: 'Designed immersive VR training experiences with AI-powered adaptive learning',
      year: '23-24'
    },
    {
      title: 'Wondr Studio',
      subtitle: 'Design System Architecture',
      description: 'Built comprehensive design systems and visual identity for digital products',
      year: '22-23'
    },
    {
      title: 'Vertiigo',
      subtitle: 'Browser Extension UX',
      description: 'Crafted seamless browser extension interfaces with focus on user workflow',
      year: '21-22'
    },
    {
      title: 'ZOE Health',
      subtitle: 'Growth & User Research',
      description: 'Optimized health app experience through data-driven UX research and testing',
      year: '2021'
    },
    {
      title: 'Kiwi.com',
      subtitle: 'Travel Platform Mobile',
      description: 'Enhanced mobile travel booking experience with growth-focused design strategies',
      year: '20-21'
    }
  ];

  const playgroundItems = [
    {
      title: 'AI Art Generation',
      subtitle: 'Machine Learning Experiments',
      description: 'Exploring generative AI for creating unique digital art pieces and interactive installations',
      tech: 'Python, TensorFlow'
    },
    {
      title: 'WebGL Installations',
      subtitle: 'Interactive 3D Experiences',
      description: 'Building immersive web-based 3D environments using modern WebGL techniques',
      tech: 'Three.js, GLSL'
    },
    {
      title: 'AR Filter Development',
      subtitle: 'Social Media Filters',
      description: 'Creating engaging AR filters for Instagram and Snapchat using Lens Studio',
      tech: 'Lens Studio, SparkAR'
    },
    {
      title: 'Generative Design Tools',
      subtitle: 'Parametric Design Systems',
      description: 'Developing tools for procedural design generation and creative automation',
      tech: 'p5.js, Processing'
    },
    {
      title: 'VR Prototypes',
      subtitle: 'Spatial Computing',
      description: 'Experimenting with new interaction paradigms in virtual reality environments',
      tech: 'Unity, Oculus SDK'
    },
    {
      title: 'Creative Coding',
      subtitle: 'Algorithmic Art',
      description: 'Exploring the intersection of code and creativity through algorithmic art projects',
      tech: 'JavaScript, Canvas'
    }
  ];

  // Parallax calculations - middle column goes faster
  const leftOffset = scrollY * 0.3;
  const centerOffset = scrollY * 0.8;
  const rightOffset = scrollY * 0.3;

  const BentoCard = ({ item, isWork = false, isPlayground = false }: { item: any, isWork?: boolean, isPlayground?: boolean }) => (
    <div className="group cursor-pointer">
      <div className="p-6 bg-background/40 backdrop-blur-md border border-border/20 transition-all duration-500 hover:bg-background/60 hover:border-border/40 hover:shadow-2xl hover:shadow-background/10 hover:-translate-y-2 min-h-[200px] flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-base font-mono font-medium leading-tight group-hover:text-foreground/90 transition-colors">
              {isWork || isPlayground ? item.title : item}
            </h3>
            {isWork && (
              <span className="text-xs font-mono text-muted-foreground ml-4 shrink-0">
                {item.year}
              </span>
            )}
          </div>
          
          {(isWork || isPlayground) && (
            <>
              <p className="text-sm font-mono text-muted-foreground mb-3 leading-relaxed">
                {item.subtitle}
              </p>
              <p className="text-xs font-mono text-muted-foreground/80 leading-relaxed">
                {item.description}
              </p>
              {isPlayground && item.tech && (
                <span className="text-xs font-mono text-muted-foreground/60 mt-3 block">
                  {item.tech}
                </span>
              )}
            </>
          )}
        </div>
        
        <div className="mt-4 w-6 h-px bg-gradient-to-r from-border/40 to-transparent group-hover:from-border/80 transition-colors"></div>
      </div>
    </div>
  );

  const ColumnContent = ({ items, offset, title, isWork = false, isPlayground = false }: { items: any[], offset: number, title: string, isWork?: boolean, isPlayground?: boolean }) => (
    <div className="w-full">
      <div 
        className="space-y-6 will-change-transform"
        style={{ 
          transform: `translateY(-${offset}px)`,
          transition: 'none'
        }}
      >
        {items.map((item, index) => (
          <BentoCard key={index} item={item} isWork={isWork} isPlayground={isPlayground} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Parallax content wrapper - now always visible */}
      <div className="bg-gradient-to-br from-background via-background to-background/95 z-30">
        {/* Sticky header */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/20 z-40">
          <div className="grid grid-cols-3 gap-8 px-8 py-8">
            <div className="text-center">
              <h2 className="text-xl font-mono font-medium tracking-wide">About</h2>
              <div className="w-12 h-px bg-border/40 mx-auto mt-2"></div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-mono font-medium tracking-wide">Work</h2>
              <div className="w-12 h-px bg-border/40 mx-auto mt-2"></div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-mono font-medium tracking-wide">Playground</h2>
              <div className="w-12 h-px bg-border/40 mx-auto mt-2"></div>
            </div>
          </div>
        </div>

        {/* Parallax content */}
        <div className="grid grid-cols-3 gap-8 px-8 py-16 min-h-screen overflow-hidden">
          <ColumnContent items={aboutItems} offset={leftOffset} title="About" />
          <ColumnContent items={workItems} offset={centerOffset} title="Work" isWork={true} />
          <ColumnContent items={playgroundItems} offset={rightOffset} title="Playground" isPlayground={true} />
        </div>
      </div>
    </>
  );
};

export default ParallaxColumns;
