import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '5+', label: 'Innovative Products Developed' },
  { value: '2+', label: 'Global Clients Served' },
  { value: '100%', label: 'Customized AI Solutions' }
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section ref={ref} className="py-20 px-4 bg-gray-800/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold mb-2 neon-text">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
              <div className="mt-4 w-full max-w-xs mx-auto h-1 bg-gray-700 rounded">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={isInView ? { width: '100%' } : { width: '0%' }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="h-full rounded neon-border"
                  style={{ backgroundColor: 'var(--theme-color)' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}