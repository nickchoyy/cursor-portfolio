
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

    // Set canvas dimensions to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;
    let startTime: number | null = null;
    const rotationPeriod = 12000; // 12 seconds for a full rotation

    // Star variables for moon
    const starChars = [".", "+", "*"];
    const starCount = 200;
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      charIndex: number;
      flickerOffset: number;
    }> = [];

    // Cloud variables
    const cloudCount = 8;
    const clouds: Array<{
      x: number;
      y: number;
      speed: number;
      size: number;
      opacity: number;
    }> = [];

    // Create twinkling stars
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

    // Create clouds
    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.7 + canvas.height * 0.1, // Keep clouds in upper portion
        speed: 0.2 + Math.random() * 0.5,
        size: 0.8 + Math.random() * 0.4,
        opacity: 0.3 + Math.random() * 0.4,
      });
    }

    // Function to draw a character at a specific angle and distance from center
    const drawCharAtPolar = (
      char: string,
      angle: number,
      distance: number,
      centerX: number,
      centerY: number,
      fontSize = 16,
    ) => {
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      ctx.fillText(char, x - fontSize / 4, y + fontSize / 4);
    };

    // Function to draw a single cloud
    const drawCloud = (x: number, y: number, size: number, opacity: number) => {
      ctx.globalAlpha = opacity;
      ctx.font = `${12 * size}px monospace`;
      
      // Cloud shape using ASCII characters
      const cloudLines = [
        "    .--.    ",
        " .-(    )-.  ",
        "(___.__)___) "
      ];
      
      for (let i = 0; i < cloudLines.length; i++) {
        ctx.fillText(cloudLines[i], x, y + i * 12 * size);
      }
    };

    const drawSun = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Calculate rotation angle
      const rotationAngle = ((elapsed % rotationPeriod) / rotationPeriod) * 2 * Math.PI;
      const coreRotationAngle = ((elapsed % (rotationPeriod / 3)) / (rotationPeriod / 3)) * 2 * Math.PI; // Core spins faster

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#000000"; // Black sun

      // Calculate center of canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // ASCII characters for different densities
      const sunCoreChars = ["@", "O", "0", "*", "=", "+"];
      const rayChars = ["|", "/", "-", "\\"];

      // Draw sun core with separate rotation
      const sunRadius = Math.min(canvas.width, canvas.height) * 0.15;

      // Draw concentric rings for sun core with core rotation
      for (let r = 0; r < sunRadius; r += 16) {
        const ringRadius = sunRadius - r;
        const circumference = 2 * Math.PI * ringRadius;
        const charCount = Math.max(8, Math.floor(circumference / 12));
        const char = sunCoreChars[Math.min(Math.floor(r / 16), sunCoreChars.length - 1)];

        ctx.font = `${16 - (r / sunRadius) * 4}px monospace`;

        for (let i = 0; i < charCount; i++) {
          const angle = (i / charCount) * 2 * Math.PI + coreRotationAngle; // Add core rotation
          drawCharAtPolar(char, angle, ringRadius, centerX, centerY);
        }
      }

      // Draw sun center with rotation
      ctx.font = "24px monospace";
      const centerChar = sunCoreChars[Math.floor((coreRotationAngle / (Math.PI / 4)) % sunCoreChars.length)];
      ctx.fillText(centerChar, centerX - 8, centerY + 8);

      // Draw rotating rays with balanced opacity
      const rayCount = 24;
      const maxRayLength = Math.min(canvas.width, canvas.height) * 0.4;

      ctx.font = "16px monospace";

      // Draw multiple layers of rays
      for (let layer = 0; layer < 3; layer++) {
        const layerOffset = layer * ((2 * Math.PI) / 3);

        for (let i = 0; i < rayCount; i++) {
          const rayAngle = rotationAngle + layerOffset + (i / rayCount) * 2 * Math.PI;
          const rayLength = maxRayLength * (0.6 + 0.4 * Math.sin(i * 0.5));
          const rayCharIndex = Math.floor(((rayAngle + Math.PI / 4) % (2 * Math.PI)) / (Math.PI / 2)) % 4;
          const rayChar = rayChars[rayCharIndex];

          const raySegments = Math.floor(rayLength / 16);
          for (let j = 0; j < raySegments; j++) {
            const distance = sunRadius + j * 16;
            // Balanced opacity - remove the uneven fading
            ctx.globalAlpha = Math.max(0.3, 1 - j / raySegments);
            drawCharAtPolar(rayChar, rayAngle, distance, centerX, centerY);
          }
        }
      }

      ctx.globalAlpha = 1;

      // Add dithering around sun for glow effect
      const ditherCount = 300;
      for (let i = 0; i < ditherCount; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const distance = sunRadius + Math.random() * (maxRayLength * 0.6);
        ctx.globalAlpha = 0.3 * (1 - (distance - sunRadius) / (maxRayLength * 0.6));
        const ditherChar = Math.random() > 0.5 ? "." : ",";
        drawCharAtPolar(ditherChar, angle, distance, centerX, centerY);
      }

      // Draw animated clouds
      ctx.fillStyle = "#666666";
      for (let i = 0; i < clouds.length; i++) {
        const cloud = clouds[i];
        
        // Move cloud
        cloud.x += cloud.speed;
        if (cloud.x > canvas.width + 100) {
          cloud.x = -100;
          cloud.y = Math.random() * canvas.height * 0.7 + canvas.height * 0.1;
        }
        
        drawCloud(cloud.x, cloud.y, cloud.size, cloud.opacity);
      }

      ctx.globalAlpha = 1;
    };

    const drawMoon = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const rotationAngle = ((elapsed % rotationPeriod) / rotationPeriod) * 2 * Math.PI;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#cccccc";

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const moonRadius = Math.min(canvas.width, canvas.height) * 0.18;

      // Draw twinkling stars across the entire screen - more visible
      ctx.font = "14px monospace";
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const x = star.x * canvas.width;
        const y = star.y * canvas.height;
        const flicker = 0.7 + 0.3 * Math.sin(time * star.speed + star.flickerOffset);
        ctx.globalAlpha = flicker;
        const char = starChars[(star.charIndex + Math.floor(time * 0.001)) % starChars.length];
        ctx.fillText(char, x - 6, y + 4);
      }

      ctx.globalAlpha = 1;

      // Draw full moon with rotation
      const moonChars = ["@", "O", "*", "#", ".", "+", "-", "="];
      
      // Draw full circle moon
      for (let r = moonRadius; r > 0; r -= 12) {
        const circumference = 2 * Math.PI * r;
        const charCount = Math.floor(circumference / 8);
        const charIndex = Math.floor((moonRadius - r) / 12) % moonChars.length;
        const char = moonChars[charIndex];

        for (let i = 0; i < charCount; i++) {
          const angle = (i / charCount) * 2 * Math.PI + rotationAngle * 0.3;
          const dx = Math.cos(angle) * r;
          const dy = Math.sin(angle) * r;
          ctx.fillText(char, centerX + dx - 6, centerY + dy + 4);
        }
      }

      // Draw moon center
      ctx.font = "16px monospace";
      ctx.fillText("O", centerX - 4, centerY + 6);

      // Draw animated clouds in dark mode too
      ctx.fillStyle = "#888888";
      for (let i = 0; i < clouds.length; i++) {
        const cloud = clouds[i];
        
        // Move cloud
        cloud.x += cloud.speed * 0.5; // Slower in dark mode
        if (cloud.x > canvas.width + 100) {
          cloud.x = -100;
          cloud.y = Math.random() * canvas.height * 0.7 + canvas.height * 0.1;
        }
        
        drawCloud(cloud.x, cloud.y, cloud.size, cloud.opacity * 0.6); // More subtle in dark mode
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
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-40"
        style={{
          filter: 'contrast(1.2)',
          imageRendering: 'pixelated'
        }}
      />
    </div>
  );
};

export default AsciiSky;
