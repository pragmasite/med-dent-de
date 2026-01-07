import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Hours from "@/components/Hours";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import DisclaimerModal from "@/components/DisclaimerModal";

const Index = () => {
  const location = useLocation();

  // Reset disclaimer when changing language
  useEffect(() => {
    sessionStorage.removeItem("disclaimer-dismissed");
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <DisclaimerModal />
      <Header />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Hours />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
