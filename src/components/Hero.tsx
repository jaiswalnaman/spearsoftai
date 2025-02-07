import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] grid-background flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <img src={logo} alt="Spearsoft AI" className="w-20 h-20 mb-8" />
              <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-text">
                Empowering Businesses with AI
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                From vision to validation, we deliver innovation.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neon-button text-lg"
                onClick={() => navigate('/assessment')}
              >
                Get AI Value Assessment
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg neon-border">
              <Mail className="w-16 h-16 mx-auto mb-6 icon-theme" />
              <h2 className="text-2xl font-bold mb-4 neon-text text-center">
                Email Automation
              </h2>
              <p className="text-gray-300 mb-6 text-center">
                Transform your email campaigns with AI-powered automation and personalization.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/email-tool')}
                className="w-full neon-button"
              >
                Try Email Automation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}