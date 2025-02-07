import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: [
      'US Office: 3680 Old Kissell Ct, Cumming, GA 30041, USA',
      'India Office: Sri Jaahnavi Plaza 3rd floor, opposite to SMR VINAY HI LANDS, Miyapur, Telangana 500049'
    ],
    maps: {
      us: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7153223218897!2d-84.1234567!3d34.0123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAwJzQ0LjQiTiA4NMKwMDcnMjQuNiJX!5e0!3m2!1sen!2sus!4v1234567890',
      india: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.4876714538636!2d78.36506597488925!3d17.508170183798824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb920eaa555555%3A0xdff15b38baf4d964!2sSPEARSOFT%20TECHNO%20SOLUTIONS%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1710144444444!5m2!1sen!2sin'
    }
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 6301489288', 'Mon-Fri 9AM-6PM IST']
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['info@spearsoft.ai']
  }
];

export default function Contact() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 grid-background">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6 neon-text">Get in Touch</h1>
            <p className="text-xl text-gray-300">
              Let's discuss how we can transform your business with AI
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="service-card group relative"
              >
                <info.icon className="w-12 h-12 mx-auto mb-4 icon-theme" />
                <h3 className="text-xl font-bold mb-4 neon-text">{info.title}</h3>
                {info.details.map((detail, dIndex) => (
                  <p key={dIndex} className="text-gray-300 text-sm">{detail}</p>
                ))}
                {info.maps && (
                  <div className="absolute left-0 right-0 -bottom-2 transform translate-y-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="bg-gray-900 p-4 rounded-lg shadow-xl">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2 neon-text">US Office</h4>
                          <iframe
                            src={info.maps.us}
                            width="100%"
                            height="150"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded"
                          ></iframe>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-2 neon-text">India Office</h4>
                          <iframe
                            src={info.maps.india}
                            width="100%"
                            height="150"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}