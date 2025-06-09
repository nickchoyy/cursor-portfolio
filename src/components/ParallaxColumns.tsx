import React, { useEffect, useState, useRef } from 'react';
import { Progress } from './ui/progress';

const ParallaxColumns = () => {
  const [scrollY, setScrollY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(0);
  const rafId = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame((timestamp) => {
        const currentScrollY = window.scrollY;
        const deltaY = currentScrollY - lastScrollY.current;
        const deltaTime = timestamp - lastTimestamp.current;
        
        if (deltaTime > 0) {
          const currentVelocity = deltaY / deltaTime;
          setVelocity(currentVelocity * 1000); // Convert to pixels per second
        }
        
        setScrollY(currentScrollY);
        lastScrollY.current = currentScrollY;
        lastTimestamp.current = timestamp;
      });
    };

    // Add smooth scroll behavior to html
    document.documentElement.style.scrollBehavior = 'smooth';
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const aboutItems = [
    {
      title: 'Profile',
      image: '/lovable-uploads/cf4e7fa2-b04a-4d24-927f-0ca3815a7e77.png',
      description: "I'm a multidisciplinary designer with a background in cognitive science, data, and visual storytelling. My journey blends human behavior, aesthetics, and code—shaping interfaces that are not just usable, but intuitive and expressive.",
      isProfile: true
    },
    {
      title: 'Focus',
      description: 'I focus on interaction design, accessibility, and systems thinking—crafting digital experiences that feel as natural as they are powerful. Whether it\'s building real-time apps or design systems, I love making the complex feel simple.'
    },
    {
      title: 'Approach',
      description: 'Curious by default, fast by choice. I prototype early, test obsessively, and refine through feedback. My process is collaborative, data-aware, and driven by empathy—always centered on the real people behind the pixels.'
    }
  ];

  const workItems = [
    {
      title: 'Meta Reality Labs',
      subtitle: 'AR Platform',
      description: 'AR interface design for social experiences',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
    },
    {
      title: 'PlaybookXR',
      subtitle: 'VR Training',
      description: 'Immersive training with AI learning',
      year: '23-24',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop'
    },
    {
      title: 'Wondr Studio',
      subtitle: 'Design Systems',
      description: 'Design systems for digital products',
      year: '22-23',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop'
    },
    {
      title: 'Vertiigo',
      subtitle: 'Extension UX',
      description: 'Browser extension experiences',
      year: '21-22',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=280&fit=crop'
    },
    {
      title: 'Spatial Computing',
      subtitle: 'Mixed Reality',
      description: 'Next-gen spatial interfaces',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
    },
    {
      title: 'Neural Networks',
      subtitle: 'AI Research',
      description: 'Human-AI interaction patterns',
      year: '23-24',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=280&fit=crop'
    },
    {
      title: 'Quantum Interfaces',
      subtitle: 'Future Computing',
      description: 'Quantum computing visualization',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop'
    },
    {
      title: 'BioTech Dashboard',
      subtitle: 'Medical Interface',
      description: 'Biotechnology data visualization',
      year: '2022',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop'
    }
  ];

  const playgroundItems = [
    {
      title: 'AI Art Generation',
      subtitle: 'ML Experiments',
      description: 'Generative AI art and installations',
      tech: 'Python, TensorFlow',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop'
    },
    {
      title: 'WebGL Installations',
      subtitle: '3D Experiences',
      description: 'Immersive web 3D environments',
      tech: 'Three.js, GLSL',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop'
    },
    {
      title: 'AR Filter Development',
      subtitle: 'Social Filters',
      description: 'Instagram and Snapchat AR filters',
      tech: 'Lens Studio, SparkAR',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=350&fit=crop'
    },
    {
      title: 'Generative Art',
      subtitle: 'Creative Coding',
      description: 'Algorithmic art and coding',
      tech: 'p5.js, Processing',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=320&fit=crop'
    },
    {
      title: 'Neural Style Transfer',
      subtitle: 'AI Art',
      description: 'Style transfer using deep learning',
      tech: 'PyTorch, OpenCV',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=280&fit=crop'
    },
    {
      title: 'Interactive Particles',
      subtitle: 'Physics Sim',
      description: 'Real-time particle systems',
      tech: 'JavaScript, Canvas',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop'
    },
    {
      title: 'VR Sculpting',
      subtitle: 'Spatial Art',
      description: 'Virtual reality art creation',
      tech: 'Unity, C#',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop'
    },
    {
      title: 'Audio Visualization',
      subtitle: 'Sound Design',
      description: 'Real-time audio reactive visuals',
      tech: 'Web Audio API',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=320&fit=crop'
    }
  ];

  const baseScrollThreshold = 200;
  const adjustedScrollY = Math.max(0, scrollY - baseScrollThreshold);
  
  // Add velocity-based easing to parallax offsets
  const velocityDamping = Math.min(Math.abs(velocity) / 100, 1);
  const leftOffset = adjustedScrollY * (0.2 + velocityDamping * 0.1);
  const centerOffset = adjustedScrollY * (0.5 + velocityDamping * 0.15);
  const rightOffset = adjustedScrollY * (0.2 + velocityDamping * 0.1);

  // Calculate progress with smoother interpolation
  const parallaxSectionHeight = 4000;
  const rawProgress = (adjustedScrollY / parallaxSectionHeight) * 100;
  const progressValue = Math.min(100, Math.max(0, rawProgress));

  const BentoCard = ({ item, isWork = false, isPlayground = false }: { item: any, isWork?: boolean, isPlayground?: boolean }) => (
    <div className={`group cursor-pointer transition-opacity duration-300 ${isWork || isPlayground ? 'opacity-85 hover:opacity-100' : 'opacity-70 hover:opacity-100'}`}>
      <div className="bg-background/40 backdrop-blur-md border border-border/20 transition-all duration-300 hover:bg-background/60 hover:border-border/40 overflow-hidden">
        {item.image && !item.isProfile && (
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
        
        {item.isProfile && (
          <div className="aspect-square overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              loading="eager"
              decoding="async"
              style={{ imageRendering: 'auto' }}
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xs font-mono font-medium leading-tight group-hover:text-foreground/90 transition-colors">
              {item.title}
            </h3>
            {isWork && (
              <span className="text-xs font-mono text-muted-foreground ml-4 shrink-0">
                {item.year}
              </span>
            )}
          </div>
          
          {(isWork || isPlayground) && item.subtitle && (
            <p className="text-xs font-mono text-muted-foreground mb-3 leading-relaxed">
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

  const AboutSection = ({ items, offset }: { items: any[], offset: number }) => (
    <div className="w-full">
      <div 
        className="group cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300 will-change-transform"
        style={{ 
          transform: `translateY(-${offset}px)`,
          transition: 'opacity 0.3s ease'
        }}
      >
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="bg-background/40 backdrop-blur-md border border-border/20 transition-all duration-300 group-hover:bg-background/60 group-hover:border-border/40 overflow-hidden">
              {item.isProfile && (
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    loading="eager"
                    decoding="async"
                    style={{ imageRendering: 'auto' }}
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xs font-mono font-medium leading-tight group-hover:text-foreground/90 transition-colors">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-xs font-mono text-muted-foreground/80 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="mt-4 w-6 h-px bg-gradient-to-r from-border/40 to-transparent group-hover:from-border/80 transition-colors"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ColumnContent = ({ items, offset, title, isWork = false, isPlayground = false }: { items: any[], offset: number, title: string, isWork?: boolean, isPlayground?: boolean }) => (
    <div className="w-full">
      <div 
        className="space-y-4 will-change-transform"
        style={{ 
          transform: `translateY(-${offset}px)`
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
        {/* Smooth progress bar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Progress 
            value={progressValue} 
            className="h-1 rounded-none bg-background/20 transition-all duration-150 ease-out" 
          />
        </div>

        <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/20 z-40">
          <div className="grid grid-cols-3 gap-2 px-6 py-6">
            <div className="text-left">
              <h2 className="text-xs font-mono font-medium tracking-wide">About</h2>
              <div className="w-8 h-px bg-border/40 mt-2"></div>
            </div>
            <div className="text-left">
              <h2 className="text-xs font-mono font-medium tracking-wide">Work</h2>
              <div className="w-8 h-px bg-border/40 mt-2"></div>
            </div>
            <div className="text-left">
              <h2 className="text-xs font-mono font-medium tracking-wide">Playground</h2>
              <div className="w-8 h-px bg-border/40 mt-2"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 px-6 py-8 min-h-screen overflow-hidden">
          <AboutSection items={aboutItems} offset={leftOffset} />
          <ColumnContent items={workItems} offset={centerOffset} title="Work" isWork={true} />
          <ColumnContent items={playgroundItems} offset={rightOffset} title="Playground" isPlayground={true} />
        </div>
      </div>
    </>
  );
};

export default ParallaxColumns;
