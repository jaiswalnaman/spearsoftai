import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      <Mail className="w-16 h-16 mx-auto mb-6 icon-theme" />
      <h1 className="text-4xl font-bold mb-4 neon-text">
        Email Campaign Tool
      </h1>
      <p className="text-gray-300">
        Create and send personalized email campaigns
      </p>
    </motion.div>
  );
}