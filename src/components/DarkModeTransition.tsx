
import React, { useEffect, useState } from 'react';

const DarkModeTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target as HTMLElement;
          if (target.classList.contains('dark') || !target.classList.contains('dark')) {
            setIsTransitioning(true);
            setTimeout(() => setIsTransitioning(false), 800); // Longer transition for rebuild effect
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div className="absolute inset-0 bg-background animate-[command-rebuild_0.8s_ease-in-out]"></div>
    </div>
  );
};

export default DarkModeTransition;
