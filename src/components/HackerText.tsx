import React, { useEffect, useState, useRef } from "react";

const SYMBOLS = "!@#$%^&*()_+=<>?/|~".split("");

interface HackerTextProps {
  text: string;
  trigger: number;
  className?: string;
}

const HackerText = ({ text, trigger, className }: HackerTextProps) => {
  const [display, setDisplay] = useState(text);
  const previousTrigger = useRef(trigger);

  useEffect(() => {
    // Only trigger if the trigger value has actually changed
    if (previousTrigger.current === trigger) return;
    previousTrigger.current = trigger;

    // Calculate speed based on text length
    const textLength = text.length;
    const isLongText = textLength > 50; // For long skill lists
    const isMediumText = textLength > 20;
    
    // Adjust speeds based on text length
    const scrambleFrames = isLongText ? 1 : isMediumText ? 2 : 2;
    const scrambleDelay = isLongText ? 5 : isMediumText ? 8 : 10;
    const resolveDelay = isLongText ? 4 : isMediumText ? 6 : 8;

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
        if (frame > scrambleFrames) {
          clearInterval(scrambleInterval);
          resolve();
        }
      }, scrambleDelay);
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
          setDisplay(text);
        }
      }, resolveDelay);
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
