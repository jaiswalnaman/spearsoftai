import { motion } from 'framer-motion';
import { Book } from 'lucide-react';

const blogs = [
  {
    title: 'NLP',
    excerpt: 'How Large Language Models Are Revolutionizing Natural Language Processing',
    date: '2024-10-28',
    readTime: '2 min read',
    image: 'https://www.unite.ai/wp-content/uploads/2023/06/llm.jpg',
    link: 'https://medium.com/@srishrachamalla77/how-large-language-models-are-revolutionizing-natural-language-processing-da1ea8cb1aa1'
  },
  {
    title: 'AI Voice Agents in Healthcare Appointments',
    excerpt: 'Exploring the implementation and impact of AI voice agents in healthcare appointment scheduling and management.',
    date: '2024-03-20',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800',
    link: 'https://medium.com/@samharisson1986/ai-voice-agents-in-healthcare-appointments-92505824b6f0'
  },
  {
    title: 'AI vs Traditional Chatbots Comparison',
    excerpt: 'A detailed analysis comparing AI-powered chatbots with traditional rule-based chatbot systems.',
    date: '2024-03-15',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800',
    link: 'https://medium.com/@srishrachamalla77/ai-vs-traditional-chatbots-comparison-58f8a490f8b3'
  },
  {
    title: 'Direct vs NLP-Processed Text for LLMs',
    excerpt: 'Understanding the differences and benefits between direct text input and NLP-processed text for Large Language Models.',
    date: '2024-03-10',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&w=800',
    link: 'https://medium.com/@srishrachamalla77/direct-vs-nlp-processed-text-for-llms-2ebc5a4ec383'
  },
  {
    title: 'Exploring AI Chatbots in Modern Industries',
    excerpt: 'A comprehensive look at how AI chatbots are transforming various industry sectors.',
    date: '2024-03-05',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800',
    link: 'https://medium.com/@koushiks17/exploring-ai-chatbots-in-modern-industries-e234134c65ca'
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 grid-background">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Book className="w-16 h-16 mx-auto mb-6 icon-theme" />
            <h1 className="text-5xl font-bold mb-6 neon-text">Our Blog</h1>
            <p className="text-xl text-gray-300">
              Insights and thoughts on AI, technology, and innovation
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.a
                key={index}
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="blog-card group"
              >
                <div className="relative h-48 mb-4 overflow-hidden rounded">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">{blog.date}</span>
                  <span className="text-gray-300">{blog.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 neon-text">{blog.title}</h3>
                <p className="text-gray-300">{blog.excerpt}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}