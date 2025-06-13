import React, { useState } from 'react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import ScrambleText from './ScrambleText';

// Sample data for different sections
const projects = [
  { name: 'Portfolio Website', tech: 'React, TypeScript, Tailwind', year: '2024' },
  { name: 'E-commerce Platform', tech: 'Next.js, Stripe, PostgreSQL', year: '2024' },
  { name: 'Mobile App', tech: 'React Native, Firebase', year: '2023' },
  { name: 'Design System', tech: 'Figma, Storybook, CSS', year: '2023' },
  { name: 'Data Visualization', tech: 'D3.js, Python, Flask', year: '2022' },
];

const skills = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Figma', 'Adobe Creative Suite',
  'Tailwind CSS', 'Next.js', 'GraphQL', 'PostgreSQL', 'AWS', 'Docker'
];

const achievements = [
  { title: 'Design Award Winner', org: 'UX Awards 2024', type: 'Recognition' },
  { title: 'Open Source Contributor', org: 'React Community', type: 'Contribution' },
  { title: 'Speaker', org: 'Design Conference 2023', type: 'Speaking' },
  { title: 'Mentor', org: 'ADPList', type: 'Teaching' },
];

interface InfiniteScrollDemoProps {
  className?: string;
}

const InfiniteScrollDemo: React.FC<InfiniteScrollDemoProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'achievements'>('projects');

  // Infinite scroll hooks for different data types
  const projectsScroll = useInfiniteScroll(projects, { threshold: 0.75 });
  const skillsScroll = useInfiniteScroll(skills.map(skill => ({ name: skill })), { threshold: 0.8 });
  const achievementsScroll = useInfiniteScroll(achievements, { threshold: 0.7 });

  const tabs = [
    { id: 'projects' as const, label: 'Projects', count: projectsScroll.displayedItems.length },
    { id: 'skills' as const, label: 'Skills', count: skillsScroll.displayedItems.length },
    { id: 'achievements' as const, label: 'Achievements', count: achievementsScroll.displayedItems.length },
  ];

  return (
    <div className={`bg-background border border-border rounded-lg p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-lg font-mono font-semibold mb-2">
          <ScrambleText text="Infinite Scroll Portfolio" />
        </h2>
        <p className="text-sm text-muted-foreground font-mono">
          Scroll to see the magic ✨ Lists duplicate automatically when you reach the bottom
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-muted/20 p-1 rounded-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-2 text-xs font-mono rounded transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div
          ref={projectsScroll.scrollContainerRef}
          className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
        >
          <div className="space-y-3 pr-2">
            {projectsScroll.displayedItems.map((project, index) => (
              <div
                key={`project-${index}`}
                className="p-3 border border-border/50 rounded-md hover:border-border transition-colors group"
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-mono text-sm font-medium group-hover:text-foreground transition-colors">
                    <ScrambleText text={project.name} />
                  </h3>
                  <span className="text-xs text-muted-foreground font-mono">{project.year}</span>
                </div>
                <p className="text-xs text-muted-foreground font-mono">
                  <ScrambleText text={project.tech} />
                </p>
              </div>
            ))}
            {projectsScroll.isLoading && (
              <div className="flex justify-center py-4">
                <div className="animate-spin w-4 h-4 border-2 border-muted-foreground/20 border-t-foreground rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div
          ref={skillsScroll.scrollContainerRef}
          className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
        >
          <div className="grid grid-cols-2 gap-2 pr-2">
            {skillsScroll.displayedItems.map((skill, index) => (
              <div
                key={`skill-${index}`}
                className="px-3 py-2 bg-muted/30 rounded-md text-center hover:bg-muted/50 transition-colors"
              >
                <span className="text-xs font-mono">
                  <ScrambleText text={skill.name} />
                </span>
              </div>
            ))}
            {skillsScroll.isLoading && (
              <div className="col-span-2 flex justify-center py-4">
                <div className="animate-spin w-4 h-4 border-2 border-muted-foreground/20 border-t-foreground rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div
          ref={achievementsScroll.scrollContainerRef}
          className="h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
        >
          <div className="space-y-2 pr-2">
            {achievementsScroll.displayedItems.map((achievement, index) => (
              <div
                key={`achievement-${index}`}
                className="flex items-center gap-3 p-2 hover:bg-muted/20 rounded-md transition-colors group"
              >
                <div className="w-2 h-2 bg-green-500/50 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-mono font-medium group-hover:text-foreground transition-colors">
                    <ScrambleText text={achievement.title} />
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    <ScrambleText text={`${achievement.org} • ${achievement.type}`} />
                  </div>
                </div>
              </div>
            ))}
            {achievementsScroll.isLoading && (
              <div className="flex justify-center py-4">
                <div className="animate-spin w-4 h-4 border-2 border-muted-foreground/20 border-t-foreground rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollDemo; 