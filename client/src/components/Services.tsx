import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

const services: ServiceProps[] = [
  {
    icon: "fas fa-glass-cheers",
    title: "Weddings & Engagements",
    description: "We transform your love story into a magnificent celebration, handling everything from venue selection to the last dance.",
    features: ["Full-service wedding planning", "Destination weddings", "Engagement parties"]
  },
  {
    icon: "fas fa-building",
    title: "Corporate Events",
    description: "Elevate your business gatherings with professional planning that aligns with your company's goals and culture.",
    features: ["Conferences & seminars", "Product launches", "Team building retreats"]
  },
  {
    icon: "fas fa-birthday-cake",
    title: "Social Celebrations",
    description: "Create memorable moments for life's special milestones with personalized planning and exquisite execution.",
    features: ["Birthday parties", "Anniversary celebrations", "Graduation parties"]
  },
  {
    icon: "fas fa-utensils",
    title: "Catering & Cuisine",
    description: "Delight your guests with exceptional food experiences, tailored menus, and impeccable service.",
    features: ["Custom menu design", "Beverage packages", "Specialty dining experiences"]
  },
  {
    icon: "fas fa-palette",
    title: "Design & Decor",
    description: "Transform spaces into breathtaking environments that capture your vision and create the perfect ambiance.",
    features: ["Theme development", "Floral arrangements", "Lighting and atmosphere"]
  },
  {
    icon: "fas fa-camera",
    title: "Media & Entertainment",
    description: "Capture your special moments and keep your guests engaged with top-tier entertainment options.",
    features: ["Photography & videography", "DJ & live music", "Interactive experiences"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function Services() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-rose-gold mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-700">
            We offer comprehensive event planning services tailored to your specific needs and vision. From intimate gatherings to grand celebrations, we handle every detail with care and precision.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} onLearnMore={() => scrollToSection('contact')} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service, onLearnMore }: { service: ServiceProps, onLearnMore: () => void }) {
  return (
    <motion.div 
      className="service-card bg-white p-8 rounded-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      variants={cardVariants}
    >
      <div className="text-rose-gold mb-4">
        <i className={cn(service.icon, "text-4xl")}></i>
      </div>
      <h3 className="font-playfair text-xl font-semibold mb-3">{service.title}</h3>
      <p className="text-gray-700 mb-4">{service.description}</p>
      <ul className="text-gray-600 space-y-2 mb-6">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <i className="fas fa-check text-rose-gold mr-2 mt-1"></i>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button 
        onClick={onLearnMore}
        className="text-rose-gold font-medium hover:underline inline-flex items-center transition-all duration-300 hover:translate-x-1"
      >
        Learn More <i className="fas fa-arrow-right ml-2 text-sm"></i>
      </button>
    </motion.div>
  );
}
