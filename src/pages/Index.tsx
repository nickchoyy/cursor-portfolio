import React, { useState } from 'react';
import ContactInfo from '../components/ContactInfo';
import ExperienceList from '../components/ExperienceList';
import HeroCenter from '../components/HeroCenter';
import ParallaxColumns from '../components/ParallaxColumns';
import DarkModeToggle from '../components/DarkModeToggle';
import LoadingScreen from '../components/LoadingScreen';
import DarkModeTransition from '../components/DarkModeTransition';
import AsciiSky from '../components/AsciiSky';
import AsciiCursor from '../components/AsciiCursor';

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
      <AsciiCursor />
      
      <div className="bg-background text-foreground">
        <DarkModeToggle />
        
        {/* Hero Section - reduced height */}
        <section className="relative h-screen">
          <ContactInfo />
          <ExperienceList />
          <HeroCenter />
        </section>

        {/* Parallax Columns Section - show peek of images at start */}
        <section className="-mt-16 relative z-20">
          <ParallaxColumns />
        </section>
      </div>
    </>
  );
};

export default Index;
