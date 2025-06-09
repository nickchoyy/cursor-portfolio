
import React, { useEffect, useRef } from 'react';

const AsciiSun = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    let animationFrameId: number;
    let rotation = 0;
    let lastTime = 0;

    const sunChars = ["@", "*", "#", "=", "~", "-", ".", "+"];
    const rayChars = ["|", "/", "-", "\\"];

    const drawSun = (time: number) => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.font = "12px monospace";
      ctx.fillStyle = "#000000"; // Black sun

      const deltaTime = time - lastTime;
      lastTime = time;
      rotation += 0.0005 * deltaTime;

      const centerX = width / 2;
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

      // Dense rays attached to every edge - no empty spots
      const rayCount = 48; // Doubled for denser coverage
      const maxRayLength = Math.min(width, height) * 0.4;

      for (let i = 0; i < rayCount; i++) {
        const angle = rotation + (i / rayCount) * 2 * Math.PI;
        const rayLength = maxRayLength * (0.7 + 0.3 * Math.sin(i * 0.5));
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

      animationFrameId = requestAnimationFrame(drawSun);
    };

    animationFrameId = requestAnimationFrame(drawSun);

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

export default AsciiSun;
