import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';

const lastUpdated = "March 15, 2024";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Cookie className="w-16 h-16 mx-auto mb-6 icon-theme" />
          <h1 className="text-4xl font-bold mb-4 neon-text">Cookie Policy</h1>
          <p className="text-gray-300">Last updated: {lastUpdated}</p>
        </motion.div>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold mb-4 neon-text">What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience and understand how you interact with our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 neon-text">How We Use Cookies</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Essential cookies for website functionality</li>
              <li>Analytics cookies to understand user behavior</li>
              <li>Preference cookies to remember your settings</li>
              <li>Marketing cookies for targeted advertising</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 neon-text">Managing Cookies</h2>
            <p>
              You can control and manage cookies in your browser settings. Please note that removing or blocking cookies may impact your user experience on our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}