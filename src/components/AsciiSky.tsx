
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
    const moonChars = ["o", "O", "*", "#", " ", ".", "+", "-", "="];
    const starChars = [".", "+", "*"];
    const starCount = 60;
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      charIndex: number;
      flickerOffset: number;
    }> = [];

    // Create twinkling stars for moon
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random(),
        speed: 0.002 + Math.random() * 0.003,
        charIndex: Math.floor(Math.random() * starChars.length),
        flickerOffset: Math.random() * Math.PI * 2,
      });
    }

    const drawSun = (time: number) => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.font = "12px monospace";
      ctx.fillStyle = isDark ? "#cccccc" : "#ffcc66";

      // Time delta + rotation angle
      const deltaTime = time - lastTime;
      lastTime = time;
      rotation += 0.0005 * deltaTime;

      // Move center along x-axis (looping back)
      const centerX = (time * 0.1) % (width + 200) - 100;
      const centerY = height / 2;

      const sunRadius = Math.min(width, height) * 0.15;

      // Draw concentric ASCII rings
      for (let r = sunRadius; r > 0; r -= 12) {
        const circumference = 2 * Math.PI * r;
        const charCount = Math.floor(circumference / 8);
        const char = sunChars[Math.floor((sunRadius - r) / 12) % sunChars.length];

        for (let i = 0; i < charCount; i++) {
          const angle = (i / charCount) * 2 * Math.PI + rotation * 0.5;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          ctx.fillText(char, x - 6, y + 4);
        }
      }

      // Sun core
      ctx.font = "16px monospace";
      ctx.fillText("O", centerX - 8, centerY + 6);

      // Rotating rays
      const rayCount = 24;
      const maxRayLength = Math.min(width, height) * 0.4;

      for (let i = 0; i < rayCount; i++) {
        const angle = rotation + (i / rayCount) * 2 * Math.PI;
        const rayLength = maxRayLength * (0.5 + 0.5 * Math.sin(i * 0.5));
        const rayChar = rayChars[Math.floor(time / 500 + i) % rayChars.length];

        const raySegments = Math.floor(rayLength / 12);
        for (let j = 0; j < raySegments; j++) {
          const distance = sunRadius + j * 12;
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          ctx.globalAlpha = 1 - j / raySegments;
          ctx.fillText(rayChar, x - 6, y + 4);
        }
      }

      ctx.globalAlpha = 1;

      // Dithering glow around sun
      const ditherCount = 200;
      for (let i = 0; i < ditherCount; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const distance = sunRadius + Math.random() * (maxRayLength * 0.4);
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        ctx.globalAlpha = 0.3 * (1 - (distance - sunRadius) / (maxRayLength * 0.4));
        ctx.fillText(".", x - 3, y + 3);
      }

      ctx.globalAlpha = 1;
    };

    const drawMoon = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#cccccc";
      t += 0.01;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const moonRadius = Math.min(canvas.width, canvas.height) * 0.18;

      // Draw twinkling stars
      ctx.font = "12px monospace";
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const x = star.x * canvas.width;
        const y = star.y * canvas.height;
        const flicker = 0.5 + 0.5 * Math.sin(time * star.speed + star.flickerOffset);
        ctx.globalAlpha = flicker * 0.6;
        const char = starChars[(star.charIndex + Math.floor(time * 0.001)) % starChars.length];
        ctx.fillText(char, x - 6, y + 4);
      }

      ctx.globalAlpha = 1;

      // Draw cratered moon in rings
      for (let r = moonRadius; r > 0; r -= 12) {
        const circumference = 2 * Math.PI * r;
        const charCount = Math.floor(circumference / 8);
        const charIndex = Math.floor((moonRadius - r) / 12) % moonChars.length;
        const char = moonChars[charIndex];

        for (let i = 0; i < charCount; i++) {
          const angle = (i / charCount) * 2 * Math.PI;
          const dx = Math.cos(angle + t * 0.1) * r;
          const dy = Math.sin(angle + t * 0.1) * r;
          ctx.fillText(char, centerX + dx - 6, centerY + dy + 4);
        }
      }

      // Draw moon core
      ctx.font = "16px monospace";
      ctx.fillText("O", centerX - 8, centerY + 6);

      // Add crater dots
      const craterCount = 40;
      ctx.font = "12px monospace";
      for (let i = 0; i < craterCount; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * moonRadius * 0.8;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        ctx.globalAlpha = 0.2 + Math.random() * 0.2;
        ctx.fillText(".", x - 3, y + 3);
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
