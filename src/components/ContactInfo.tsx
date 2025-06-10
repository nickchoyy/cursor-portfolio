
import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import HackerText from './HackerText';

const ContactInfo = () => {
  const [themeChangeCount, setThemeChangeCount] = useState(0);
  const [copied, setCopied] = useState(false);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      console.log('ContactInfo received theme change:', event.detail);
      setThemeChangeCount(event.detail);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    return () => window.removeEventListener('themeChange', handleThemeChange as EventListener);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('nickchoy@berkeley.edu');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="absolute top-8 left-8 z-50">
      <div className="text-sm font-mono">
        <div className="mb-1 flex items-center gap-2">
          <HackerText text="nickchoy@berkeley.edu" trigger={themeChangeCount} />
          <button
            onClick={handleCopyEmail}
            className="opacity-60 hover:opacity-100 transition-opacity duration-200"
            title={copied ? "Copied!" : "Copy email"}
          >
            <Copy size={12} />
          </button>
        </div>
        
        <div className="space-y-1 mt-3">
          <a 
            href="#" 
            className="block text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <HackerText text="Resume" trigger={themeChangeCount} />
          </a>
          <a 
            href="#" 
            className="block text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <HackerText text="Twitter" trigger={themeChangeCount} />
          </a>
          <a 
            href="#" 
            className="block text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <HackerText text="LinkedIn" trigger={themeChangeCount} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
