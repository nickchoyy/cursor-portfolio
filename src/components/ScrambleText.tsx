import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ScrambleTextProps {
  text: string;
  trigger: number;
  className?: string;
  speed?: 'fast' | 'medium' | 'slow';
}

const ScrambleText = ({ text, trigger, className, speed = 'medium' }: ScrambleTextProps) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = "!@#$%^&*()_+=<>?/|~";
    
    // Speed configurations
    const speedConfigs = {
      fast: {
        duration: 0.3,
        speed: 0.2,
        revealDelay: 0.05
      },
      medium: {
        duration: 0.5,
        speed: 0.3,
        revealDelay: 0.1
      },
      slow: {
        duration: 0.8,
        speed: 0.4,
        revealDelay: 0.15
      }
    };

    const config = speedConfigs[speed];
    const ease = "power2.out";

    gsap.to(textRef.current, {
      duration: config.duration,
      scrambleText: {
        text: text,
        chars: chars,
        speed: config.speed,
        revealDelay: config.revealDelay,
        tweenLength: false,
        ease: ease
      },
      ease: ease
    });
  }, [trigger, text, speed]);

  return <span ref={textRef} className={className}>{text}</span>;
};

export default ScrambleText; 