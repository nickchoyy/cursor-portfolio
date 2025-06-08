
import ContactInfo from '../components/ContactInfo';
import ExperienceList from '../components/ExperienceList';
import HeroCenter from '../components/HeroCenter';
import ParallaxColumns from '../components/ParallaxColumns';

const Index = () => {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <ContactInfo />
        <ExperienceList />
        <HeroCenter />
      </section>

      {/* Parallax Columns Section - takes over when scrolled to */}
      <ParallaxColumns />
      
      {/* Additional height to enable infinite scrolling */}
      <div className="h-[500vh]"></div>
    </div>
  );
};

export default Index;
