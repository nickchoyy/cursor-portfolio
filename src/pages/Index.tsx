
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
      
      {/* Hero Section - relative positioning for contact/experience */}
      <section className="relative min-h-screen">
        <ContactInfo />
        <ExperienceList />
        <HeroCenter />
      </section>

      {/* Parallax Columns Section - takes over when scrolled to */}
      <ParallaxColumns />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
