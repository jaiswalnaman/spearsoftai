import { motion } from 'framer-motion';
import { FileText, Map, Brain, ArrowRight, CheckCircle, Sparkles, Calendar, Compass, Plane, Hotel, Coffee, Mountain } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: FileText,
    title: 'AI Resume Builder',
    description: 'Create professional resumes effortlessly with AI-powered assistance.',
    features: [
      'Instant resume generation',
      'Multiple format options',
      'Industry-specific templates',
      'Grammar and optimization checks'
    ],
    benefits: [
      { icon: Sparkles, title: 'AI Writing', text: 'Smart content' },
      { icon: Brain, title: 'Optimization', text: 'ATS-friendly' },
      { icon: Calendar, title: 'Quick', text: 'Save time' }
    ],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800',
    link: '/services/resume-builder'
  },
  {
    icon: Map,
    title: 'AI Travel Planner',
    description: 'Plan your perfect trip with intelligent travel recommendations.',
    features: [
      'Personalized itineraries',
      'Real-time pricing updates',
      'Local attractions integration',
      'Seamless booking experience'
    ],
    benefits: [
      { icon: Compass, title: 'Smart Routes', text: 'Optimal planning' },
      { icon: Hotel, title: 'Best Stays', text: 'Curated hotels' },
      { icon: Coffee, title: 'Local Spots', text: 'Hidden gems' }
    ],
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800',
    link: '/services/travel-planner'
  },
  {
    icon: Plane,
    title: 'Adventure Planning',
    description: 'Discover unique experiences with AI-powered adventure recommendations.',
    features: [
      'Activity matching',
      'Weather integration',
      'Equipment suggestions',
      'Safety guidelines'
    ],
    benefits: [
      { icon: Mountain, title: 'Adventures', text: 'Unique experiences' },
      { icon: Brain, title: 'Smart Match', text: 'Personalized' },
      { icon: Calendar, title: 'Scheduling', text: 'Perfect timing' }
    ],
    image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&w=800',
    link: '/services/travel-planner'
  }
];

export default function AIPowered() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 grid-background">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Brain className="w-16 h-16 mx-auto mb-6 icon-theme" />
            <h1 className="text-5xl font-bold mb-6 neon-text">AI-Powered Services</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience intelligent solutions that make your daily tasks easier and more efficient. 
              Our AI-powered services are designed to enhance productivity and deliver exceptional results.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className={index % 2 === 0 ? 'md:order-1' : 'md:order-2'}>
                    <service.icon className="w-12 h-12 mb-6 icon-theme" />
                    <h2 className="text-3xl font-bold mb-4 neon-text">{service.title}</h2>
                    <p className="text-gray-300 mb-6 text-lg">{service.description}</p>
                    <div className="space-y-4 mb-8">
                      {service.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 mt-1 mr-3 icon-theme flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link to={service.link}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="neon-button flex items-center"
                      >
                        Try Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </motion.button>
                    </Link>
                  </div>
                  <div className={index % 2 === 0 ? 'md:order-2' : 'md:order-1'}>
                    <div className="space-y-6">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-current opacity-75 blur group-hover:opacity-100 transition-opacity rounded-lg"></div>
                        <div className="relative">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {service.benefits.map((benefit, bIndex) => (
                          <div key={bIndex} className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-lg neon-border">
                            <benefit.icon className="w-8 h-8 mb-2 icon-theme" />
                            <h4 className="font-semibold neon-text mb-1">{benefit.title}</h4>
                            <p className="text-sm text-gray-300">{benefit.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}