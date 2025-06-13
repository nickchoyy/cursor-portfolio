import React, { useEffect, useRef, useState } from 'react';

const drawHorizontalAsciiCloud = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  opacity: number,
  time: number,
  phase: number,
  isDarkMode: boolean
) => {
  // Characters for cloud texture and edges - using more visible characters
  const cloudChars = ["|", "‖", "=", ":", "#", "+", "*", "@"];
  const edgeChars = ["(", ")", "{", "}", "[", "]", "#"];
  const denseChars = ["#", "@", "8", "&", "%", "B"];
  const lightChars = [".", ":", "-", "=", "+"];

  // Calculate breathing effect (subtle size pulsing)
  const breathingFactor = 1 + 0.03 * Math.sin(time * 0.0003 + phase);
  const adjustedWidth = width * breathingFactor;
  const adjustedHeight = height * breathingFactor;

  ctx.font = "16px monospace";

  // Draw the cloud body with horizontal emphasis
  const horizontalSegments = Math.floor(adjustedWidth / 8); // Increased density
  const verticalSegments = Math.floor(adjustedHeight / 6); // Increased density

  // Draw cloud with varying density from bottom to top
  for (let y = 0; y < verticalSegments; y++) {
    // Calculate vertical position and density
    const verticalPos = centerY - adjustedHeight / 2 + y * (adjustedHeight / verticalSegments);
    const verticalRatio = y / verticalSegments;

    // Top is less dense, bottom is more dense
    const charSet = verticalRatio < 0.3 ? lightChars : verticalRatio < 0.7 ? cloudChars : denseChars;

    // Calculate width variation to create a natural cloud shape
    // Middle is wider, edges taper
    const widthVariation = Math.sin((y / verticalSegments) * Math.PI);
    const segmentWidth = adjustedWidth * (0.5 + widthVariation * 0.5);

    // Add slight wobble to the cloud shape
    const wobbleX = Math.sin(time * 0.0002 + y * 0.2) * (adjustedWidth * 0.03);

    for (let x = 0; x < horizontalSegments; x++) {
      // Calculate horizontal position
      const horizontalRatio = x / horizontalSegments;
      const horizontalPos = centerX - segmentWidth / 2 + horizontalRatio * segmentWidth + wobbleX;

      // Reduced skip rate for more density
      if (Math.random() > 0.5) continue;

      // Determine character based on position
      let char;

      // Edge characters for cloud outline
      if (horizontalRatio < 0.1 || horizontalRatio > 0.9 || verticalRatio < 0.15 || verticalRatio > 0.85) {
        char = edgeChars[Math.floor(Math.random() * edgeChars.length)];
      } else {
        // Interior characters
        char = charSet[Math.floor(Math.random() * charSet.length)];
      }

      // Calculate opacity - edges are more transparent but with higher minimum
      const edgeFactor = Math.min(
        Math.min(horizontalRatio, 1 - horizontalRatio) * 5,
        Math.min(verticalRatio, 1 - verticalRatio) * 5
      );
      const charOpacity = isDarkMode
        ? opacity * Math.min(1, Math.max(0.15, edgeFactor))
        : opacity * Math.min(1, Math.max(0.35, edgeFactor));

      ctx.globalAlpha = charOpacity;
      ctx.fillText(char, horizontalPos, verticalPos);
    }
  }

  // Add more detail characters for texture
  const detailCount = Math.floor((adjustedWidth * adjustedHeight) / 150);
  for (let i = 0; i < detailCount; i++) {
    const xOffset = (Math.random() - 0.5) * adjustedWidth;
    const yOffset = (Math.random() - 0.5) * adjustedHeight;

    // Calculate distance from center (normalized)
    const distanceFromCenter = Math.sqrt(
      Math.pow(xOffset / (adjustedWidth / 2), 2) + Math.pow(yOffset / (adjustedHeight / 2), 2)
    );

    // Skip if outside the cloud shape
    if (distanceFromCenter > 1) continue;

    // Fade out at edges but with higher minimum
    const detailOpacity = isDarkMode
      ? opacity * Math.max(0.2, 1 - distanceFromCenter * 0.7)
      : opacity * Math.max(0.4, 1 - distanceFromCenter * 0.7);

    // Choose character based on position in cloud
    const yRatio = (yOffset + adjustedHeight / 2) / adjustedHeight;
    const detailChar =
      yRatio < 0.4
        ? lightChars[Math.floor(Math.random() * lightChars.length)]
        : cloudChars[Math.floor(Math.random() * cloudChars.length)];

    ctx.globalAlpha = detailOpacity;
    ctx.fillText(detailChar, centerX + xOffset, centerY + yOffset);
  }

  ctx.globalAlpha = 1;
};

const AsciiSky = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [themeChangeCount, setThemeChangeCount] = useState(0);
  const [randomCloudPositions] = useState(() => {
    // Generate natural cloud positions with atmospheric perspective
    const generateNaturalClouds = () => {
      const clouds = [];
      const sunCenterX = 0.5; // Sun at 50% width
      const sunCenterY = 0.5; // Sun at 50% height
      
      // Create cloud clusters and solo clouds
      const cloudGroups = [
        // Cluster 1 - Upper left area (2-3 clouds)
        {
          centerX: 0.25 + Math.random() * 0.15, // 25-40% from left
          centerY: 0.2 + Math.random() * 0.1,   // 20-30% from top
          count: 2 + Math.floor(Math.random() * 2), // 2-3 clouds
          spread: 0.08 // How spread out the cluster is
        },
        // Cluster 2 - Lower right area (2 clouds)
        {
          centerX: 0.65 + Math.random() * 0.15, // 65-80% from left
          centerY: 0.7 + Math.random() * 0.1,   // 70-80% from top
          count: 2,
          spread: 0.06
        },
        // Solo cloud - Upper right
        {
          centerX: 0.7 + Math.random() * 0.15,  // 70-85% from left
          centerY: 0.15 + Math.random() * 0.1,  // 15-25% from top
          count: 1,
          spread: 0
        },
        // Solo cloud - Lower left
        {
          centerX: 0.15 + Math.random() * 0.15, // 15-30% from left
          centerY: 0.65 + Math.random() * 0.1,  // 65-75% from top
          count: 1,
          spread: 0
        }
      ];
      
      let cloudIndex = 0;
      
      cloudGroups.forEach(group => {
        for (let i = 0; i < group.count; i++) {
          // Calculate position within the group
          const angleOffset = (Math.random() - 0.5) * Math.PI; // Random angle
          const distanceOffset = Math.random() * group.spread;
          
          const cloudX = group.centerX + Math.cos(angleOffset) * distanceOffset;
          const cloudY = group.centerY + Math.sin(angleOffset) * distanceOffset;
          
          // Calculate distance from sun for atmospheric perspective
          const distanceFromSun = Math.sqrt(
            Math.pow(cloudX - sunCenterX, 2) + Math.pow(cloudY - sunCenterY, 2)
          );
          
          // Atmospheric perspective effects
          const perspectiveScale = 0.7 + distanceFromSun * 0.6; // Closer clouds appear larger
          const perspectiveOpacity = 0.75 + distanceFromSun * 0.25; // Closer clouds more opaque
          const perspectiveSpeed = 0.8 + distanceFromSun * 0.4; // Closer clouds move slower (parallax)
          
          // Add slight random variations for natural imperfection
          const naturalVariation = {
            x: cloudX + (Math.random() - 0.5) * 0.03, // Small random offset
            y: cloudY + (Math.random() - 0.5) * 0.02,
            sizeVariation: 0.8 + Math.random() * 0.4, // 0.8-1.2x size variation
            heightVariation: 0.7 + Math.random() * 0.6 // 0.7-1.3x height variation
          };
          
          const finalPosition = {
            x: Math.max(0.1, Math.min(0.9, naturalVariation.x)),
            y: Math.max(0.1, Math.min(0.9, naturalVariation.y))
          };
          
          clouds.push({
            horizontalOffset: finalPosition.x,
            verticalPosition: finalPosition.y,
            width: (160 + Math.random() * 120) * perspectiveScale * naturalVariation.sizeVariation, // 160-280px base (increased from 120-200px)
            height: (80 + Math.random() * 60) * perspectiveScale * naturalVariation.heightVariation, // 80-140px base (increased from 60-100px)
            speed: perspectiveSpeed * (0.8 + Math.random() * 0.4), // 0.8-1.2x with perspective
            opacity: perspectiveOpacity * (0.85 + Math.random() * 0.15), // 0.85-1.0 with perspective
            phase: cloudIndex,
            distanceFromSun: distanceFromSun, // Store for potential future use
            layer: distanceFromSun < 0.3 ? 'foreground' : distanceFromSun < 0.6 ? 'middle' : 'background'
          });
          
          cloudIndex++;
        }
      });
      
      // Sort clouds by distance from sun (background to foreground rendering)
      clouds.sort((a, b) => b.distanceFromSun - a.distanceFromSun);
      
      return clouds;
    };
    
    return generateNaturalClouds();
  });

  React.useEffect(() => {
    const handleStorageChange = () => {
      setIsDark(localStorage.getItem('theme') === 'dark');
    };
    
    window.addEventListener('storage', handleStorageChange);
    
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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;
    let startTime: number | null = null;
    const rotationPeriod = 20000;

    const cloudCount = 8;
    const clouds = Array.from({ length: cloudCount }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: 50 + (i * 80),
      width: 150 + Math.random() * 100,
      height: 40 + Math.random() * 30,
      speed: 0.1 + Math.random() * 0.05,
      phase: Math.random() * Math.PI * 2
    }));

    const starChars = [".", "+", "*", "·"];
    const starCount = 250;
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      charIndex: number;
      flickerOffset: number;
    }> = [];

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

    const drawSun = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const rotationAngle = ((elapsed % rotationPeriod) / rotationPeriod) * 2 * Math.PI;
      const coreRotationAngle = ((elapsed % (rotationPeriod / 3)) / (rotationPeriod / 3)) * 2 * Math.PI;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw clouds first (behind everything) in light mode
      if (!isDark) {
        ctx.fillStyle = "#666666"; // Darker color for better visibility
        
        // Create scattered clouds across the sky
        const cloudSpeed = 0.00008; // Very slow movement speed
        
        // Use randomized cloud positions
        const scatteredClouds = randomCloudPositions.map(cloudData => ({
          x: ((elapsed * cloudSpeed * cloudData.speed + canvas.width * cloudData.horizontalOffset) % (canvas.width + 400)) - 200,
          y: canvas.height * cloudData.verticalPosition,
          width: cloudData.width,
          height: cloudData.height,
          opacity: cloudData.opacity,
          phase: cloudData.phase
        }));
        
        // Draw all scattered clouds
        scatteredClouds.forEach(cloud => {
          drawHorizontalAsciiCloud(
            ctx, 
            cloud.x, 
            cloud.y, 
            cloud.width, 
            cloud.height, 
            cloud.opacity, 
            elapsed, 
            cloud.phase, 
            false
          );
        });
      }
      
      ctx.fillStyle = "#000000"; // Black sun

      // Calculate center of canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // ASCII characters for different densities
      const sunCoreChars = ["@", "O", "0", "*", "=", "+"];
      const rayChars = ["|", "/", "-", "\\"];

      // Draw sun core with separate rotation - smaller size
      const sunRadius = Math.min(canvas.width, canvas.height) * 0.12;

      // Draw concentric rings for sun core with core rotation
      for (let r = 0; r < sunRadius; r += 16) {
        const ringRadius = sunRadius - r;
        const circumference = 2 * Math.PI * ringRadius;
        const charCount = Math.max(8, Math.floor(circumference / 12));
        const char = sunCoreChars[Math.min(Math.floor(r / 16), sunCoreChars.length - 1)];

        ctx.font = `${16 - (r / sunRadius) * 4}px monospace`;

        for (let i = 0; i < charCount; i++) {
          const angle = (i / charCount) * 2 * Math.PI + coreRotationAngle;
          drawCharAtPolar(char, angle, ringRadius, centerX, centerY);
        }
      }

      // Draw sun center with rotation
      ctx.font = "24px monospace";
      const centerChar = sunCoreChars[Math.floor((coreRotationAngle / (Math.PI / 4)) % sunCoreChars.length)];
      ctx.fillText(centerChar, centerX - 8, centerY + 8);

      // Draw rotating rays with balanced opacity - smaller rays
      const rayCount = 24;
      const maxRayLength = Math.min(canvas.width, canvas.height) * 0.35;

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
            ctx.globalAlpha = Math.max(0.3, 1 - j / raySegments);
            drawCharAtPolar(rayChar, rayAngle, distance, centerX, centerY);
          }
        }
      }

      ctx.globalAlpha = 1;

      // Add dithering around sun for glow effect - smaller glow
      const ditherCount = 250;
      for (let i = 0; i < ditherCount; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const distance = sunRadius + Math.random() * (maxRayLength * 0.5);
        ctx.globalAlpha = 0.3 * (1 - (distance - sunRadius) / (maxRayLength * 0.5));
        const ditherChar = Math.random() > 0.5 ? "." : ",";
        drawCharAtPolar(ditherChar, angle, distance, centerX, centerY);
      }

      ctx.globalAlpha = 1;
    };

    const drawMoon = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const rotationAngle = ((elapsed % rotationPeriod) / rotationPeriod) * 2 * Math.PI;
      const ringRotationAngle = ((elapsed % (rotationPeriod / 2)) / (rotationPeriod / 2)) * 2 * Math.PI;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#cccccc";

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const moonRadius = Math.min(canvas.width, canvas.height) * 0.18;

      ctx.font = "16px monospace";
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const x = star.x * canvas.width;
        const y = star.y * canvas.height;
        const flicker = 0.8 + 0.2 * Math.sin(time * star.speed + star.flickerOffset);
        ctx.globalAlpha = flicker;
        const char = starChars[(star.charIndex + Math.floor(time * 0.001)) % starChars.length];
        ctx.fillText(char, x - 8, y + 8);
      }

      ctx.globalAlpha = 1;

      const ringInnerRadius = moonRadius * 1.2;
      const ringOuterRadius = moonRadius * 2.0;
      const ringTilt = Math.PI / 5;
      const ringChars = ["o", "*", "-", "=", "·", "+"];
      
      ctx.font = "10px monospace";
      ctx.fillStyle = "#aaaaaa";
      
      const ringLayers = 4;
      for (let layer = 0; layer < ringLayers; layer++) {
        const layerRadius = ringInnerRadius + (layer / ringLayers) * (ringOuterRadius - ringInnerRadius);
        const layerDensity = Math.max(60, 120 - layer * 15);
        
        for (let i = 0; i < layerDensity; i++) {
          const angle = (i / layerDensity) * 2 * Math.PI + ringRotationAngle * (1 + layer * 0.1);
          
          const x3d = Math.cos(angle);
          const y3d = Math.sin(angle) * Math.cos(ringTilt);
          const z3d = Math.sin(angle) * Math.sin(ringTilt);
          
          if (z3d > -0.8) {
            const x = centerX + x3d * layerRadius;
            const y = centerY + y3d * layerRadius;
            
            const depth = (z3d + 1) / 2;
            const opacity = 0.3 + 0.7 * depth;
            ctx.globalAlpha = opacity;
            
            const jitterX = (Math.random() - 0.5) * 4;
            const jitterY = (Math.random() - 0.5) * 2;
            
            const charIndex = (Math.floor(angle * 3) + layer) % ringChars.length;
            const char = ringChars[charIndex];
            
            ctx.fillText(char, x + jitterX - 3, y + jitterY + 3);
          }
        }
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = "#cccccc";

      const moonChars = ["@", "O", "*", "#", ".", "+", "-", "="];
      
      for (let r = moonRadius; r > 0; r -= 8) {
        const circumference = 2 * Math.PI * r;
        const charCount = Math.floor(circumference / 6);
        const charIndex = Math.floor((moonRadius - r) / 8) % moonChars.length;
        const char = moonChars[charIndex];

        ctx.font = `${Math.max(8, 12 - (moonRadius - r) / 20)}px monospace`;

        for (let i = 0; i < charCount; i++) {
          const angle = (i / charCount) * 2 * Math.PI + rotationAngle * 0.3;
          const dx = Math.cos(angle) * r;
          const dy = Math.sin(angle) * r;
          
          ctx.globalAlpha = 0.9 + 0.1 * Math.sin(angle * 3);
          ctx.fillText(char, centerX + dx - 4, centerY + dy + 4);
        }
      }

      ctx.globalAlpha = 1;
      ctx.font = "16px monospace";
      ctx.fillText("@", centerX - 4, centerY + 6);
    };

    const animate = (timestamp: number) => {
      if (isDark) {
        drawMoon(timestamp);
      } else {
        drawSun(timestamp);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);

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
