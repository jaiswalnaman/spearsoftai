import { motion } from 'framer-motion';
import { Cpu, Mail, MessageSquare, Mic, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: MessageSquare,
    title: 'AI Chatbots',
    description: 'Intelligent conversational agents that understand context and provide personalized responses.',
    features: ['Natural Language Processing', '24/7 Availability', 'Multi-language Support', 'Custom Training'],
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=600',
    link: '/services/chatbot'
  },
  {
    icon: Mic,
    title: 'Voice Agents',
    description: 'Advanced voice recognition and synthesis for natural human-AI interaction.',
    features: ['Speech Recognition', 'Voice Synthesis', 'Emotion Detection', 'Accent Adaptation'],
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=600',
    link: '/services/voice-agent'
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Streamline your business processes with intelligent automation solutions.',
    features: ['Process Optimization', 'Task Automation', 'Performance Analytics', 'Custom Workflows'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600',
    link: '/services/workflow'
  },
  {
    icon: Cpu,
    title: 'AI Integration',
    description: 'Integrating AI capabilities into your existing systems to improve efficiency and decision-making.',
    features: ['System Integration', 'AI Model Deployment', 'Data Insights and Analytics', 'Scalable Solutions'],
    image: 'https://digpu.com/wp-content/uploads/2023/04/OpenAI-Invests-In-Robotics-Company-1X-for-AI-Integrated-Physical-Robots.jpg',
    link: '/services/AIintegration'
  },
  {
    icon: Mail,
    title: 'Email Automation',
    description: 'Enhance your email marketing and customer engagement with AI-driven email automation.',
    features: ['Personalized Emails', 'Automated Campaigns', 'Advanced Analytics', 'Real-time Tracking'],
    image: 'https://th.bing.com/th/id/R.095cef044bf7a912aca89229162c7b5b?rik=k2f6nV5Corp9mQ&riu=http%3a%2f%2ffuturetek.in%2fwp-content%2fuploads%2fsites%2f78%2f2020%2f06%2fBulk-messaging.png&ehk=dwUMwcvETwgGtRzF0jzdAZqGXDMSmRqJhhAbA1vpU%2b0%3d&risl=&pid=ImgRaw&r=0',
    link: '/services/email-automation'
  }
];

export default function Services() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 grid-background">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6 neon-text">Our Services</h1>
            <p className="text-xl text-gray-300">
              Comprehensive AI solutions tailored to your business needs
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-20 last:mb-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <service.icon className="w-12 h-12 mb-4 icon-theme" />
                  <h2 className="text-3xl font-bold mb-4 neon-text">{service.title}</h2>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-gray-300">
                        <span className="w-2 h-2 rounded-full mr-3 bullet-point" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to={service.link}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="neon-button mt-8"
                    >
                      Learn More
                    </motion.button>
                  </Link>
                </div>
                <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="rounded-lg neon-border"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}