import { motion } from 'framer-motion';
import { MessageSquare, Mail, Mic, Users, ArrowRight, CheckCircle, Bot, Zap, BarChart, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Mail,
    title: 'Email Automation',
    description: 'Smart email management and campaign automation powered by AI.',
    features: [
      'Personalized message crafting based on customer data',
      'Automated follow-up scheduling',
      'Performance analytics and tracking',
      'Smart response suggestions'
    ],
    benefits: [
      { icon: Zap, title: 'Increased Efficiency', text: 'Automate repetitive tasks' },
      { icon: Brain, title: 'Smart Personalization', text: 'AI-driven content' },
      { icon: BarChart, title: 'Analytics', text: 'Track performance' }
    ],
    image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=800',
    link: '/services/email-automation'
  },
  {
    icon: Mic,
    title: 'Voice Agents',
    description: 'Advanced voice recognition and natural language processing solutions.',
    features: [
      'Natural language understanding',
      '24/7 automated support',
      'Platform integration (Teams, Zoom)',
      'Real-time meeting assistance'
    ],
    benefits: [
      { icon: Bot, title: 'AI Assistant', text: '24/7 availability' },
      { icon: Users, title: 'Multi-platform', text: 'Seamless integration' },
      { icon: Brain, title: 'Smart Learning', text: 'Continuous improvement' }
    ],
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800',
    link: '/services/voice-agent'
  },
  {
    icon: MessageSquare,
    title: 'AI Chatbots',
    description: 'Intelligent conversational agents for enhanced customer engagement.',
    features: [
      'Context and sentiment awareness',
      'Omnichannel support integration',
      'Self-learning capabilities',
      'Real-time issue resolution'
    ],
    benefits: [
      { icon: Zap, title: 'Instant Response', text: 'Real-time support' },
      { icon: Brain, title: 'Context Aware', text: 'Smart conversations' },
      { icon: BarChart, title: 'Analytics', text: 'Performance tracking' }
    ],
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800',
    link: '/services/chatbot'
  }
];

export default function Communication() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 grid-background">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MessageSquare className="w-16 h-16 mx-auto mb-6 icon-theme" />
            <h1 className="text-5xl font-bold mb-6 neon-text">Communication & Productivity</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leverage artificial intelligence to enhance how your organization interacts internally and with customers. 
              Our solutions are engineered to boost efficiency, foster collaboration, and drive seamless communication.
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
                        Learn More
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