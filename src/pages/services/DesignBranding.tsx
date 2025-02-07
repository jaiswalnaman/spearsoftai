import { motion } from 'framer-motion';
import { Palette, Layout, Image, Wand2, ArrowRight, CheckCircle, Sparkles, Brush, Layers, Paintbrush, PenTool, Shapes } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Layout,
    title: 'AI Logo Builder',
    description: 'Create professional, unique logos tailored to your brand identity.',
    features: [
      'Instant brand identity generation',
      'Easy customization tools',
      'Multiple design concepts',
      'High-quality exports'
    ],
    benefits: [
      { icon: Sparkles, title: 'Unique Designs', text: 'AI-generated concepts' },
      { icon: Brush, title: 'Customizable', text: 'Full control' },
      { icon: Layers, title: 'Versatile', text: 'Multiple formats' }
    ],
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800',
    link: '/services/logo-builder'
  },
  {
    icon: Wand2,
    title: 'AI Art Generator',
    description: 'Generate stunning visuals for marketing and content.',
    features: [
      'Original artwork creation',
      'Brand-aligned aesthetics',
      'Multiple style options',
      'Quick generation process'
    ],
    benefits: [
      { icon: Paintbrush, title: 'Style Match', text: 'Brand consistency' },
      { icon: PenTool, title: 'Custom Art', text: 'Unique creations' },
      { icon: Shapes, title: 'Versatile', text: 'Multiple styles' }
    ],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800',
    link: '/contact'
  },
  {
    icon: Image,
    title: 'Visual Branding Tools',
    description: 'Maintain consistent brand identity across all platforms.',
    features: [
      'Automated layout suggestions',
      'Color palette generation',
      'Typography recommendations',
      'Brand style guides'
    ],
    benefits: [
      { icon: Palette, title: 'Color Theory', text: 'Perfect palettes' },
      { icon: Layout, title: 'Smart Layout', text: 'Auto-arrange' },
      { icon: Wand2, title: 'AI Magic', text: 'Smart suggestions' }
    ],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800',
    link: '/contact'
  }
];

export default function DesignBranding() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 grid-background">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Palette className="w-16 h-16 mx-auto mb-6 icon-theme" />
            <h1 className="text-5xl font-bold mb-6 neon-text">Design & Branding</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Create a memorable and consistent visual identity with our AI-powered design and branding services. 
              No extensive design expertise required - just your vision and our intelligent tools.
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
                        Get Started
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