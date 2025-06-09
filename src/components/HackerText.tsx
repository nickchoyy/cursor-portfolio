
import React, { useEffect, useState, useRef } from "react";

const SYMBOLS = "!@#$%^&*()_+=<>?/|~".split("");

interface HackerTextProps {
  text: string;
  trigger: string | number | boolean; // Accept changing identity
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
          .map(() =>
            Math.random() < 0.8
              ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
              : text[Math.floor(Math.random() * text.length)]
          )
          .join("");
        setDisplay(scrambled);
        frame++;
        if (frame > 4) {
          clearInterval(scrambleInterval);
          resolve();
        }
      }, 30);
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
          setTimeout(() => setDisplay(text), 100);
        }
      }, 25);
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
