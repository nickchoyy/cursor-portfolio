
import ContactInfo from '../components/ContactInfo';
import ExperienceList from '../components/ExperienceList';
import HeroCenter from '../components/HeroCenter';
import ParallaxColumns from '../components/ParallaxColumns';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section - relative positioning for contact/experience */}
      <section className="relative min-h-screen">
        <ContactInfo />
        <ExperienceList />
        <HeroCenter />
      </section>

      {/* Parallax Columns Section - takes over when scrolled to */}
      <ParallaxColumns />
      
      {/* Reduced height for scrolling content */}
      <div className="h-[200vh]"></div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
