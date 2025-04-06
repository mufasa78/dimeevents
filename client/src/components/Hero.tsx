import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Navbar height plus padding
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1748&q=80" 
          alt="Elegant event setting" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      <motion.div 
        className="container mx-auto px-4 z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Creating Moments <br className="hidden md:block" /> That Matter
        </h1>
        <p className="text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          We transform your vision into unforgettable experiences with meticulous attention to detail and creative excellence.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="roseGold" 
            size="lg" 
            onClick={() => scrollToSection('contact')}
            className="font-medium"
          >
            Get Started
          </Button>
          <Button 
            variant="transparent" 
            size="lg" 
            onClick={() => scrollToSection('portfolio')}
            className="font-medium"
          >
            View Our Work
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
