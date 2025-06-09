
import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center transition-opacity duration-500 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="text-center space-y-8">
        <div className="text-xs font-mono text-muted-foreground tracking-[0.2em] animate-pulse">
          INITIALIZING PORTFOLIO
        </div>
        
        <div className="w-64 h-px bg-border relative overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-foreground transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="text-xs font-mono text-muted-foreground/60">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
