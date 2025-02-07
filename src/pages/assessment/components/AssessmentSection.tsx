import { useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AssessmentSectionProps {
  title: string;
  icon: LucideIcon;
  question: string;
  calculation: (value: number) => { savings: number; source: string };
  onCalculate: (savings: number) => void;
}

export default function AssessmentSection({
  title,
  icon: Icon,
  question,
  calculation,
  onCalculate
}: AssessmentSectionProps) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<{ savings: number; source: string } | null>(null);

  const handleCalculate = () => {
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      const calculatedResult = calculation(numValue);
      setResult(calculatedResult);
      onCalculate(calculatedResult.savings);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="p-6 rounded-lg service-card"
    >
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 mr-3 icon-theme" />
        <h2 className="text-2xl font-bold neon-text">{title}</h2>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 mb-2">{question}</label>
        <div className="flex space-x-4">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{ borderColor: 'var(--theme-color)', boxShadow: '0 0 5px var(--theme-glow)' }}
          />
          <motion.button
            onClick={handleCalculate}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="neon-button"
          >
            Calculate
          </motion.button>
        </div>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4"
        >
          <p className="text-xl mb-2">
            Potential Annual Savings:{' '}
            <span className="font-bold neon-text">
              ${result.savings.toLocaleString()}
            </span>
          </p>
          <p className="text-sm text-gray-400">Source: {result.source}</p>
        </motion.div>
      )}
    </motion.div>
  );
}