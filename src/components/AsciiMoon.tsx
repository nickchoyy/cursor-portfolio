
import React, { useEffect, useRef } from 'react';

const AsciiMoon = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    let animationFrameId: number;
    let t = 0;

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

      // Draw sharp crescent moon shape
      for (let r = moonRadius; r > 0; r -= 12) {
        const circumference = 2 * Math.PI * r;
        const charCount = Math.floor(circumference / 8);
        const charIndex = Math.floor((moonRadius - r) / 12) % moonChars.length;
        const char = moonChars[charIndex];

        for (let i = 0; i < charCount; i++) {
          const angle = (i / charCount) * 2 * Math.PI;
          const dx = Math.cos(angle + t * 0.1) * r;
          const dy = Math.sin(angle + t * 0.1) * r;
          
          // Create sharp crescent with defined edges (not a C shape)
          const normalizedAngle = (angle + t * 0.1) % (2 * Math.PI);
          // Sharp crescent - only show from 0.2π to 1.8π for sharper edges
          if (normalizedAngle > Math.PI * 0.2 && normalizedAngle < Math.PI * 1.8) {
            // Add additional sharpness by cutting off more of the circle
            const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
            const cutoffFactor = Math.cos(normalizedAngle - Math.PI) * 0.3;
            if (dx > cutoffFactor * distanceFromCenter) {
              ctx.fillText(char, centerX + dx - 6, centerY + dy + 4);
            }
          }
        }
      }

      // Draw crescent core with sharp edge
      ctx.font = "16px monospace";
      const coreAngle = t * 0.1;
      const normalizedCoreAngle = (coreAngle % (2 * Math.PI));
      if (normalizedCoreAngle > Math.PI * 0.2 && normalizedCoreAngle < Math.PI * 1.8) {
        // Apply same sharp cutoff to core
        const cutoffFactor = Math.cos(normalizedCoreAngle - Math.PI) * 0.3;
        if (0 > cutoffFactor * 8) { // 8 is approximate core radius
          ctx.fillText("O", centerX - 8, centerY + 6);
        }
      }

      // Add crater dots only on visible sharp crescent part
      const craterCount = 40;
      ctx.font = "12px monospace";
      for (let i = 0; i < craterCount; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * moonRadius * 0.8;
        const dx = Math.cos(angle) * radius;
        const dy = Math.sin(angle) * radius;
        const x = centerX + dx;
        const y = centerY + dy;
        
        // Only show craters on sharp crescent part
        const normalizedAngle = angle % (2 * Math.PI);
        if (normalizedAngle > Math.PI * 0.2 && normalizedAngle < Math.PI * 1.8) {
          const cutoffFactor = Math.cos(normalizedAngle - Math.PI) * 0.3;
          if (dx > cutoffFactor * radius) {
            ctx.globalAlpha = 0.2 + Math.random() * 0.2;
            ctx.fillText(".", x - 3, y + 3);
          }
        }
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(drawMoon);
    };

    animationFrameId = requestAnimationFrame(drawMoon);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="block"
      style={{
        filter: 'contrast(1.2)',
        imageRendering: 'pixelated'
      }}
    />
  );
};

export default AsciiMoon;
