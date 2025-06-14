
import React from 'react';
import BentoCard from './BentoCard';

interface ColumnContentProps {
  items: any[];
  offset: number;
  title: string;
  isWork?: boolean;
  isPlayground?: boolean;
  hoveredItem: string | null;
  visibleItems: Set<string>;
  setHoveredItem: (item: string | null) => void;
  themeChangeCount: number;
}

const ColumnContent = ({ 
  items, 
  offset, 
  title, 
  isWork = false, 
  isPlayground = false,
  hoveredItem,
  visibleItems,
  setHoveredItem,
  themeChangeCount
}: ColumnContentProps) => (
  <div className="w-full">
    <div 
      className="space-y-4"
      style={{ 
        transform: `translateY(-${offset}px)`
      }}
    >
      {items.map((item, index) => {
        const cardId = `${title.toLowerCase()}-${index}`;
        const isHighlighted = hoveredItem === cardId;
        
        return (
          <BentoCard 
            key={index} 
            item={item} 
            isWork={isWork} 
            isPlayground={isPlayground} 
            cardId={cardId}
            isHighlighted={isHighlighted}
            onMouseEnter={() => setHoveredItem(cardId)}
            onMouseLeave={() => setHoveredItem(null)}
            themeChangeCount={themeChangeCount}
          />
        );
      })}
    </div>
  </div>
);

export default ColumnContent;
