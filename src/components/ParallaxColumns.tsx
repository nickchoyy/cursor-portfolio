import React, { useEffect, useState } from 'react';

const ParallaxColumns = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const aboutItems = [
    {
      title: 'Profile',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=500&fit=crop',
      description: 'AR/AI Designer with 8+ years experience in immersive experiences and creative technology'
    },
    {
      title: 'Skills',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      description: 'Unity, C#, AI, Blender, Lens Studio, JavaScript, p5.js, SparkAR, Lightship ARDK'
    },
    {
      title: 'Background',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=350&fit=crop',
      description: 'Focused on creating meaningful digital experiences through emerging technologies'
    }
  ];

  const workItems = [
    {
      title: 'Meta Reality Labs',
      subtitle: 'AR Platform Experience',
      description: 'Led AR interface design for next-generation social experiences using Unity and C#',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
    },
    {
      title: 'PlaybookXR',
      subtitle: 'VR Training Solutions',
      description: 'Designed immersive VR training experiences with AI-powered adaptive learning',
      year: '23-24',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop'
    },
    {
      title: 'Wondr Studio',
      subtitle: 'Design System Architecture',
      description: 'Built comprehensive design systems and visual identity for digital products',
      year: '22-23',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop'
    },
    {
      title: 'Vertiigo',
      subtitle: 'Extension UX & Web',
      description: 'Designed user experiences for browser extensions and web applications',
      year: '21-22',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=280&fit=crop'
    }
  ];

  const playgroundItems = [
    {
      title: 'AI Art Generation',
      subtitle: 'Machine Learning Experiments',
      description: 'Exploring generative AI for creating unique digital art pieces and interactive installations',
      tech: 'Python, TensorFlow',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop'
    },
    {
      title: 'WebGL Installations',
      subtitle: 'Interactive 3D Experiences',
      description: 'Building immersive web-based 3D environments using modern WebGL techniques',
      tech: 'Three.js, GLSL',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop'
    },
    {
      title: 'AR Filter Development',
      subtitle: 'Social Media Filters',
      description: 'Creating engaging AR filters for Instagram and Snapchat using Lens Studio',
      tech: 'Lens Studio, SparkAR',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=350&fit=crop'
    },
    {
      title: 'Generative Art',
      subtitle: 'Creative Coding',
      description: 'Experimental digital art using algorithmic approaches and creative coding techniques',
      tech: 'p5.js, Processing',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=320&fit=crop'
    }
  ];

  // Adjusted parallax calculations - ensure titles reach top before content starts scrolling
  const baseScrollThreshold = 200; // Reduced to allow projects to peek earlier
  const adjustedScrollY = Math.max(0, scrollY - baseScrollThreshold);
  
  const leftOffset = adjustedScrollY * 0.2;
  const centerOffset = adjustedScrollY * 0.5;
  const rightOffset = adjustedScrollY * 0.2;

  const BentoCard = ({ item, isWork = false, isPlayground = false }: { item: any, isWork?: boolean, isPlayground?: boolean }) => (
    <div className="group cursor-pointer">
      <div className="bg-background/40 backdrop-blur-md border border-border/20 transition-all duration-500 hover:bg-background/60 hover:border-border/40 hover:shadow-2xl hover:shadow-background/10 hover:-translate-y-2 overflow-hidden">
        {item.image && (
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-base font-mono font-medium leading-tight group-hover:text-foreground/90 transition-colors">
              {item.title}
            </h3>
            {isWork && (
              <span className="text-xs font-mono text-muted-foreground ml-4 shrink-0">
                {item.year}
              </span>
            )}
          </div>
          
          {(isWork || isPlayground) && item.subtitle && (
            <p className="text-sm font-mono text-muted-foreground mb-3 leading-relaxed">
              {item.subtitle}
            </p>
          )}
          
          <p className="text-xs font-mono text-muted-foreground/80 leading-relaxed">
            {item.description}
          </p>
          
          {isPlayground && item.tech && (
            <span className="text-xs font-mono text-muted-foreground/60 mt-3 block">
              {item.tech}
            </span>
          )}
          
          <div className="mt-4 w-6 h-px bg-gradient-to-r from-border/40 to-transparent group-hover:from-border/80 transition-colors"></div>
        </div>
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
      <div className="bg-gradient-to-br from-background via-background to-background/95 z-30">
        <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/20 z-40">
          <div className="grid grid-cols-3 gap-4 px-8 py-8">
            <div className="text-left">
              <h2 className="text-sm font-mono font-medium tracking-wide">About</h2>
              <div className="w-8 h-px bg-border/40 mt-2"></div>
            </div>
            <div className="text-left">
              <h2 className="text-sm font-mono font-medium tracking-wide">Work</h2>
              <div className="w-8 h-px bg-border/40 mt-2"></div>
            </div>
            <div className="text-left">
              <h2 className="text-sm font-mono font-medium tracking-wide">Playground</h2>
              <div className="w-8 h-px bg-border/40 mt-2"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 px-8 py-16 min-h-screen overflow-hidden">
          <ColumnContent items={aboutItems} offset={leftOffset} title="About" />
          <ColumnContent items={workItems} offset={centerOffset} title="Work" isWork={true} />
          <ColumnContent items={playgroundItems} offset={rightOffset} title="Playground" isPlayground={true} />
        </div>
      </div>
    </>
  );
};

export default ParallaxColumns;
