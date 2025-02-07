import { Link } from 'react-router-dom';
import { Linkedin, Twitter } from 'lucide-react';

// Custom Hugging Face icon component with a friendly face design
function HuggingFaceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M12,4c4.41,0,8,3.59,8,8 c0,4.41-3.59,8-8,8s-8-3.59-8-8C4,7.59,7.59,4,12,4z M8.707,13.707C8.707,14.89,9.66,15.84,10.84,15.84 c1.18,0,2.133-0.95,2.133-2.133c0-0.356-0.087-0.691-0.24-0.985C13.187,13.557,12.664,14,12,14c-0.664,0-1.187-0.443-1.733-1.278 C8.794,13.016,8.707,13.351,8.707,13.707z M15.293,13.707c0,1.183,0.95,2.133,2.133,2.133c1.18,0,2.133-0.95,2.133-2.133 c0-0.356-0.087-0.691-0.24-0.985C17.187,13.557,16.664,14,16,14c-0.664,0-1.187-0.443-1.733-1.278 C15.794,13.016,15.707,13.351,15.707,13.707z M12,17.333c-2.096,0-3.853-1.455-4.333-3.41C8.146,14.623,9.142,15,10.84,15 c1.18,0,2.133-0.95,2.133-2.133c0-0.356-0.087-0.691-0.24-0.985C13.187,12.557,12.664,13,12,13c-0.664,0-1.187-0.443-1.733-1.278 C10.794,12.016,10.707,12.351,10.707,12.707C10.707,13.89,11.66,14.84,12.84,14.84c1.698,0,2.694-0.377,3.173-1.077 C15.853,15.878,14.096,17.333,12,17.333z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t neon-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 neon-text">Spearsoft AI</h3>
            <p className="text-gray-300">
              Revolutionizing businesses with intelligent AI solutions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 neon-text">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:neon-text">About</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:neon-text">Services</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:neon-text">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 neon-text">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-300 hover:neon-text">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:neon-text">Terms & Conditions</Link></li>
              <li><Link to="/cookie-policy" className="text-gray-300 hover:neon-text">Cookie Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 neon-text">Connect</h3>
            <div className="flex space-x-4">
              <div className="group relative">
                <a 
                  href="https://twitter.com/Spearsofttechno" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="icon-theme hover:opacity-80"
                >
                  <Twitter className="w-6 h-6" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Twitter
                  </span>
                </a>
              </div>
              <div className="group relative">
                <a 
                  href="https://www.linkedin.com/company/spearsoftsolutions/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="icon-theme hover:opacity-80"
                >
                  <Linkedin className="w-6 h-6" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    LinkedIn
                  </span>
                </a>
              </div>
              <div className="group relative">
                <a 
                  href="https://huggingface.co/SpearsoftLabs" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="icon-theme hover:opacity-80"
                >
                  <HuggingFaceIcon className="w-6 h-6" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Hugging Face
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-300">
          <p>© 2024 Spearsoft AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}