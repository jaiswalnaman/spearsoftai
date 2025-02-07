import { motion } from 'framer-motion';
import { Map, Compass, Calendar, ArrowRight, CheckCircle, Plane, Hotel, Coffee, Mountain } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Compass,
    title: 'Smart Itineraries',
    description: 'Personalized travel plans based on your preferences.'
  },
  {
    icon: Calendar,
    title: 'Real-time Updates',
    description: 'Live pricing and availability for bookings.'
  },
  {
    icon: Map,
    title: 'Local Discovery',
    description: 'Find hidden gems and popular attractions.'
  }
];

const benefits = [
  {
    icon: Plane,
    title: 'Easy Planning',
    description: 'Effortless trip organization'
  },
  {
    icon: Hotel,
    title: 'Best Deals',
    description: 'Optimal pricing options'
  },
  {
    icon: Mountain,
    title: 'Unique Experiences',
    description: 'Personalized adventures'
  }
];

const images = [
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600',
  'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=1600'
];

export default function TravelPlanner() {
  return (
    <div className="min-h-screen">
      <section className="relative py-32 px-4 grid-background overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={images[0]}
            alt="AI Travel Planner"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Map className="w-20 h-20 mx-auto mb-8 icon-theme" />
            <h1 className="text-6xl font-bold mb-6 neon-text">AI Travel Planner</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Plan your perfect trip with AI-powered recommendations and personalized
              itineraries tailored to your interests and budget.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neon-button"
              >
                Plan Your Trip
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="service-card"
              >
                <feature.icon className="w-12 h-12 mb-4 icon-theme" />
                <h3 className="text-xl font-bold mb-3 neon-text">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 neon-text">Key Features</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 mt-1 mr-3 icon-theme flex-shrink-0" />
                  <p className="text-gray-300">Customized travel itineraries based on preferences</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 mt-1 mr-3 icon-theme flex-shrink-0" />
                  <p className="text-gray-300">Real-time recommendations for hotels and activities</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 mt-1 mr-3 icon-theme flex-shrink-0" />
                  <p className="text-gray-300">Integration with booking systems and maps</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 mt-1 mr-3 icon-theme flex-shrink-0" />
                  <p className="text-gray-300">Smart budget optimization and deals</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-current opacity-75 blur rounded-lg"></div>
              <img
                src={images[1]}
                alt="Travel Planning Process"
                className="relative rounded-lg shadow-xl"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg neon-border"
              >
                <benefit.icon className="w-12 h-12 mb-4 icon-theme" />
                <h3 className="text-xl font-bold mb-3 neon-text">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6 neon-text">Ready for Your Next Adventure?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let our AI travel planner help you create the perfect itinerary for your next journey.
              Discover amazing places and experiences tailored just for you.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neon-button flex items-center mx-auto"
              >
                Start Planning
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}