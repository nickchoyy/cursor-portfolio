import React, { useState } from 'react';
import ContactInfo from '../components/ContactInfo';
import ExperienceList from '../components/ExperienceList';
import HeroCenter from '../components/HeroCenter';
import ParallaxColumns from '../components/ParallaxColumns';
import DarkModeToggle from '../components/DarkModeToggle';
import LoadingScreen from '../components/LoadingScreen';
import DarkModeTransition from '../components/DarkModeTransition';
import AsciiSky from '../components/AsciiSky';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <DarkModeTransition />
      <AsciiSky />
      
      <div className="bg-background text-foreground">
        <DarkModeToggle />
        
        {/* Hero Section - reduced height */}
        <section className="relative h-screen">
          <ContactInfo />
          <ExperienceList />
          <HeroCenter />
        </section>

        {/* Parallax Columns Section - moved up */}
        <section className="-mt-32 relative z-20">
          <ParallaxColumns />
        </section>
      </div>
    </>
  );
};

export default Index;
