import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
  trigger?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className = '',
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseTime = 1000,
  trigger = false
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isTyping, setIsTyping] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (trigger && !isTyping && !isDeleting) {
      setIsTyping(true);
      setCurrentIndex(0);
      setDisplayText('');
    } else if (!trigger) {
      setIsTyping(false);
      setIsDeleting(false);
      setCurrentIndex(text.length);
      setDisplayText(text);
    }
  }, [trigger, text]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (currentIndex < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
          setIsDeleting(true);
        }, pauseTime);
      }
    } else if (isDeleting) {
      if (currentIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
      }
    }

    return () => clearTimeout(timeout);
  }, [isTyping, isDeleting, currentIndex, text, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypewriterText; 