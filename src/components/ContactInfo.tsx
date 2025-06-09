
import React, { useState } from 'react';

const ContactInfo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="absolute top-8 left-8 z-50">
      <div className="text-sm font-mono">
        <div className="mb-1">nickchoy@berkeley.edu</div>
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="text-muted-foreground text-xs cursor-pointer">
            @nickchoy+
          </span>
          
          <div className={`absolute top-full left-0 mt-1 transition-all duration-200 ${
            isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
            <div className="bg-background/90 backdrop-blur-md border border-border/20 rounded-md p-2 shadow-lg">
              <div className="space-y-1">
                <a 
                  href="#" 
                  className="block text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-background/50"
                >
                  Resume
                </a>
                <a 
                  href="#" 
                  className="block text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-background/50"
                >
                  Twitter
                </a>
                <a 
                  href="#" 
                  className="block text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-background/50"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
