import { motion } from 'framer-motion';
import { Brain, Settings, Rocket, ArrowRight, CheckCircle, Zap, Database, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Brain,
    title: 'Custom Model Development',
    description: 'Tailored AI models designed specifically for your business needs.'
  },
  {
    icon: Settings,
    title: 'Seamless Integration',
    description: 'Effortless integration with your existing applications and workflows.'
  },
  {
    icon: Rocket,
    title: 'Scalable Solutions',
    description: 'AI solutions that grow and evolve with your business.'
  }
];

const benefits = [
  {
    icon: Zap,
    title: 'Process Optimization',
    description: 'Streamline operations with intelligent automation'
  },
  {
    icon: Database,
    title: 'Data Insights',
    description: 'Extract valuable insights from your data'
  },
  {
    icon: BarChart,
    title: 'ROI Focused',
    description: 'Solutions designed for maximum return on investment'
  }
];

const images = [
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600'
];

export default function CustomAI() {
  return (
    <div className="min-h-screen">
      <section className="relative py-32 px-4 grid-background overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={images[0]}
            alt="Custom AI Solutions"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Brain className="w-20 h-20 mx-auto mb-8 icon-theme" />
            <h1 className="text-6xl font-bold mb-6 neon-text">Custom AI Solutions</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Harness the power of artificial intelligence with custom solutions designed specifically for your business needs.
              From machine learning to deep learning, we create AI tools that solve your unique challenges.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neon-button"
              >
                Start Building
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 neon-text">Key Features</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 mt-1 mr-3 icon-theme flex-shrink-0" />
                  <p className="text-gray-300">Personalized AI model development (machine learning, deep learning)</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 mt-1 mr-3 icon-theme flex-shrink-0" />
                  <p className="text-gray-300">Integration with existing applications and workflows</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 mt-1 mr-3 icon-theme flex-shrink-0" />
                  <p className="text-gray-300">Flexible and adaptive solutions that evolve with your business</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 mt-1 mr-3 icon-theme flex-shrink-0" />
                  <p className="text-gray-300">High ROI through process optimization and automation</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-current opacity-75 blur rounded-lg"></div>
              <img
                src={images[1]}
                alt="Custom AI Features"
                className="relative rounded-lg shadow-xl"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg neon-border"
              >
                <benefit.icon className="w-12 h-12 mb-4 icon-theme" />
                <h3 className="text-xl font-bold mb-3 neon-text">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6 neon-text">Ready to Build Your Custom AI Solution?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's create an AI solution that perfectly matches your business requirements and drives growth.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neon-button flex items-center mx-auto"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}