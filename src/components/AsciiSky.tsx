
import React, { useEffect, useRef, useState } from 'react';

const CHAR_MAP = ' .:-=+*#%@'; // Low to high brightness

const AsciiSky = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ascii, setAscii] = useState('');
  const [isDark, setIsDark] = useState(() => {
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

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const width = 80;
    const height = 30;
    canvas.width = width;
    canvas.height = height;

    let t = 0;
    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.02;

      let asciiStr = '';

      // Draw glowing sun or moon
      for (let y = 0; y < height; y++) {
        let row = '';
        for (let x = 0; x < width; x++) {
          const dx = x - width / 2;
          const dy = y - height / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let brightness;

          if (isDark) {
            // Moon: cratered look with subtle pulsing
            const noise = Math.sin(x * 0.4 + t * 2) * Math.sin(y * 0.3 + t * 1.5) * 0.2;
            const craters = Math.sin(x * 0.8) * Math.sin(y * 0.6) * 0.1;
            const pulse = Math.sin(t * 3) * 0.05;
            brightness = Math.max(0, (1 - dist / 12) * 0.8 + noise + craters + pulse);
          } else {
            // Sun: glowing pulsating core with rays
            const pulse = Math.sin(t * 4) * 0.1;
            const rays = Math.sin(Math.atan2(dy, dx) * 8 + t * 2) * 0.15;
            brightness = Math.max(0, (1 - dist / (10 + pulse * 3)) + rays * (1 - dist / 15));
          }

          const charIndex = Math.floor(brightness * (CHAR_MAP.length - 1));
          const char = CHAR_MAP[Math.max(0, Math.min(charIndex, CHAR_MAP.length - 1))];
          row += char;
        }
        asciiStr += row + (y < height - 1 ? '\n' : '');
      }

      setAscii(asciiStr);
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isDark]);

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="hidden" />
      <div 
        className="font-mono text-xs leading-tight text-center select-none whitespace-pre"
        style={{
          filter: 'contrast(1.2)',
          textShadow: isDark 
            ? '1px 1px 2px rgba(255, 255, 255, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.5)'
            : '1px 1px 2px rgba(0, 0, 0, 0.2), -1px -1px 1px rgba(255, 255, 255, 0.8)'
        }}
      >
        {ascii}
      </div>
    </div>
  );
};

export default AsciiSky;
