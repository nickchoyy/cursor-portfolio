
import React, { useEffect, useState } from 'react';
import HackerText from './HackerText';
import { experiences } from '../data/experiences';

const ExperienceList = () => {
  const [themeChangeCount, setThemeChangeCount] = useState(0);
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setThemeChangeCount(event.detail);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    return () => window.removeEventListener('themeChange', handleThemeChange as EventListener);
  }, []);

  return (
    <div className="absolute top-6 right-8 w-64">
      {/* Experience Container */}
      <div className="space-y-1.5">
        {experiences.map((exp, index) => (
          <div 
            key={index}
            className={`flex gap-3 text-[10px] font-mono transition-all duration-300 cursor-pointer ${
              hoveredExperience === index ? 'text-muted-foreground/50' : ''
            }`}
            onMouseEnter={() => setHoveredExperience(index)}
            onMouseLeave={() => setHoveredExperience(null)}
          >
            <div className="text-muted-foreground min-w-[2rem] shrink-0 text-left">
              <HackerText text={exp.year} trigger={themeChangeCount} />
            </div>
            <div className="flex-1">
              <div className="font-medium leading-tight">
                <HackerText text={exp.company} trigger={themeChangeCount} />
              </div>
              <div className="text-muted-foreground leading-tight">
                <HackerText text={exp.role} trigger={themeChangeCount} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Container */}
      <div className="mt-4">
        <div className="text-[10px] font-mono leading-relaxed text-muted-foreground">
          <HackerText 
            text="Figma, Adobe Creative Suite, Blender, Framer, Oragami, Framer, Design Systems, Python, Prototyping, Marketing, Product Design, Accessibility Design, A/B Testing" 
            trigger={themeChangeCount} 
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceList;
