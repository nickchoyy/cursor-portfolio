import React, { useEffect, useState, useRef } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  opacity: number;
  char: string;
  size: number;
}

interface FallingStar {
  id: number;
  x: number;
  y: number;
  opacity: number;
  char: string;
  size: number;
  speed: number;
}

const AsciiCursor = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [fallingStars, setFallingStars] = useState<FallingStar[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isParallaxActive, setIsParallaxActive] = useState(false);
  const starIdRef = useRef(0);
  const fallingStarIdRef = useRef(0);
  const lastMoveTime = useRef(0);

  const starChars = ['*', '✦', '✧', '⋆', '∘', '•', '◦', '·'];
  const maxStars = 12;

  // Listen for parallax activation
  useEffect(() => {
    const handleScroll = () => {
      const parallaxHeader = document.querySelector('[data-parallax-header]');
      if (parallaxHeader) {
        const top = parallaxHeader.getBoundingClientRect().top;
        setIsParallaxActive(top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Don't create cursor stars when parallax is active
      if (isParallaxActive) return;
      
      const now = Date.now();
      
      // Throttle star creation to avoid too many stars
      if (now - lastMoveTime.current > 50) {
        setMousePos({ x: e.clientX, y: e.clientY });
        
        // Create new star at cursor position with reduced opacity
        const newStar: Star = {
          id: starIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          opacity: 0.4, // Reduced from 1 to 0.4 for less brightness
          char: starChars[Math.floor(Math.random() * starChars.length)],
          size: 12 + Math.random() * 8, // 12-20px
        };

        setStars(prev => [...prev.slice(-maxStars + 1), newStar]);
        lastMoveTime.current = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isParallaxActive]);

  // Click handler for falling stars
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't create falling stars when parallax is active
      if (isParallaxActive) return;
      
      // Create falling star from top of screen
      const newFallingStar: FallingStar = {
        id: fallingStarIdRef.current++,
        x: Math.random() * window.innerWidth,
        y: -50, // Start above screen
        opacity: 0.8,
        char: starChars[Math.floor(Math.random() * starChars.length)],
        size: 16 + Math.random() * 12, // 16-28px for falling stars
        speed: 2 + Math.random() * 3, // 2-5px per frame
      };

      setFallingStars(prev => [...prev, newFallingStar]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isParallaxActive]);

  // Animate and fade out cursor stars
  useEffect(() => {
    const interval = setInterval(() => {
      setStars(prev => 
        prev
          .map(star => ({
            ...star,
            opacity: star.opacity - 0.06, // Slower fade for less brightness
            y: star.y + 0.5, // Changed to downward drift (positive y)
          }))
          .filter(star => star.opacity > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Animate falling stars
  useEffect(() => {
    const interval = setInterval(() => {
      setFallingStars(prev => 
        prev
          .map(star => ({
            ...star,
            y: star.y + star.speed,
            opacity: star.y > window.innerHeight * 0.7 ? star.opacity - 0.02 : star.opacity,
          }))
          .filter(star => star.y < window.innerHeight + 50 && star.opacity > 0)
      );
    }, 16); // ~60fps for smooth falling animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ mixBlendMode: 'difference' }}>
      {/* Cursor trail stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute font-mono font-bold text-white"
          style={{
            left: star.x - star.size / 2,
            top: star.y - star.size / 2,
            fontSize: `${star.size}px`,
            opacity: star.opacity,
            transition: 'opacity 0.1s ease-out',
            textShadow: '0 0 4px currentColor, 0 0 8px currentColor, 0 0 12px currentColor', // Enhanced glow with multiple layers
          }}
        >
          {star.char}
        </div>
      ))}
      
      {/* Falling stars */}
      {fallingStars.map(star => (
        <div
          key={`falling-${star.id}`}
          className="absolute font-mono font-bold text-white"
          style={{
            left: star.x - star.size / 2,
            top: star.y - star.size / 2,
            fontSize: `${star.size}px`,
            opacity: star.opacity,
            textShadow: '0 0 6px currentColor',
            transform: 'rotate(25deg)', // Slight rotation for falling effect
          }}
        >
          {star.char}
        </div>
      ))}
    </div>
  );
};

export default AsciiCursor; 