
import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/10 via-transparent to-foreground/10 animate-pulse"></div>
        <div className="grid grid-cols-8 h-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className="border-r border-b border-foreground/5"
              style={{
                animationDelay: `${i * 0.1}s`,
                animation: 'pulse 3s infinite'
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-mono font-medium">AR/AI Designer</h3>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              Crafting immersive experiences at the intersection of design, technology, and human connection.
            </p>
            <div className="flex space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-muted-foreground">Available for collaboration</span>
            </div>
          </div>

          {/* Links Column */}
          <div className="space-y-6">
            <h4 className="text-sm font-mono font-medium uppercase tracking-wider">Connect</h4>
            <div className="space-y-3">
              {[
                { label: 'Email', href: 'mailto:hello@example.com' },
                { label: 'LinkedIn', href: '#' },
                { label: 'GitHub', href: '#' },
                { label: 'Twitter', href: '#' }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm font-mono text-muted-foreground hover:text-foreground transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {link.label} →
                </a>
              ))}
            </div>
          </div>

          {/* Status Column */}
          <div className="space-y-6">
            <h4 className="text-sm font-mono font-medium uppercase tracking-wider">Current</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-mono text-muted-foreground">Working on</p>
                <p className="text-sm font-mono">AR Platform Architecture</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-mono text-muted-foreground">Reading</p>
                <p className="text-sm font-mono">The Future of Human-Computer Interaction</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-mono text-muted-foreground">Listening to</p>
                <p className="text-sm font-mono">Lo-fi Hip Hop Beats</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs font-mono text-muted-foreground">
            © 2024 Portfolio. Designed & developed with care.
          </p>
          <div className="flex items-center space-x-4">
            <div className="w-1 h-1 bg-foreground rounded-full"></div>
            <p className="text-xs font-mono text-muted-foreground">
              Built with React & Tailwind
            </p>
            <div className="w-1 h-1 bg-foreground rounded-full"></div>
            <p className="text-xs font-mono text-muted-foreground">
              Los Angeles, CA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
