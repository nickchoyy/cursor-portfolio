
import React from 'react';

const experiences = [
  { year: '24', company: 'Meta Reality Labs', role: 'AR UX' },
  { year: '23-24', company: 'PlaybookXR', role: 'VR UX' },
  { year: '22-23', company: 'Wondr', role: 'Design System' },
  { year: '21', company: 'Vertiigo', role: 'Extension UX' },
  { year: '21', company: 'ZOE', role: 'Growth UX' },
  { year: '20-21', company: 'Kiwi.com', role: 'Travel UX' },
  { year: '20-21', company: 'Undout', role: 'Brand Identity' },
  { year: '20', company: 'Zero', role: 'Mobile UX' },
  { year: '20', company: 'Rigup', role: 'Mobile UX' },
  { year: '19', company: 'Avocode', role: 'Web UX' },
  { year: '18', company: 'Avast', role: 'Mobile UX' },
  { year: '17', company: 'DevCompany', role: 'Brand Identity' },
  { year: '16-19', company: 'Marvo', role: 'Web & Mobile' }
];

const ExperienceList = () => {
  return (
    <div className="fixed top-6 right-6 z-50 max-w-xs">
      <div className="text-right space-y-1">
        {experiences.map((exp, index) => (
          <div 
            key={index}
            className="text-xs font-mono transition-opacity duration-200 hover:opacity-70"
          >
            <div className="flex justify-end items-center gap-3">
              <div className="text-muted-foreground min-w-[2.5rem]">{exp.year}</div>
              <div className="text-right">
                <div className="font-medium leading-tight">{exp.company}</div>
                <div className="text-muted-foreground text-[10px] leading-tight">{exp.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceList;
