
import React from 'react';

const experiences = [
  {
    year: '24',
    company: 'Meta Reality Labs',
    role: 'AR UX, Unity, Art Direction'
  },
  {
    year: '23-24',
    company: 'PlaybookXR',
    role: 'VR UX, Unity, AI'
  },
  {
    year: '22-23',
    company: 'Wondr [Studio Godsey]',
    role: 'UX, Visual, Design System'
  },
  {
    year: '21',
    company: 'Vertiigo',
    role: 'Extension UX, Visual, Web'
  },
  {
    year: '21',
    company: 'ZOE',
    role: 'UX, User Testing, Growth'
  },
  {
    year: '20-21',
    company: 'Kiwi.com',
    role: 'UX, Visual, Growth'
  },
  {
    year: '20-21',
    company: 'Undout',
    role: 'Brand Identity, Web Design'
  },
  {
    year: '20',
    company: 'Zero [Studio Godsey]',
    role: 'Mobile UX, Growth'
  },
  {
    year: '20',
    company: 'Rigup',
    role: 'Mobile UX, Visual'
  },
  {
    year: '19',
    company: 'Avocode',
    role: 'Web UX, Growth'
  },
  {
    year: '18',
    company: 'Avast',
    role: 'Mobile UX, Visual, Testing'
  },
  {
    year: '17',
    company: 'DevCompany',
    role: 'Brand Identity, Web Design'
  },
  {
    year: '16-19',
    company: 'Marvo',
    role: 'Web, Mobile, Lottie Animation'
  }
];

const ExperienceList = () => {
  return (
    <div className="fixed top-8 right-8 z-50 max-w-sm">
      <div className="text-right space-y-2">
        {experiences.map((exp, index) => (
          <div 
            key={index}
            className="text-sm font-mono transition-opacity duration-200 hover:opacity-70"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-end items-start gap-4">
              <div className="text-muted-foreground min-w-[3rem]">{exp.year}</div>
              <div className="text-right">
                <div className="font-medium">{exp.company}</div>
                <div className="text-muted-foreground text-xs">{exp.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceList;
