import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check } from 'lucide-react';

const services = [
  'Chatbot',
  'Voice Agent',
  'POC',
  'Automation',
  'Others'
];

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    problem: '',
    service: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://hook.eu2.make.com/qh9o2fcy0jpd5u8t66k9h2vyovk05cy7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', problem: '', service: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center"
        >
          <Check className="w-12 h-12 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-4 neon-text">Thank You!</h3>
        <p className="text-gray-300">We'll get back to you shortly.</p>
      </motion.div>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-4xl font-bold text-center mb-12 neon-text">Contact Us</h2>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Business Problem</label>
            <textarea
              rows={4}
              value={formData.problem}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">What Product You Need</label>
            <div className="space-y-2">
              {services.map((service) => (
                <label key={service} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="service"
                    value={service}
                    checked={formData.service === service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="form-radio text-yellow-300 focus:ring-yellow-300"
                  />
                  <span className="text-gray-300">{service}</span>
                </label>
              ))}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full neon-button"
          >
            Submit Your Problem
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}