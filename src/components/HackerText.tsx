
import React, { useEffect, useState } from "react";

const SYMBOLS = "!@#$%^&*()_+=<>?/|~".split("");

interface HackerTextProps {
  text: string;
  trigger: boolean;
  className?: string;
}

const HackerText = ({ text, trigger, className }: HackerTextProps) => {
  const [display, setDisplay] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Only trigger if we have a new trigger value and not currently animating
    if (!trigger || isAnimating || hasTriggered) return;

    setIsAnimating(true);
    setHasTriggered(true);
    let frame = 0;
    let scrambleInterval: NodeJS.Timeout;
    let resolveInterval: NodeJS.Timeout;

    const scramble = () => {
      scrambleInterval = setInterval(() => {
        const scrambled = text
          .split("")
          .map((char, i) => (Math.random() < 0.7 ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : char))
          .join("");
        setDisplay(scrambled);
        frame++;
        if (frame > 3) { // Quick scramble
          clearInterval(scrambleInterval);
          resolve();
        }
      }, 30); // Scrambling speed
    };

    const resolve = () => {
      let resolved = "";
      let i = 0;
      resolveInterval = setInterval(() => {
        resolved = text.slice(0, i + 1);
        const remaining = text
          .slice(i + 1)
          .split("")
          .map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
          .join("");
        setDisplay(resolved + remaining);
        i++;
        if (i >= text.length) {
          clearInterval(resolveInterval);
          // Show the resolved text for a moment, then return to normal
          setTimeout(() => {
            setDisplay(text);
            setTimeout(() => {
              setIsAnimating(false);
              setHasTriggered(false); // Reset for next trigger
            }, 100);
          }, 300); // Show completed text for 300ms
        }
      }, 25); // Resolution speed
    };

    scramble();

    return () => {
      clearInterval(scrambleInterval);
      clearInterval(resolveInterval);
      setIsAnimating(false);
    };
  }, [trigger, text, isAnimating, hasTriggered]);

  return (
    <span className={className}>
      {display}
    </span>
  );
};

export default HackerText;
