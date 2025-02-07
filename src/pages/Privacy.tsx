import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const lastUpdated = "March 15, 2024";

export default function Privacy() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Shield className="w-16 h-16 mx-auto mb-6 icon-theme" />
          <h1 className="text-4xl font-bold mb-4 neon-text">Privacy Policy</h1>
          <p className="text-gray-300">Last updated: {lastUpdated}</p>
        </motion.div>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold mb-4 neon-text">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal Information: Name, email address, contact details, and other information you provide voluntarily.</li>
              <li>Technical Data: IP address, browser type, device details, and website usage statistics through cookies and analytics tools.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 neon-text">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To improve website functionality and provide personalized recommendations.</li>
              <li>To communicate updates, promotions, and AI-related services.</li>
              <li>To ensure the security and performance of our website.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 neon-text">Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, update, or delete your personal information.</li>
              <li>Opt out of marketing communications at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 neon-text">Data Security</h2>
            <p>
              We implement encryption and secure storage practices to protect your information.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}