import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.png';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

interface ServiceCategory {
  name: string;
  path: string;
  items: {
    name: string;
    path: string;
  }[];
}

const serviceCategories: ServiceCategory[] = [
  {
    name: "AI for Business",
    path: "/services/ai-business",
    items: [
      { name: "AI Integration", path: "/services/ai-integration" },
      { name: "Custom AI Solutions", path: "/services/custom-ai" },
      { name: "Workflow Automation", path: "/services/workflow" }
    ]
  },
  {
    name: "Communication & Productivity",
    path: "/services/communication",
    items: [
      { name: "Email Automation", path: "/services/email-automation" },
      { name: "AI Voice Agent", path: "/services/voice-agent" },
      { name: "AI Chatbot", path: "/services/chatbot" }
    ]
  },
  {
    name: "Design & Branding",
    path: "/services/design-branding",
    items: [
      { name: "AI Resume Builder", path: "/services/resume-builder" },
      { name: "AI Logo Builder", path: "/services/logo-builder" }
    ]
  },
  {
    name: "AI-Powered Services",
    path: "/services/ai-powered",
    items: [
      { name: "AI Travel Planner", path: "/services/travel-planner" }
    ]
  }
];

export default function Navbar({ isLoggedIn, onLogout }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return (
    <nav className="py-4 px-6 backdrop-blur-md bg-black/80 sticky top-0 z-50 border-b neon-border">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Spearsoft AI" className="w-8 h-8" />
          <span className="text-xl font-bold neon-text">Spearsoft AI</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          
          {/* Services Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-300 hover:neon-text transition-colors duration-300">
              <span>Services</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute left-0 mt-2 py-2 w-64 bg-gray-900/95 border border-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              {serviceCategories.map((category) => (
                <div key={category.name} className="relative group/sub">
                  <Link
                    to={category.path}
                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:neon-text transition-colors flex items-center justify-between"
                  >
                    <span>{category.name}</span>
                    <ChevronDown className="w-4 h-4 transform -rotate-90 group-hover/sub:rotate-0 transition-transform" />
                  </Link>
                  <div className="hidden group-hover/sub:block w-full">
                    {category.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-8 py-2 text-gray-300 hover:bg-gray-800 hover:neon-text transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-300 hover:neon-text transition-colors duration-300"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6 icon-theme" /> : <Menu className="w-6 h-6 icon-theme" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 border-b border-gray-800">
          <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
            <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
            
            {/* Mobile Services Dropdown */}
            {serviceCategories.map((category) => (
              <div key={category.name}>
                <Link
                  to={category.path}
                  onClick={() => {
                    toggleCategory(category.name);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center justify-between text-gray-300 hover:neon-text transition-colors duration-300 text-lg"
                >
                  <span>{category.name}</span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform ${
                    openCategory === category.name ? 'rotate-180' : ''
                  }`} />
                </Link>
                {openCategory === category.name && (
                  <div className="pl-4 mt-2 space-y-2">
                    {category.items.map((item) => (
                      <MobileNavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </MobileNavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <MobileNavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
            <MobileNavLink to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</MobileNavLink>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:neon-text transition-colors duration-300 text-lg flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <MobileNavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</MobileNavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-gray-300 hover:neon-text transition-colors duration-300"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-gray-300 hover:neon-text transition-colors duration-300 text-lg"
    >
      {children}
    </Link>
  );
}