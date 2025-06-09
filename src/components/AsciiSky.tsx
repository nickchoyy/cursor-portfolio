
import React, { useEffect, useRef, useState } from 'react';

const AsciiSky = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 400;
    canvas.height = 300;

    let animationFrameId: number;
    let t = 0;
    let rotation = 0;
    let lastTime = 0;

    // Sun variables
    const sunChars = ["@", "*", "#", "=", "~", "-", ".", "+"];
    const rayChars = ["|", "/", "-", "\\"];

    // Moon variables
    const moonChars = ["@", "O", "*", "#", ".", "+", "-", "="];
    const starChars = [".", "+", "*"];
    const starCount = 100;
    const stars: Array<{
      x: number;
      y: number;
      speed: number;
      flickerOffset: number;
      charIndex: number;
    }> = [];

    // Create stars for moon
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
        flickerOffset: Math.random() * Math.PI * 2,
        charIndex: Math.floor(Math.random() * starChars.length),
      });
    }

    const drawSun = (time: number) => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.font = "16px monospace";
      ctx.fillStyle = "#ffcc66";

      // Time delta + rotation
      const deltaTime = time - lastTime;
      lastTime = time;
      rotation += 0.0004 * deltaTime;

      // Move sun horizontally
      const centerX = (time * 0.1) % (width + 200) - 100;
      const centerY = height / 2;

      const sunRadius = Math.min(width, height) * 0.15;

      // Draw concentric rings
      for (let r = sunRadius; r > 0; r -= 16) {
        const circumference = 2 * Math.PI * r;
        const charCount = Math.floor(circumference / 10);
        const char = sunChars[Math.floor((sunRadius - r) / 16) % sunChars.length];

        for (let i = 0; i < charCount; i++) {
          const angle = (i / charCount) * 2 * Math.PI + rotation * 0.5;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          ctx.fillText(char, x, y);
        }
      }

      // Sun core
      ctx.font = "24px monospace";
      ctx.fillText("O", centerX - 8, centerY + 8);

      // FULL circle rays
      const rayCount = 60; // more for full coverage
      const maxRayLength = Math.min(width, height) * 0.4;

      for (let i = 0; i < rayCount; i++) {
        const angle = rotation + (i / rayCount) * 2 * Math.PI;
        const rayLength = maxRayLength * (0.6 + 0.4 * Math.sin(i + rotation));
        const rayChar = rayChars[i % rayChars.length];

        const segments = Math.floor(rayLength / 16);
        for (let j = 0; j < segments; j++) {
          const dist = sunRadius + j * 16;
          const x = centerX + Math.cos(angle) * dist;
          const y = centerY + Math.sin(angle) * dist;

          ctx.globalAlpha = 1 - j / segments;
          ctx.fillText(rayChar, x, y);
        }
      }

      ctx.globalAlpha = 1;

      // Glow dithering
      const ditherCount = 300;
      for (let i = 0; i < ditherCount; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const dist = sunRadius + Math.random() * (maxRayLength * 0.4);
        const x = centerX + Math.cos(angle) * dist;
        const y = centerY + Math.sin(angle) * dist;

        ctx.globalAlpha = 0.3 * (1 - (dist - sunRadius) / (maxRayLength * 0.4));
        ctx.fillText(".", x, y);
      }

      ctx.globalAlpha = 1;
    };

    const drawMoon = (time: number) => {
      t += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "16px monospace";
      ctx.fillStyle = "#cccccc";

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const moonRadius = Math.min(width, height) * 0.18;

      // Stars
      for (const star of stars) {
        const x = star.x * width;
        const y = star.y * height;
        const flicker = 0.5 + 0.5 * Math.sin(time * star.speed + star.flickerOffset);
        ctx.globalAlpha = flicker * 0.6;
        const char = starChars[(star.charIndex + Math.floor(time * 0.001)) % starChars.length];
        ctx.fillText(char, x - 6, y + 4);
      }

      ctx.globalAlpha = 1;

      // Draw crescent moon shape
      for (let r = moonRadius; r > 0; r -= 12) {
        const circumference = 2 * Math.PI * r;
        const charCount = Math.floor(circumference / 8);
        const charIndex = Math.floor((moonRadius - r) / 12) % moonChars.length;
        const char = moonChars[charIndex];

        for (let i = 0; i < charCount; i++) {
          const angle = (i / charCount) * 2 * Math.PI;
          const dx = Math.cos(angle + t * 0.1) * r;
          const dy = Math.sin(angle + t * 0.1) * r;
          
          // Create crescent by only drawing part of the circle
          const normalizedAngle = (angle + t * 0.1) % (2 * Math.PI);
          if (normalizedAngle > Math.PI * 0.3 && normalizedAngle < Math.PI * 1.7) {
            ctx.fillText(char, centerX + dx - 6, centerY + dy + 4);
          }
        }
      }

      // Draw crescent core (partial)
      ctx.font = "20px monospace";
      const coreAngle = t * 0.1;
      if ((coreAngle % (2 * Math.PI)) > Math.PI * 0.3 && (coreAngle % (2 * Math.PI)) < Math.PI * 1.7) {
        ctx.fillText("O", centerX - 8, centerY + 6);
      }

      // Add crater dots only on visible part of crescent
      const craterCount = 40;
      ctx.font = "12px monospace";
      for (let i = 0; i < craterCount; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * moonRadius * 0.8;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Only show craters on visible part
        const normalizedAngle = angle % (2 * Math.PI);
        if (normalizedAngle > Math.PI * 0.3 && normalizedAngle < Math.PI * 1.7) {
          ctx.globalAlpha = 0.2 + Math.random() * 0.2;
          ctx.fillText(".", x - 3, y + 3);
        }
      }
      ctx.globalAlpha = 1;
    };

    const animate = (time: number) => {
      if (isDark) {
        drawMoon(time);
      } else {
        drawSun(time);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className="relative">
      <canvas 
        ref={canvasRef} 
        className="block"
        style={{
          filter: 'contrast(1.2)',
          imageRendering: 'pixelated'
        }}
      />
    </div>
  );
};

export default AsciiSky;
