import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
  category: 'weddings' | 'corporate' | 'social';
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Elegant Garden Wedding",
    description: "A romantic outdoor celebration with floral elegance and soft lighting",
    category: "weddings"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Annual Tech Conference",
    description: "Modern design with interactive exhibits for 500+ attendees",
    category: "corporate"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1470753937643-efeb931202a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Luxurious 50th Birthday",
    description: "Gold and black themed gala celebration with custom entertainment",
    category: "social"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Seaside Destination Wedding",
    description: "Intimate beachfront ceremony with natural coastal elements",
    category: "weddings"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Luxury Product Launch",
    description: "Exclusive evening showcasing new luxury collection",
    category: "corporate"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Charity Gala Dinner",
    description: "Sophisticated fundraising event with fine dining experience",
    category: "social"
  }
];

type FilterCategory = 'all' | 'weddings' | 'corporate' | 'social';

const filterButtons: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Weddings', value: 'weddings' },
  { label: 'Corporate', value: 'corporate' },
  { label: 'Social', value: 'social' }
];

export default function Portfolio() {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Our Portfolio</h2>
          <div className="w-24 h-1 bg-rose-gold mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-700">
            Explore our collection of exquisite events, each one uniquely crafted to reflect our clients' vision and style.
          </p>
        </motion.div>
        
        <div className="mb-8">
          <ul className="flex flex-wrap justify-center gap-4" id="portfolio-filter">
            {filterButtons.map((btn) => (
              <li key={btn.value}>
                <button 
                  className={`px-4 py-2 rounded-sm transition-colors ${
                    filter === btn.value 
                      ? 'bg-charcoal text-white' 
                      : 'bg-gray-200 text-charcoal hover:bg-gray-300'
                  }`}
                  onClick={() => setFilter(btn.value)}
                >
                  {btn.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layoutId={`item-${item.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="gallery-item rounded-sm overflow-hidden shadow-md cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="font-playfair text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="text-center mt-12">
          <Button 
            variant="roseGold" 
            size="lg" 
            onClick={() => scrollToSection('contact')}
          >
            Let's Plan Your Event
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="max-w-4xl w-full bg-white rounded-sm overflow-hidden"
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title} 
                className="w-full object-cover max-h-[70vh]"
              />
              <div className="p-6">
                <h3 className="font-playfair text-2xl font-semibold mb-2">{selectedImage.title}</h3>
                <p className="text-gray-700">{selectedImage.description}</p>
              </div>
              <button 
                className="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center text-charcoal hover:text-rose-gold transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
