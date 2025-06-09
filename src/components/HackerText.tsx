
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

  useEffect(() => {
    if (!trigger || isAnimating) return;

    setIsAnimating(true);
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
        if (frame > 4) { // Reduced for faster effect
          clearInterval(scrambleInterval);
          resolve();
        }
      }, 20); // Faster scrambling
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
          // After resolving, show normal text briefly then return to normal state
          setTimeout(() => {
            setDisplay(text);
            setIsAnimating(false);
          }, 200); // Brief pause to show the resolved text
        }
      }, 15); // Faster resolving
    };

    scramble();

    return () => {
      clearInterval(scrambleInterval);
      clearInterval(resolveInterval);
      setIsAnimating(false);
    };
  }, [trigger, text, isAnimating]);

  return (
    <span className={className}>
      {display}
    </span>
  );
};

export default HackerText;
