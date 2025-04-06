import { Link } from 'wouter';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.substring(1));
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-charcoal text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <span className="font-playfair text-2xl font-bold text-rose-gold">Dime</span>
              <span className="font-playfair text-2xl font-bold text-white ml-1">Events</span>
            </div>
            
            <p className="text-gray-400 mb-6">Creating moments that matter since 2010. Our passion is turning your vision into unforgettable experiences.</p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-rose-gold transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              
              <a href="#" className="text-gray-400 hover:text-rose-gold transition duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              
              <a href="#" className="text-gray-400 hover:text-rose-gold transition duration-300">
                <i className="fab fa-pinterest-p"></i>
              </a>
              
              <a href="#" className="text-gray-400 hover:text-rose-gold transition duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Quick Links</h4>
            
            <ul className="space-y-2">
              {[
                { href: '#hero', label: 'Home' },
                { href: '#about', label: 'About Us' },
                { href: '#services', label: 'Services' },
                { href: '#portfolio', label: 'Portfolio' },
                { href: '#testimonials', label: 'Testimonials' },
                { href: '#pricing', label: 'Pricing' },
                { href: '#contact', label: 'Contact' }
              ].map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-gray-400 hover:text-rose-gold transition duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Services</h4>
            
            <ul className="space-y-2">
              {[
                'Weddings',
                'Corporate Events',
                'Social Celebrations',
                'Luxury Experiences',
                'Design & Decor',
                'Event Consultation'
              ].map((service) => (
                <li key={service}>
                  <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('#services'); }} className="text-gray-400 hover:text-rose-gold transition duration-300">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Contact</h4>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-rose-gold mr-3 mt-1"></i>
                <span className="text-gray-400">123 Elegance Avenue, Suite 200<br/>New York, NY 10001</span>
              </li>
              
              <li className="flex items-start">
                <i className="fas fa-phone-alt text-rose-gold mr-3 mt-1"></i>
                <span className="text-gray-400">(212) 555-7890</span>
              </li>
              
              <li className="flex items-start">
                <i className="fas fa-envelope text-rose-gold mr-3 mt-1"></i>
                <span className="text-gray-400">hello@dimeevents.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Dime Events. All rights reserved.</p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-rose-gold transition duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-rose-gold transition duration-300">Terms of Service</a>
            <a href="#" className="hover:text-rose-gold transition duration-300">Cookie Policy</a>
            <a href="#" className="hover:text-rose-gold transition duration-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
