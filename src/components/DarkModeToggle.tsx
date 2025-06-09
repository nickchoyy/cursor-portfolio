
import React from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-6 right-6 z-50 p-2 bg-background/80 backdrop-blur-md border border-border/20 hover:bg-background/90 transition-all duration-200 group glow-effect light-halo"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-foreground transition-transform group-hover:scale-110" />
      ) : (
        <Moon className="h-4 w-4 text-foreground transition-transform group-hover:scale-110" />
      )}
    </button>
  );
};

export default DarkModeToggle;
