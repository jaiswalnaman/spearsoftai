import { motion } from 'framer-motion';
import { Cpu, Boxes, Network, Database, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Boxes,
    title: 'System Integration',
    description: 'Seamlessly integrate AI capabilities into your existing infrastructure.'
  },
  {
    icon: Network,
    title: 'AI Model Deployment',
    description: 'Deploy and manage AI models at scale with robust monitoring.'
  },
  {
    icon: Database,
    title: 'Data Processing',
    description: 'Efficient data processing and transformation pipelines.'
  },
  {
    icon: BarChart,
    title: 'Analytics Dashboard',
    description: 'Real-time insights and performance monitoring.'
  }
];

export default function AIintegration() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 grid-background">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Cpu className="w-16 h-16 mx-auto mb-6 icon-theme" />
            <h1 className="text-5xl font-bold mb-6 neon-text">AI Integration Solutions</h1>
            <p className="text-xl text-gray-300">
              Transform your business with seamless AI integration
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
                Start Integration
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}