import { motion } from 'framer-motion';
import { Cpu, Mail, MessageSquare, Mic, Workflow, Palette, Briefcase, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Briefcase,
    title: 'AI for Business',
    description: 'Revolutionize operations with AI-driven transformation.',
    features: [
      'Data-Driven Decision Making',
      'Process Optimization',
      'Scalable AI Solutions'
    ],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600',
    link: '/services/ai-integration'
  },
  {
    icon: MessageSquare,
    title: 'Communication & Productivity',
    description: 'Enhance engagement with intelligent communication solutions.',
    features: [
      'Smart Email Automation',
      'Voice AI Integration',
      'Intelligent Chatbots'
    ],
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600',
    link: '/services/email-automation'
  },
  {
    icon: Palette,
    title: 'Design & Branding',
    description: 'Create professional designs with AI-powered tools.',
    features: [
      'AI Resume Builder',
      'Logo Generation',
      'Brand Identity Design'
    ],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600',
    link: '/services/resume-builder'
  },
  {
    icon: Plane,
    title: 'AI-Powered Services',
    description: 'Experience intelligent solutions for everyday needs.',
    features: [
      'Smart Travel Planning',
      'Personalized Recommendations',
      'Real-time Assistance'
    ],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600',
    link: '/services/travel-planner'
  }
];

export default function Services() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 neon-text">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={index} to={service.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="service-card"
              >
                <service.icon className="w-12 h-12 mb-4 icon-theme" />
                <h3 className="text-xl font-bold mb-3 neon-text">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}