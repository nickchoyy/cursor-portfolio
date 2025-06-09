
import ContactInfo from '../components/ContactInfo';
import ExperienceList from '../components/ExperienceList';
import HeroCenter from '../components/HeroCenter';
import ParallaxColumns from '../components/ParallaxColumns';
import Footer from '../components/Footer';
import DarkModeToggle from '../components/DarkModeToggle';

const Index = () => {
  return (
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
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
