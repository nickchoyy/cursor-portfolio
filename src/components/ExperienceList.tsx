import React, { useEffect, useState } from 'react';
import ScrambleText from './ScrambleText';
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
    <div className="absolute top-6 right-8 w-72">
      {/* Experience Container */}
      <div className="space-y-2">
        {experiences.map((exp, index) => (
          <div 
            key={index}
            className={`flex gap-3 text-[11px] font-mono transition-all duration-300 cursor-pointer ${
              hoveredExperience === index ? 'text-muted-foreground/50' : ''
            }`}
            onMouseEnter={() => setHoveredExperience(index)}
            onMouseLeave={() => setHoveredExperience(null)}
          >
            <div className="text-muted-foreground min-w-[2.5rem] shrink-0 text-left">
              <ScrambleText text={exp.year} trigger={themeChangeCount} speed="fast" />
            </div>
            <div className="flex-1">
              <div className="font-[10px] leading-tight">
                <ScrambleText text={exp.company} trigger={themeChangeCount} speed="medium" />
              </div>
              <div className="text-muted-foreground leading-tight">
                <ScrambleText text={exp.role} trigger={themeChangeCount} speed="slow" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Container */}
      <div className="mt-6">
        <div className="text-[10px] font-mono leading-relaxed text-muted-foreground">
          <ScrambleText 
            text="Figma, Adobe Creative Suite, Blender, Framer, Oragami, Framer, Design Systems, Python, Prototyping, Marketing, Product Design, Accessibility Design, A/B Testing" 
            trigger={themeChangeCount} 
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceList;
