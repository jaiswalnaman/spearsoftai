import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, PhoneCall, Calendar, UserPlus, Workflow } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon: any;
  question: string;
  calculation: (value: number) => number;
  unit: string;
  source: string;
}

const sections: Section[] = [
  {
    id: 'customer-service',
    title: 'Customer Service AI Agent',
    icon: MessageSquare,
    question: 'How many customer service inquiries do you handle monthly?',
    calculation: (inquiries) => inquiries * 5,
    unit: 'Monthly Savings',
    source: 'According to Juniper Research, chatbots will save businesses $8 billion annually by 2022'
  },
  {
    id: 'virtual-receptionist',
    title: 'Virtual Receptionist',
    icon: PhoneCall,
    question: 'How many hours per week do you spend on call handling?',
    calculation: (hours) => hours * 25 * 4,
    unit: 'Monthly Savings',
    source: 'Harvard Business Review reports that AI can reduce call handling time by up to 40%'
  },
  {
    id: 'appointment-setter',
    title: 'AI Appointment Setter',
    icon: Calendar,
    question: 'How many appointments do you schedule monthly?',
    calculation: (appointments) => appointments * 10,
    unit: 'Monthly Savings',
    source: 'Accenture found that AI scheduling reduces no-shows by 20%'
  },
  {
    id: 'onboarding',
    title: 'One-Click Onboarding',
    icon: UserPlus,
    question: 'How many new clients do you onboard monthly?',
    calculation: (clients) => clients * 100,
    unit: 'Monthly Savings',
    source: 'McKinsey reports that AI automation can reduce onboarding costs by 50-70%'
  },
  {
    id: 'workflow',
    title: 'Workflow Automation',
    icon: Workflow,
    question: 'How many hours per week do you spend on repetitive tasks?',
    calculation: (hours) => hours * 30 * 4,
    unit: 'Monthly Savings',
    source: 'Deloitte research shows automation can save 15-20 hours per employee monthly'
  }
];

export default function AssessmentTool() {
  const [values, setValues] = useState<Record<string, number>>({});
  const [showCalendar, setShowCalendar] = useState(false);

  const handleValueChange = (sectionId: string, value: string) => {
    setValues({
      ...values,
      [sectionId]: parseInt(value) || 0
    });
  };

  const totalSavings = Object.entries(values).reduce((total, [sectionId, value]) => {
    const section = sections.find(s => s.id === sectionId);
    return total + (section ? section.calculation(value) : 0);
  }, 0);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 neon-text">
            AI Value Assessment Tool
          </h1>
          <p className="text-gray-300">Calculate your potential savings with AI automation</p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="service-card group"
            >
              <section.icon className="w-12 h-12 mb-4 icon-theme" />
              <h2 className="text-2xl font-bold mb-4 neon-text">{section.title}</h2>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">{section.question}</label>
                <input
                  type="number"
                  min="0"
                  value={values[section.id] || ''}
                  onChange={(e) => handleValueChange(section.id, e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-gray-100"
                />
              </div>
              {values[section.id] > 0 && (
                <div className="mt-4">
                  <p className="text-xl font-bold neon-text">
                    Potential {section.unit}: ${section.calculation(values[section.id]).toLocaleString()}
                  </p>
                  <p className="text-sm group-hover:text-black mt-2">{section.source}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {totalSavings > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-6 neon-text">
              Total Potential Monthly Savings: ${totalSavings.toLocaleString()}
            </h2>
            <motion.button
              onClick={() => {
                setShowCalendar(true);
                const script = document.createElement('script');
                script.src = 'https://asset-tidycal.b-cdn.net/js/embed.js';
                script.async = true;
                document.body.appendChild(script);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neon-button"
            >
              Book a FREE AI Audit
            </motion.button>
          </motion.div>
        )}

        {showCalendar && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-8 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
              <div className="tidycal-embed" data-path="noreplyspearsoft"></div>
              <button
                onClick={() => setShowCalendar(false)}
                className="mt-4 text-gray-300 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}