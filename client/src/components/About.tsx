import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const staggerChildren = {
  initial: { opacity: 0 },
  whileInView: { 
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const valueItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 }
};

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">About Dime Events</h2>
          <div className="w-24 h-1 bg-rose-gold mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            {...fadeIn}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
              alt="Event planners in action" 
              className="rounded-md shadow-lg w-full h-auto"
            />
          </motion.div>
          
          <div>
            <motion.h3 
              className="font-playfair text-2xl font-semibold mb-4"
              {...fadeIn}
              viewport={{ once: true }}
            >
              Our Story
            </motion.h3>
            <motion.p 
              className="mb-6 text-gray-700 leading-relaxed"
              {...fadeIn}
              viewport={{ once: true }}
            >
              Dime Events was founded on a simple belief: every special moment deserves extraordinary execution. What began as a passion project has blossomed into a premier event planning company, dedicated to crafting bespoke experiences that reflect the unique personality and vision of each client.
            </motion.p>
            
            <motion.div 
              className="mb-8"
              {...fadeIn}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-playfair text-xl font-semibold mb-3">Our Mission</h4>
              <p className="text-gray-700 leading-relaxed">To transform your ideas into seamless, magical events that exceed expectations and create lasting memories.</p>
            </motion.div>
            
            <motion.div 
              className="mb-8"
              {...fadeIn}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-playfair text-xl font-semibold mb-3">Our Vision</h4>
              <p className="text-gray-700 leading-relaxed">To be the most trusted name in event planning, known for our creativity, attention to detail, and unwavering commitment to excellence.</p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              variants={staggerChildren}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <motion.div 
                className="text-center p-4 border border-cream rounded-sm hover:border-rose-gold transition-colors duration-300"
                variants={valueItem}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-gem text-rose-gold text-3xl mb-3"></i>
                <h5 className="font-medium mb-1">Excellence</h5>
                <p className="text-sm text-gray-600">In every detail</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-4 border border-cream rounded-sm hover:border-rose-gold transition-colors duration-300"
                variants={valueItem}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-heart text-rose-gold text-3xl mb-3"></i>
                <h5 className="font-medium mb-1">Passion</h5>
                <p className="text-sm text-gray-600">For perfect moments</p>
              </motion.div>
              
              <motion.div 
                className="text-center p-4 border border-cream rounded-sm hover:border-rose-gold transition-colors duration-300"
                variants={valueItem}
                transition={{ duration: 0.3 }}
              >
                <i className="fas fa-lightbulb text-rose-gold text-3xl mb-3"></i>
                <h5 className="font-medium mb-1">Creativity</h5>
                <p className="text-sm text-gray-600">Without boundaries</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
