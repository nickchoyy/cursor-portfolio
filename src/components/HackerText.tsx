
import React, { useEffect, useState, useRef } from "react";

const SYMBOLS = "!@#$%^&*()_+=<>?/|~".split("");

interface HackerTextProps {
  text: string;
  trigger: number; // Use numeric counter for reliable triggering
  className?: string;
}

const HackerText = ({ text, trigger, className }: HackerTextProps) => {
  const [display, setDisplay] = useState(text);
  const previousTrigger = useRef(trigger);

  useEffect(() => {
    // Only trigger if the trigger value has actually changed
    if (previousTrigger.current === trigger) return;
    previousTrigger.current = trigger;

    let frame = 0;
    let scrambleInterval: NodeJS.Timeout;
    let resolveInterval: NodeJS.Timeout;

    const scramble = () => {
      scrambleInterval = setInterval(() => {
        const scrambled = text
          .split("")
          .map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
          .join("");
        setDisplay(scrambled);
        frame++;
        if (frame > 2) { // Reduced from 4 to 2 for faster animation
          clearInterval(scrambleInterval);
          resolve();
        }
      }, 20); // Reduced from 30ms to 20ms
    };

    const resolve = () => {
      let i = 0;
      resolveInterval = setInterval(() => {
        const resolved = text.slice(0, i + 1);
        const remaining = text
          .slice(i + 1)
          .split("")
          .map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
          .join("");
        setDisplay(resolved + remaining);
        i++;
        if (i >= text.length) {
          clearInterval(resolveInterval);
          setDisplay(text); // Final reset without delay
        }
      }, 15); // Reduced from 25ms to 15ms
    };

    scramble();

    return () => {
      clearInterval(scrambleInterval);
      clearInterval(resolveInterval);
    };
  }, [trigger, text]);

  return <span className={className}>{display}</span>;
};

export default HackerText;
