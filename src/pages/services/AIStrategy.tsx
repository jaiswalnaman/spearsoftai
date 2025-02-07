import { motion } from 'framer-motion';
import { Brain, Target, BarChart, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Brain,
    title: 'AI Readiness Assessment',
    description: 'Evaluate your organization\'s AI maturity and identify opportunities for implementation.'
  },
  {
    icon: Target,
    title: 'Strategic Planning',
    description: 'Develop comprehensive AI roadmaps aligned with your business objectives.'
  },
  {
    icon: BarChart,
    title: 'ROI Analysis',
    description: 'Measure and forecast the impact of AI investments on your business.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Workshop',
    description: 'Collaborative sessions to explore AI use cases specific to your industry.'
  }
];

export default function AIStrategy() {
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
            <h1 className="text-5xl font-bold mb-6 neon-text">AI Strategy Consulting</h1>
            <p className="text-xl text-gray-300">
              Transform your business with data-driven AI strategies
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
                Schedule Consultation
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}