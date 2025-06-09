import React, { useEffect, useState, useRef } from 'react';
import { Progress } from './ui/progress';

const ParallaxColumns = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerAtTop, setHeaderAtTop] = useState(false);
  const [parallaxStartY, setParallaxStartY] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Check if header is at top of viewport
      if (headerRef.current) {
        const headerRect = headerRef.current.getBoundingClientRect();
        const isAtTop = headerRect.top <= 0;
        
        // Capture the scroll position when header first reaches top
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

  // Progress calculation aligned to parallax section start and end
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
    },
    {
      title: 'Autonomous Vehicles',
      subtitle: 'Car Interface',
      description: 'Self-driving car UI/UX design',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop'
    },
    {
      title: 'Smart City Platform',
      subtitle: 'Urban Tech',
      description: 'IoT city management systems',
      year: '23-24',
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=400&h=280&fit=crop'
    },
    {
      title: 'Blockchain Analytics',
      subtitle: 'Crypto Interface',
      description: 'DeFi protocol visualization',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop'
    },
    {
      title: 'Climate Monitoring',
      subtitle: 'Environmental',
      description: 'Climate data visualization tools',
      year: '22-23',
      image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=250&fit=crop'
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
    },
    {
      title: 'Holographic Displays',
      subtitle: 'Future Tech',
      description: 'Hologram interface prototypes',
      tech: 'Unity, Hololens',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
    },
    {
      title: 'Brain-Computer Interface',
      subtitle: 'Neurotechnology',
      description: 'Mind-controlled interfaces',
      tech: 'EEG, Python',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=280&fit=crop'
    },
    {
      title: 'Gesture Recognition',
      subtitle: 'Computer Vision',
      description: 'Hand tracking for interfaces',
      tech: 'OpenCV, MediaPipe',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop'
    },
    {
      title: 'Digital Twins',
      subtitle: 'IoT Visualization',
      description: 'Real-time 3D city models',
      tech: 'Three.js, IoT',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=320&fit=crop'
    }
  ];

  // Direct parallax offsets without physics
  const parallaxScroll = headerAtTop ? Math.max(0, scrollY - parallaxStartY) : 0;
  const leftOffset = parallaxScroll * 0.6;
  const centerOffset = parallaxScroll * 0.2;
  const rightOffset = parallaxScroll * 0.6;

  const BentoCard = ({ item, isWork = false, isPlayground = false }: { item: any, isWork?: boolean, isPlayground?: boolean }) => (
    <div className={`group cursor-pointer transition-all duration-300 ${isWork || isPlayground ? 'opacity-80 hover:opacity-100' : 'opacity-60 hover:opacity-100'} hover:scale-[1.02]`}>
      <div className="bg-background/40 backdrop-blur-md border border-border/20 transition-all duration-300 group-hover:bg-background/80 group-hover:border-primary/20 overflow-hidden">
        {item.image && !item.isProfile && (
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
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
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
              loading="eager"
              decoding="async"
              style={{ imageRendering: 'auto' }}
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xs font-mono font-medium leading-tight group-hover:text-primary transition-colors duration-300">
              {item.title}
            </h3>
            {isWork && (
              <span className="text-xs font-mono text-muted-foreground ml-4 shrink-0 group-hover:text-primary/70 transition-colors duration-300">
                {item.year}
              </span>
            )}
          </div>
          
          {(isWork || isPlayground) && item.subtitle && (
            <p className="text-xs font-mono text-muted-foreground mb-3 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
              {item.subtitle}
            </p>
          )}
          
          <p className="text-xs font-mono text-muted-foreground/80 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
            {item.description}
          </p>
          
          {isPlayground && item.tech && (
            <span className="text-xs font-mono text-muted-foreground/60 mt-3 block group-hover:text-primary/60 transition-colors duration-300">
              {item.tech}
            </span>
          )}
          
          <div className="mt-4 w-6 h-px bg-gradient-to-r from-border/40 to-transparent group-hover:from-primary/60 group-hover:w-12 transition-all duration-300"></div>
        </div>
      </div>
    </div>
  );

  const AboutSection = ({ items, offset }: { items: any[], offset: number }) => (
    <div className="w-full">
      <div 
        className="group cursor-pointer opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-[1.01]"
        style={{ 
          transform: `translateY(-${offset}px)`
        }}
      >
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="bg-background/40 backdrop-blur-md border border-border/20 transition-all duration-300 group-hover:bg-background/80 group-hover:border-primary/40 group-hover:shadow-xl overflow-hidden">
              {item.isProfile && (
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                    style={{ imageRendering: 'auto' }}
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xs font-mono font-medium leading-tight group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-xs font-mono text-muted-foreground/80 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                  {item.description}
                </p>
                
                <div className="mt-4 w-6 h-px bg-gradient-to-r from-border/40 to-transparent group-hover:from-primary/60 group-hover:w-12 transition-all duration-300"></div>
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
        className="space-y-4"
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
      <div ref={containerRef} className="bg-gradient-to-br from-background via-background to-background/95 z-30">
        {/* Progress bar aligned to parallax section */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Progress 
            value={progress} 
            className="h-1 rounded-none bg-background/20" 
          />
        </div>

        <div ref={headerRef} className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/20 z-40">
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
