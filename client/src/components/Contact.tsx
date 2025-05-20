import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { insertContactSubmissionSchema, insertSubscriberSchema } from '@shared/schema';

// Extend the schema with client-side validation
const contactFormSchema = insertContactSubmissionSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

const subscribeFormSchema = insertSubscriberSchema.extend({
  email: z.string().email("Please enter a valid email address"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;
type SubscribeFormValues = z.infer<typeof subscribeFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [eventDate, setEventDate] = useState('');

  // Contact form hook
  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    formState: { errors: contactErrors },
    reset: resetContactForm
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      message: ''
    }
  });

  // Subscribe form hook
  const {
    register: registerSubscribe,
    handleSubmit: handleSubmitSubscribe,
    formState: { errors: subscribeErrors },
    reset: resetSubscribeForm
  } = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      email: ''
    }
  });

  // Contact form mutation
  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us! We'll be in touch soon.",
        variant: "default"
      });
      resetContactForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Subscribe mutation
  const subscribeMutation = useMutation({
    mutationFn: (data: SubscribeFormValues) => {
      return apiRequest('POST', '/api/subscribe', data);
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "You've been successfully subscribed to our newsletter.",
        variant: "default"
      });
      resetSubscribeForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "There was a problem with your subscription. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmitContact = (data: ContactFormValues) => {
    contactMutation.mutate({
      ...data,
      eventDate: eventDate
    });
  };

  const onSubmitSubscribe = (data: SubscribeFormValues) => {
    subscribeMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-charcoal text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-rose-gold mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-300">
            Ready to create an unforgettable event? Contact us today to schedule a consultation and begin planning your perfect celebration.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <form className="space-y-6" onSubmit={handleSubmitContact(onSubmitContact)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full p-3 bg-gray-700 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-gold" 
                    placeholder="John Doe" 
                    {...registerContact('name')}
                  />
                  {contactErrors.name && (
                    <p className="mt-1 text-sm text-red-400">{contactErrors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full p-3 bg-gray-700 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-gold" 
                    placeholder="john@example.com" 
                    {...registerContact('email')}
                  />
                  {contactErrors.email && (
                    <p className="mt-1 text-sm text-red-400">{contactErrors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full p-3 bg-gray-700 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-gold" 
                  placeholder="(123) 456-7890"
                  {...registerContact('phone')}
                />
                {contactErrors.phone && (
                  <p className="mt-1 text-sm text-red-400">{contactErrors.phone.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="event-type" className="block mb-2 text-sm font-medium">Event Type</label>
                <select 
                  id="event-type" 
                  className="w-full p-3 bg-gray-700 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-gold"
                  {...registerContact('eventType')}
                >
                  <option value="" disabled selected>Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="social">Social Celebration</option>
                  <option value="other">Other</option>
                </select>
                {contactErrors.eventType && (
                  <p className="mt-1 text-sm text-red-400">{contactErrors.eventType.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="date" className="block mb-2 text-sm font-medium">Event Date</label>
                <input 
                  type="date" 
                  id="date" 
                  className="w-full p-3 bg-gray-700 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-gold"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">Tell Us About Your Event</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full p-3 bg-gray-700 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-gold" 
                  placeholder="Share your vision, guest count, and any specific requests..."
                  {...registerContact('message')}
                ></textarea>
                {contactErrors.message && (
                  <p className="mt-1 text-sm text-red-400">{contactErrors.message.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                variant="roseGold" 
                className="w-full" 
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
          
          <motion.div 
            className="lg:pl-12"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-12">
              <h3 className="font-playfair text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-rose-gold mr-4 mt-1">
                    <i className="fas fa-map-marker-alt text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Our Office</h4>
                    <p className="text-gray-300">123 Elegance Avenue, Suite 200<br/>New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-rose-gold mr-4 mt-1">
                    <i className="fas fa-phone-alt text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-gray-300">(212) 555-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-rose-gold mr-4 mt-1">
                    <i className="fas fa-envelope text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-gray-300">hello@dimeevents.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-rose-gold mr-4 mt-1">
                    <i className="fas fa-clock text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Business Hours</h4>
                    <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 3:00 PM<br/>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-playfair text-2xl font-semibold mb-6">Follow Us</h3>
              
              <div className="flex space-x-4 mb-8">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-rose-gold transition duration-300">
                  <i className="fab fa-facebook-f"></i>
                </a>
                
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-rose-gold transition duration-300">
                  <i className="fab fa-instagram"></i>
                </a>
                
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-rose-gold transition duration-300">
                  <i className="fab fa-pinterest-p"></i>
                </a>
                
                <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-rose-gold transition duration-300">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-sm">
                <h4 className="font-playfair text-xl font-semibold mb-4">Subscribe to Our Newsletter</h4>
                <p className="text-gray-300 mb-4">Stay updated with event planning tips and exclusive offers.</p>
                
                <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmitSubscribe(onSubmitSubscribe)}>
                  <div className="flex-1">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full p-3 bg-gray-700 text-white rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-gold"
                      {...registerSubscribe('email')}
                    />
                    {subscribeErrors.email && (
                      <p className="mt-1 text-sm text-red-400">{subscribeErrors.email.message}</p>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    variant="roseGold" 
                    disabled={subscribeMutation.isPending}
                    className="whitespace-nowrap"
                  >
                    {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
