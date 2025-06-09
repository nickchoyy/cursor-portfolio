
import React from 'react';

const experiences = [
  { year: '24', company: 'Meta Reality Labs', role: 'AR UX, Unity, Art Direction' },
  { year: '23-24', company: 'PlaybookXR', role: 'VR UX, Unity, AI' },
  { year: '22-23', company: 'Wondr [Studio Godsey]', role: 'UX, Visual, Design System' },
  { year: '21-22', company: 'Vertiigo', role: 'Extension UX, Visual, Web' }
];

const ExperienceList = () => {
  return (
    <div className="fixed top-6 right-6 z-50 w-80">
      {/* Experience Container */}
      <div className="space-y-2">
        {experiences.map((exp, index) => (
          <div 
            key={index}
            className="flex gap-4 text-xs font-mono"
          >
            <div className="text-muted-foreground min-w-[2.5rem] shrink-0">{exp.year}</div>
            <div className="flex-1">
              <div className="font-medium leading-tight">{exp.company}</div>
              <div className="text-muted-foreground leading-tight">{exp.role}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Container */}
      <div className="mt-6">
        <div className="text-xs font-mono leading-relaxed text-muted-foreground">
          Unity, C#, AI, Blender, Lens Studio, JavaScript, p5.js, SparkAR, 
          Lightship ARDK, Oculus SDK, Python, AI, VR, Growth, Design Systems
        </div>
      </div>
    </div>
  );
};

export default ExperienceList;
