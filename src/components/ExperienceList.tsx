
import React, { useEffect, useState } from 'react';
import HackerText from './HackerText';

const experiences = [
  { year: '24', company: 'Meta Reality Labs', role: 'AR UX, Unity, Art Direction' },
  { year: '23-24', company: 'PlaybookXR', role: 'VR UX, Unity, AI' },
  { year: '22-23', company: 'Wondr [Studio Godsey]', role: 'UX, Visual, Design System' },
  { year: '21-22', company: 'Vertiigo', role: 'Extension UX, Visual, Web' }
];

const ExperienceList = () => {
  const [themeChangeCount, setThemeChangeCount] = useState(0);

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
            className="flex gap-3 text-[10px] font-mono"
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
            text="Unity, C#, AI, Blender, Lens Studio, JavaScript, p5.js, SparkAR, Lightship ARDK, Oculus SDK, Python, VR, Growth, Design Systems" 
            trigger={themeChangeCount} 
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceList;
