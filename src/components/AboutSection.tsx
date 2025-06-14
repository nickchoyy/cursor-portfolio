import React from 'react';
import ScrambleText from './ScrambleText';
import TypewriterText from './TypewriterText';

interface AboutSectionProps {
  items: any[];
  offset: number;
  hoveredItem: string | null;
  visibleItems: Set<string>;
  setHoveredItem: (item: string | null) => void;
  themeChangeCount: number;
}

const AboutSection = ({ 
  items, 
  offset, 
  hoveredItem, 
  visibleItems, 
  setHoveredItem, 
  themeChangeCount 
}: AboutSectionProps) => (
  <div className="w-full">
    <div 
      className="space-y-2"
      style={{ 
        transform: `translateY(-${offset}px)`
      }}
    >
      {items.map((item, index) => {
        const cardId = `about-${index}`;
        const isHighlighted = hoveredItem === cardId;
        
        return (
          <div 
            key={index}
            id={cardId}
            data-card-id={cardId}
            className={`cursor-pointer transition-all duration-300 ${
              isHighlighted ? 'opacity-100' : 'opacity-45'
            }`}
            onMouseEnter={() => setHoveredItem(cardId)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className={`bg-background/40 backdrop-blur-md transition-all duration-300 overflow-hidden ${
              isHighlighted ? 'bg-background/80' : ''
            }`}>
              {item.isProfile && (
                <div className="w-full">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full opacity-80 transition-all duration-300"
                    loading="eager"
                    decoding="async"
                    style={{ imageRendering: 'auto' }}
                  />
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xs font-mono font-medium leading-tight transition-colors duration-300">
                    {themeChangeCount === 0 ? (
                      <TypewriterText 
                        text={item.title}
                        typingSpeed={50}
                        deletingSpeed={30}
                        pauseTime={1000}
                        trigger={isHighlighted}
                      />
                    ) : (
                      <ScrambleText text={item.title} trigger={themeChangeCount} />
                    )}
                  </h3>
                </div>
                
                <p className="text-xs font-mono text-muted-foreground/80 leading-relaxed transition-colors duration-300">
                  {themeChangeCount === 0 ? item.description : <ScrambleText text={item.description} trigger={themeChangeCount} />}
                </p>
                
                <div className={`mt-3 h-px bg-gradient-to-r from-border/40 to-transparent transition-all duration-300 ${
                  isHighlighted ? 'w-12 from-primary/60' : 'w-6'
                }`}></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default AboutSection;
