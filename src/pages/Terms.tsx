import { motion } from 'framer-motion';
import { ScrollText } from 'lucide-react';

const lastUpdated = "March 15, 2024";

export default function Terms() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <ScrollText className="w-16 h-16 mx-auto mb-6 icon-theme" />
          <h1 className="text-4xl font-bold mb-4 neon-text">Terms & Conditions</h1>
          <p className="text-gray-300">Last updated: {lastUpdated}</p>
        </motion.div>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold mb-4 neon-text">Welcome to Spearsoft AI!</h2>
            <p>
              By accessing and using Spearsoft AI's services, you accept and agree to be bound by these Terms and Conditions and our Privacy Policy.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 neon-text">Our Services</h2>
            <p>
              We offer AI-driven projects, resources, and tools for businesses and individuals. All content is provided as-is without guarantees of performance or specific results.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 neon-text">User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and truthful information when interacting with us.</li>
              <li>Avoid using the website for unlawful purposes or activities such as hacking or spamming.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 neon-text">Disclaimers</h2>
            <p>
              We are not liable for errors, service interruptions, or any damages resulting from the use of this website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}