
import React from 'react';
import HackerText from './HackerText';

interface BentoCardProps {
  item: any;
  isWork?: boolean;
  isPlayground?: boolean;
  cardId: string;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  themeChangeCount: number;
}

const BentoCard = ({ 
  item, 
  isWork = false, 
  isPlayground = false, 
  cardId, 
  isHighlighted,
  onMouseEnter,
  onMouseLeave,
  themeChangeCount
}: BentoCardProps) => {
  return (
    <div 
      id={cardId}
      data-card-id={cardId}
      className={`cursor-pointer transition-all duration-300 ${
        isHighlighted 
          ? 'opacity-100' 
          : isWork || isPlayground 
            ? 'opacity-85' 
            : 'opacity-75'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`bg-background/40 backdrop-blur-md transition-all duration-300 overflow-hidden ${
        isHighlighted 
          ? 'bg-background/80' 
          : ''
      }`}>
        {item.image && !item.isProfile && (
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover opacity-80 transition-all duration-300"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
        
        {item.isProfile && (
          <div className="aspect-square overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover opacity-80 transition-all duration-300"
              loading="eager"
              decoding="async"
              style={{ imageRendering: 'auto' }}
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xs font-mono font-medium leading-tight transition-colors duration-300">
              <HackerText text={item.title} trigger={themeChangeCount} />
            </h3>
            {isWork && (
              <span className="text-xs font-mono text-muted-foreground ml-4 shrink-0 transition-colors duration-300">
                <HackerText text={item.year} trigger={themeChangeCount} />
              </span>
            )}
          </div>
          
          {(isWork || isPlayground) && item.subtitle && (
            <p className="text-xs font-mono text-muted-foreground mb-3 leading-relaxed transition-colors duration-300">
              <HackerText text={item.subtitle} trigger={themeChangeCount} />
            </p>
          )}
          
          <p className="text-xs font-mono text-muted-foreground/80 leading-relaxed transition-colors duration-300">
            <HackerText text={item.description} trigger={themeChangeCount} />
          </p>
          
          {isPlayground && item.tech && (
            <span className="text-xs font-mono text-muted-foreground/60 mt-3 block transition-colors duration-300">
              <HackerText text={item.tech} trigger={themeChangeCount} />
            </span>
          )}
          
          <div className={`mt-4 h-px bg-gradient-to-r from-border/40 to-transparent transition-all duration-300 ${
            isHighlighted ? 'w-12 from-primary/60' : 'w-6'
          }`}></div>
        </div>
      </div>
    </div>
  );
};

export default BentoCard;
