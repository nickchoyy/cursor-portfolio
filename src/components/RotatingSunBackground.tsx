"use client"

import { useEffect, useRef } from "react"

export default function RotatingSunBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // ASCII characters for different densities
    const sunCoreChars = ["@", "O", "0", "*", "=", "+"]
    const rayChars = ["|", "/", "-", "\\"]

    // Animation variables
    let animationFrameId: number
    let startTime: number | null = null
    const rotationPeriod = 12000 // 12 seconds for a full rotation
    const coreRotationPeriod = 4000 // 4 seconds for core rotation (faster)

    // Function to draw a character at a specific angle and distance from center
    const drawCharAtPolar = (
      char: string,
      angle: number,
      distance: number,
      centerX: number,
      centerY: number,
      fontSize = 16,
    ) => {
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance
      ctx.fillText(char, x - fontSize / 4, y + fontSize / 4)
    }

    // Function to draw the sun with smooth rotation
    const drawSun = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      // Calculate rotation angles
      const rotationAngle = ((elapsed % rotationPeriod) / rotationPeriod) * 2 * Math.PI
      const coreRotationAngle = ((elapsed % coreRotationPeriod) / coreRotationPeriod) * 2 * Math.PI

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#ffffff"

      // Calculate center of canvas
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw sun core with rotation
      const sunRadius = Math.min(canvas.width, canvas.height) * 0.15

      // Draw concentric rings for sun core with core rotation
      for (let r = 0; r < sunRadius; r += 16) {
        const ringRadius = sunRadius - r
        const circumference = 2 * Math.PI * ringRadius
        const charCount = Math.max(8, Math.floor(circumference / 12))
        const char = sunCoreChars[Math.min(Math.floor(r / 16), sunCoreChars.length - 1)]

        ctx.font = `${16 - (r / sunRadius) * 4}px monospace`

        for (let i = 0; i < charCount; i++) {
          const angle = (i / charCount) * 2 * Math.PI + coreRotationAngle // Add core rotation
          drawCharAtPolar(char, angle, ringRadius, centerX, centerY)
        }
      }

      // Draw sun center with rotation
      ctx.font = "24px monospace"
      const centerChar = sunCoreChars[Math.floor((coreRotationAngle / (Math.PI / 4)) % sunCoreChars.length)]
      ctx.fillText(centerChar, centerX - 8, centerY + 8)

      // Draw rotating rays
      const rayCount = 24
      const maxRayLength = Math.min(canvas.width, canvas.height) * 0.4

      ctx.font = "16px monospace"

      // Draw multiple layers of rays
      for (let layer = 0; layer < 3; layer++) {
        const layerOffset = layer * ((2 * Math.PI) / 3)

        for (let i = 0; i < rayCount; i++) {
          const rayAngle = rotationAngle + layerOffset + (i / rayCount) * 2 * Math.PI

          const rayLength = maxRayLength * (0.6 + 0.4 * Math.sin(i * 0.5))

          const rayCharIndex = Math.floor(((rayAngle + Math.PI / 4) % (2 * Math.PI)) / (Math.PI / 2)) % 4
          const rayChar = rayChars[rayCharIndex]

          const raySegments = Math.floor(rayLength / 16)
          for (let j = 0; j < raySegments; j++) {
            const distance = sunRadius + j * 16

            ctx.globalAlpha = 1 - j / raySegments

            drawCharAtPolar(rayChar, rayAngle, distance, centerX, centerY)
          }
        }
      }

      ctx.globalAlpha = 1

      // Add dithering around sun for glow effect
      const ditherCount = 300
      for (let i = 0; i < ditherCount; i++) {
        const angle = Math.random() * 2 * Math.PI
        const distance = sunRadius + Math.random() * (maxRayLength * 0.6)

        ctx.globalAlpha = 0.3 * (1 - (distance - sunRadius) / (maxRayLength * 0.6))

        const ditherChar = Math.random() > 0.5 ? "." : ","
        drawCharAtPolar(ditherChar, angle, distance, centerX, centerY)
      }

      ctx.globalAlpha = 1

      // Continue animation loop
      animationFrameId = requestAnimationFrame(drawSun)
    }

    // Start animation
    animationFrameId = requestAnimationFrame(drawSun)

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
      aria-hidden="true"
    />
  )
} 