import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface PricingPackage {
  title: string;
  subtitle: string;
  price: string;
  isPopular?: boolean;
  features: Array<{
    included: boolean;
    text: string;
  }>;
}

const packages: PricingPackage[] = [
  {
    title: "Essential",
    subtitle: "Perfect for simpler events",
    price: "1,499",
    features: [
      { included: true, text: "Initial consultation & planning" },
      { included: true, text: "Vendor recommendations" },
      { included: true, text: "Event timeline creation" },
      { included: true, text: "Day-of coordination (8 hours)" },
      { included: false, text: "Decor & design planning" },
      { included: false, text: "Vendor management" }
    ]
  },
  {
    title: "Premium",
    subtitle: "For special celebrations",
    price: "3,499",
    isPopular: true,
    features: [
      { included: true, text: "Everything in Essential package" },
      { included: true, text: "Full decor & design planning" },
      { included: true, text: "Complete vendor management" },
      { included: true, text: "Guest RSVP management" },
      { included: true, text: "Day-of coordination (12 hours)" },
      { included: false, text: "Custom event website" }
    ]
  },
  {
    title: "Luxury",
    subtitle: "For extraordinary events",
    price: "5,999",
    features: [
      { included: true, text: "Everything in Premium package" },
      { included: true, text: "Custom event website" },
      { included: true, text: "VIP vendor access" },
      { included: true, text: "Unlimited planning hours" },
      { included: true, text: "Full weekend coordination" },
      { included: true, text: "Post-event services" }
    ]
  }
];

export default function Pricing() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleDownloadBrochure = () => {
    // In a real implementation, this would download a PDF file
    alert("Brochure download would start here (this is a placeholder for the actual download functionality)");
  };

  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Our Packages</h2>
          <div className="w-24 h-1 bg-rose-gold mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-700">
            We offer flexible packages to accommodate different needs and budgets. Each package can be customized to create your perfect event.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {packages.map((pkg, index) => (
            <motion.div 
              key={index}
              className={`border ${pkg.isPopular ? 'border-2 border-rose-gold' : 'border-gray-200'} rounded-sm overflow-hidden transition-transform duration-300 hover:-translate-y-2 relative`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-rose-gold text-white text-xs py-1 px-3 rounded-bl-sm">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className="bg-cream p-8 text-center">
                <h3 className="font-playfair text-2xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-gray-600 mb-4">{pkg.subtitle}</p>
                <div className="font-playfair font-bold text-4xl text-charcoal">
                  <span className="text-lg align-top">$</span>{pkg.price}
                </div>
              </div>
              
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-start ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                      <i className={`${feature.included ? 'fas fa-check text-rose-gold' : 'fas fa-times'} mr-3 mt-1`}></i>
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={pkg.isPopular ? "roseGold" : "charcoal"} 
                  className="w-full"
                  onClick={() => scrollToSection('contact')}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12 bg-cream p-8 rounded-sm shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="font-playfair text-2xl font-semibold mb-3">Need a custom package?</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            We understand that every event is unique. Contact us to discuss your specific needs and we'll create a tailored package just for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="roseGold" size="lg" onClick={() => scrollToSection('contact')}>
              Contact Us
            </Button>
            <Button variant="outline" size="lg" onClick={handleDownloadBrochure}>
              Download Brochure
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
