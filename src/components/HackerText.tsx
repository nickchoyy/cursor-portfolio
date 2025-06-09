
import React, { useEffect, useState } from "react";

const SYMBOLS = "!@#$%^&*()_+=<>?/|~".split("");

interface HackerTextProps {
  text: string;
  trigger: boolean; // changes when theme changes
  className?: string;
}

const HackerText = ({ text, trigger, className }: HackerTextProps) => {
  const [display, setDisplay] = useState(text);
  const [phase, setPhase] = useState<"idle" | "scramble" | "resolve">("idle");

  useEffect(() => {
    if (!trigger) return;

    let frame = 0;
    let scrambleInterval: NodeJS.Timeout;
    let resolveInterval: NodeJS.Timeout;

    const scramble = () => {
      scrambleInterval = setInterval(() => {
        const scrambled = text
          .split("")
          .map((char, i) => (Math.random() < 0.6 ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : char))
          .join("");
        setDisplay(scrambled);
        frame++;
        if (frame > 10) {
          clearInterval(scrambleInterval);
          setPhase("resolve");
          resolve();
        }
      }, 40);
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
          setDisplay(text);
          setPhase("idle");
        }
      }, 30);
    };

    setPhase("scramble");
    scramble();

    return () => {
      clearInterval(scrambleInterval);
      clearInterval(resolveInterval);
    };
  }, [trigger, text]);

  return (
    <span className={className}>
      {display}
    </span>
  );
};

export default HackerText;
