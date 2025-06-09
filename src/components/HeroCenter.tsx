
import React from 'react';

const HeroCenter = () => {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  React.useEffect(() => {
    const handleStorageChange = () => {
      setIsDark(localStorage.getItem('theme') === 'dark');
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for manual theme changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      observer.disconnect();
    };
  }, []);

  const moonAscii = [
    "       ███████       ",
    "     ███████████     ",
    "   ███████████████   ",
    "  █████████████████  ",
    " ███████████████████ ",
    "█████████████████████",
    "█████████████████████",
    "█████████████████████",
    "█████████████████████",
    " ███████████████████ ",
    "  █████████████████  ",
    "   ███████████████   ",
    "     ███████████     ",
    "       ███████       "
  ];

  const sunAscii = [
    "    \\   |   /    ",
    "     \\  |  /     ",
    "  -   ███████   - ",
    " --  ███████████  --",
    "/   ███████████████  \\",
    "|  █████████████████  |",
    "   █████████████████   ",
    "-- █████████████████ --",
    "   █████████████████   ",
    "|  █████████████████  |",
    "\\   ███████████████  /",
    " --  ███████████  --",
    "  -   ███████   - ",
    "     /  |  \\     ",
    "    /   |   \\    "
  ];

  const currentAscii = isDark ? moonAscii : sunAscii;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Dithered 3D ASCII Art */}
      <div className="relative mb-8">
        <div className="font-mono text-xs leading-tight text-center select-none">
          <div className="relative">
            {/* Main ASCII art */}
            <div className="relative z-10">
              {currentAscii.map((line, index) => (
                <div 
                  key={index} 
                  className="whitespace-pre text-foreground/80"
                  style={{
                    filter: 'contrast(1.2)',
                    textShadow: isDark 
                      ? '1px 1px 2px rgba(255, 255, 255, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.5)'
                      : '1px 1px 2px rgba(0, 0, 0, 0.2), -1px -1px 1px rgba(255, 255, 255, 0.8)'
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
            
            {/* Dithered shadow/depth effect */}
            <div className="absolute top-1 left-1 z-0 opacity-30">
              {currentAscii.map((line, index) => (
                <div 
                  key={index} 
                  className="whitespace-pre text-foreground/20"
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
          
          {/* Text around the art */}
          <div className="mt-4 text-xs font-mono text-muted-foreground tracking-[0.2em]">
            AR/AI • DESIGNER • ARTIST • PROTOTYPER
          </div>
        </div>
      </div>

      {/* Central title */}
      <div className="text-center">
        <h1 className="text-2xl font-mono font-medium mb-2">AR/AI designer, artist & prototyper</h1>
        <p className="text-sm font-mono text-muted-foreground">Los Angeles, California</p>
      </div>

      {/* Skills section */}
      <div className="mt-16 text-center max-w-2xl">
        <h2 className="text-sm font-mono font-medium mb-4">Skills</h2>
        <p className="text-xs font-mono text-muted-foreground leading-relaxed">
          Unity, C#, AI, Blender, Lens Studio, JavaScript, p5.js, SparkAR, 
          Lightship ARDK, Oculus SDK, Python, AI, VR, Growth, Design Systems
        </p>
      </div>
    </div>
  );
};

export default HeroCenter;
