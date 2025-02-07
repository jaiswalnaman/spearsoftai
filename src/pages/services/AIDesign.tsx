import { motion } from 'framer-motion';
import { Palette, Image, Layout, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Palette,
    title: 'AI-Generated Graphics',
    description: 'Create unique visuals powered by advanced AI algorithms.'
  },
  {
    icon: Image,
    title: 'Image Enhancement',
    description: 'Automatically enhance and optimize your visual content.'
  },
  {
    icon: Layout,
    title: 'Layout Generation',
    description: 'Generate professional layouts for various design needs.'
  },
  {
    icon: Wand2,
    title: 'Style Transfer',
    description: 'Apply artistic styles to your designs using AI.'
  }
];

export default function AIDesign() {
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
            <h1 className="text-5xl font-bold mb-6 neon-text">AI-Powered Design</h1>
            <p className="text-xl text-gray-300">
              Transform your creative process with AI-powered design tools
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="service-card"
              >
                <feature.icon className="w-12 h-12 mb-4 icon-theme" />
                <h3 className="text-xl font-bold mb-3 neon-text">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neon-button"
              >
                Start Designing
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}