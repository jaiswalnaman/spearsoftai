import { motion } from 'framer-motion';
import { Users, Target, Lightbulb, Award, Code, Globe } from 'lucide-react';

const values = [
  {
    icon: Users,
    title: 'Client-Centric',
    description: 'Your success is our priority. We work closely with you to understand and meet your unique needs.'
  },
  {
    icon: Target,
    title: 'Innovation',
    description: 'We stay at the forefront of AI technology to deliver cutting-edge solutions.'
  },
  {
    icon: Lightbulb,
    title: 'Excellence',
    description: 'We maintain the highest standards in every aspect of our service delivery.'
  }
];

const achievements = [
  {
    icon: Award,
    title: 'Industry Recognition',
    description: 'Named Top AI Innovation Company in Global Summit'
  },
  {
    icon: Code,
    title: 'Technical Excellence',
    description: '25+ Successfully Deployed AI Solutions'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Serving Clients Across 3+ Countries'
  }
];

const teamMembers = [
  {
    name: 'Praveen Puram',
    role: 'CEO & Co-Founder',
    image: 'https://www.spearsoftech.com/assets/Praveen_Puram_01.png',
  },
  {
    name: 'Srinivas Goli',
    role: 'MD & Co-Founder',
    image: 'https://www.spearsoftech.com/assets/Srinivas_Goli_02.png',
  }
];

export default function About() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 grid-background">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6 neon-text">Our Story</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Founded in 2021, Spearsoft AI has been dedicated to making artificial intelligence accessible to businesses of all sizes. What started as a vision to drive innovation has evolved into a trusted partner helping companies optimize operations and harness AI's full potential. With every step, we've refined our solutions to tackle real-world challenges and deliver measurable results, empowering businesses to embrace the future with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 neon-text">Our Mission</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Our mission is to harness the potential of AI to solve real-world challenges, helping businesses unlock new efficiencies, insights, and opportunities. We are committed to providing innovative AI solutions that enable companies to stay competitive, adapt to change, and accelerate their growth in an increasingly digital world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="service-card"
              >
                <value.icon className="w-12 h-12 mb-4 icon-theme" />
                <h3 className="text-xl font-bold mb-3 neon-text">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-16 neon-text">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full neon-border"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 neon-text">{member.name}</h3>
                <p className="neon-text">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 neon-text">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="service-card"
              >
                <achievement.icon className="w-12 h-12 mx-auto mb-4 icon-theme" />
                <h3 className="text-xl font-bold mb-3 neon-text">{achievement.title}</h3>
                <p className="text-gray-300">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}