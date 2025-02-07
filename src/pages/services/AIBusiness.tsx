import { motion } from 'framer-motion';
import { Brain, Database, Workflow, Bot, Zap, BarChart, Link as LinkIcon, ArrowRight, CheckCircle, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const solutions = [
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Seamlessly integrate AI capabilities into your existing systems.',
    features: [
      'Real-time data analysis and trend prediction',
      'Integration with ERP and CRM systems',
      'Predictive analytics and machine learning',
      'Scalable and future-proof solutions'
    ],
    link: '/services/ai-integration',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: Database,
    title: 'Custom AI Solutions',
    description: 'Build tailored AI solutions for your unique business challenges.',
    features: [
      'Bespoke AI model development',
      'End-to-end implementation support',
      'Supply chain optimization',
      'Quality control automation'
    ],
    link: '/services/custom-ai',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80'
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Streamline operations with intelligent process automation.',
    features: [
      'AI-driven process optimization',
      'Robotic Process Automation (RPA)',
      'Adaptive workflow intelligence',
      'Employee task optimization'
    ],
    link: '/services/workflow',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'
  }
];

const benefits = [
  {
    icon: Zap,
    title: 'Enhanced Efficiency',
    description: 'Automate routine tasks and streamline complex processes'
  },
  {
    icon: BarChart,
    title: 'Data-Driven Insights',
    description: 'Make informed decisions with predictive analytics'
  },
  {
    icon: LinkIcon,
    title: 'Seamless Integration',
    description: 'Connect with your existing systems and workflows'
  },
  {
    icon: Bot,
    title: 'Future-Ready',
    description: 'Scale and adapt as your business grows'
  }
];

const stats = [
  {
    icon: TrendingUp,
    value: '45%',
    label: 'Average Efficiency Increase'
  },
  {
    icon: CheckCircle,
    value: '99.9%',
    label: 'System Reliability'
  },
  {
    icon: Shield,
    value: '100%',
    label: 'Data Security'
  }
];

export default function AIBusiness() {
  return (
    <div className="min-h-screen">
      <section className="relative py-32 px-4 grid-background overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
            alt="AI Background"
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
            <h1 className="text-6xl font-bold mb-6 neon-text">AI for Business</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Revolutionize your organization by integrating advanced AI technologies into everyday processes. 
              Unlock valuable insights and automate repetitive tasks so your team can focus on innovation and growth.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="neon-button"
                >
                  Get Started
                </motion.button>
              </Link>
              <Link to="/assessment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-transparent border rounded-md transition-all duration-300 neon-border text-white hover:bg-white/10"
                >
                  Free Assessment
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-20">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-current to-transparent opacity-75 blur"></div>
                      <div className="relative">
                        <solution.icon className="w-16 h-16 mb-6 icon-theme" />
                        <h2 className="text-3xl font-bold mb-4 neon-text">{solution.title}</h2>
                        <p className="text-gray-300 mb-6 text-lg">{solution.description}</p>
                        <ul className="space-y-4 mb-8">
                          {solution.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center text-gray-300">
                              <CheckCircle className="w-5 h-5 mr-3 icon-theme flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Link to={solution.link}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="neon-button flex items-center"
                          >
                            Learn More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-current opacity-75 blur group-hover:opacity-100 transition-opacity rounded-lg"></div>
                      <div className="relative">
                        <img
                          src={solution.image}
                          alt={solution.title}
                          className="w-full h-80 object-cover rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                    <div className="mt-8 bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg neon-border">
                      <h3 className="text-xl font-bold mb-4 neon-text">Key Benefits</h3>
                      <ul className="space-y-4">
                        {benefits.map((benefit, bIndex) => (
                          <li key={bIndex} className="flex items-start">
                            <benefit.icon className="w-5 h-5 mt-1 mr-3 icon-theme" />
                            <div>
                              <h4 className="font-semibold mb-1 neon-text">{benefit.title}</h4>
                              <p className="text-gray-300 text-sm">{benefit.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 bg-black/50 rounded-lg neon-border"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 icon-theme" />
                <div className="text-4xl font-bold mb-2 neon-text">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 neon-text">Ready to Transform Your Business?</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Let's discuss how our AI solutions can help you achieve your business goals.
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
        </div>
      </section>
    </div>
  );
}