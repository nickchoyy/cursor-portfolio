import React, { useState, useEffect } from 'react';
import { Copy, Mail, Github, Linkedin, Check } from 'lucide-react';
import ScrambleText from './ScrambleText';

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
          <div className="text-xs font-mono text-muted-foreground">
            <ScrambleText text="nickchoy@berkeley.edu" trigger={themeChangeCount} />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className={`transition-all duration-200 ${
                copied 
                  ? 'opacity-100 text-green-500' 
                  : 'opacity-60 hover:opacity-100'
              }`}
              title={copied ? "Copied!" : "Copy email"}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
            </button>
            {copied && (
              <span className="text-xs font-mono text-green-500 animate-in fade-in slide-in-from-left-2 duration-200">
                Copied!
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-1 mt-3">
          <a 
            href="#" 
            className="block text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <ScrambleText text="Resume" trigger={themeChangeCount} />
          </a>
          <a 
            href="#" 
            className="block text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <ScrambleText text="Twitter" trigger={themeChangeCount} />
          </a>
          <a 
            href="#" 
            className="block text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <ScrambleText text="LinkedIn" trigger={themeChangeCount} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
