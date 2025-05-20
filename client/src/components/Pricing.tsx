import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { downloadBrochure } from "@/lib/downloadBrochure";

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
    title: "Basic",
    subtitle: "Perfect for small gatherings",
    price: "25,000",
    features: [
      { included: true, text: "Initial consultation (2 hours)" },
      { included: true, text: "Local vendor recommendations" },
      { included: true, text: "Basic event timeline" },
      { included: true, text: "Day-of coordination (6 hours)" },
      { included: true, text: "Phone & email support" },
      { included: false, text: "Decor & design planning" }
    ]
  },
  {
    title: "Standard",
    subtitle: "For memorable celebrations",
    price: "45,000",
    isPopular: true,
    features: [
      { included: true, text: "Everything in Basic package" },
      { included: true, text: "Extended consultation (4 hours)" },
      { included: true, text: "Decor & design assistance" },
      { included: true, text: "Vendor coordination" },
      { included: true, text: "Day-of coordination (10 hours)" },
      { included: true, text: "Budget management" }
    ]
  },
  {
    title: "Premium",
    subtitle: "For special occasions",
    price: "85,000",
    features: [
      { included: true, text: "Everything in Standard package" },
      { included: true, text: "Full-service planning" },
      { included: true, text: "Premium vendor network access" },
      { included: true, text: "Comprehensive design planning" },
      { included: true, text: "Full day coordination (12+ hours)" },
      { included: true, text: "Post-event cleanup coordination" }
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
    downloadBrochure();
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
            We offer affordable packages tailored to the Kenyan market to accommodate different needs and budgets. Each package can be customized to create your perfect event while respecting your financial plan.
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
                  <span className="text-lg align-top">KSh</span>{pkg.price}
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
            We understand that every event and budget is unique. As a startup committed to serving all Kenyans, we're flexible and can work with various budgets. Contact us to discuss your specific needs and we'll create an affordable package just for you.
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
