import ContactSection from "../../landing_page/Contact";
import DualActionSection from "../../landing_page/Dual";
import HeroScreen from "../../landing_page/Hero";
import IntelligentWorkflow from "../../landing_page/HowItWorks";
import Stats from "../../landing_page/Stats";
import Testimonials from "../../landing_page/Testimonials";

const Home = () => {
  return (
    <div>
      <HeroScreen />
      <Stats />
      <IntelligentWorkflow />
      <Testimonials />
      <DualActionSection />
      <ContactSection />
    </div>
  );
};

export default Home;
