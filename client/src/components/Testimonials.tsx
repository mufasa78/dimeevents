import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  title: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Dime Events transformed our wedding day into an absolute dream. Every detail was executed flawlessly, allowing us to truly enjoy every moment without worry. The team's creativity and professionalism exceeded our expectations.",
    name: "Sarah & Michael",
    title: "Wedding Clients",
    rating: 5
  },
  {
    id: 2,
    text: "Our company's annual gala had never looked so elegant until we hired Dime Events. Their team understood our corporate culture and created an atmosphere that perfectly balanced professionalism with celebration. Our employees are still talking about it!",
    name: "Jonathan Reynolds",
    title: "CEO, Innovate Technologies",
    rating: 5
  },
  {
    id: 3,
    text: "Planning my daughter's sweet sixteen from overseas seemed impossible until we found Dime Events. Their communication was impeccable, and they created a celebration that perfectly captured my daughter's personality. It was worth every penny!",
    name: "Olivia Martinez",
    title: "Birthday Celebration Client",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Automatic rotation
  useEffect(() => {
    const startAutoRotation = () => {
      intervalRef.current = window.setInterval(() => {
        nextSlide();
      }, 6000);
    };

    startAutoRotation();

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Reset interval on manual navigation
  const resetInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        nextSlide();
      }, 6000);
    }
  };

  const handlePrev = () => {
    prevSlide();
    resetInterval();
  };

  const handleNext = () => {
    nextSlide();
    resetInterval();
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
          <div className="w-24 h-1 bg-rose-gold mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-700">
            Don't just take our word for it. Hear what our clients have to say about their experience with Dime Events.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="testimonial-container relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="rounded-sm bg-white p-8 shadow-md"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-6 text-rose-gold">
                    <i className="fas fa-quote-left text-4xl"></i>
                  </div>
                  
                  <p className="text-gray-700 text-lg italic mb-6 text-center">
                    "{testimonials[currentSlide].text}"
                  </p>
                  
                  <div className="flex items-center mb-2">
                    <div className="text-rose-gold mr-1">
                      {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                  </div>
                  
                  <h4 className="font-playfair font-semibold text-xl">{testimonials[currentSlide].name}</h4>
                  <p className="text-gray-600">{testimonials[currentSlide].title}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`testimonial-dot w-3 h-3 rounded-full mx-2 transition-colors duration-300 ${
                  currentSlide === index ? 'bg-rose-gold' : 'bg-gray-300'
                }`}
                onClick={() => {
                  goToSlide(index);
                  resetInterval();
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 md:-ml-12">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-charcoal hover:text-rose-gold focus:outline-none transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 md:-mr-12">
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-charcoal hover:text-rose-gold focus:outline-none transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
