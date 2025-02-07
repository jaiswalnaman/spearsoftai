import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeSelector from './components/ThemeSelector';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import CookiePolicy from './pages/CookiePolicy';
import Blog from './pages/Blog';

// Service Category Pages
import AIBusiness from './pages/services/AIBusiness';
import Communication from './pages/services/Communication';
import DesignBranding from './pages/services/DesignBranding';
import AIPowered from './pages/services/AIPowered';

// Service Pages
import AIIntegration from './pages/services/AIIntegration';
import CustomAI from './pages/services/CustomAI';
import WorkflowAutomation from './pages/services/WorkflowService';
import EmailAutomation from './pages/services/EmailAutomation';
import VoiceAgent from './pages/services/VoiceAgentService';
import Chatbot from './pages/services/ChatbotService';
import ResumeBuilder from './pages/services/ResumeBuilder';
import LogoBuilder from './pages/services/LogoBuilder';
import TravelPlanner from './pages/services/TravelPlanner';

// Assessment Pages
import AssessmentForm from './pages/assessment/AssessmentForm';
import AssessmentTool from './pages/assessment/AssessmentTool';
import EmailTool from './pages/email-tool/EmailTool';

// SWASA Pages
import SwasaLogin from './pages/swasa/SwasaLogin';
import SwasaAnalysis from './pages/swasa/SwasaAnalysis';
import SwasaDemo from './pages/swasa/SwasaDemo';

import { AuthProvider, useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar isLoggedIn={isAuthenticated} onLogout={logout} />
      <ThemeSelector />
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/blog" element={<Blog />} />
          
          {/* Service Category Pages */}
          <Route path="/services/ai-business" element={<AIBusiness />} />
          <Route path="/services/communication" element={<Communication />} />
          <Route path="/services/design-branding" element={<DesignBranding />} />
          <Route path="/services/ai-powered" element={<AIPowered />} />

          {/* AI for Business */}
          <Route path="/services/ai-integration" element={<AIIntegration />} />
          <Route path="/services/custom-ai" element={<CustomAI />} />
          <Route path="/services/workflow" element={<WorkflowAutomation />} />

          {/* Communication & Productivity */}
          <Route path="/services/email-automation" element={<EmailAutomation />} />
          <Route path="/services/voice-agent" element={<VoiceAgent />} />
          <Route path="/services/chatbot" element={<Chatbot />} />

          {/* Design & Branding */}
          <Route path="/services/resume-builder" element={<ResumeBuilder />} />
          <Route path="/services/logo-builder" element={<LogoBuilder />} />

          {/* AI-Powered Services */}
          <Route path="/services/travel-planner" element={<TravelPlanner />} />

          <Route
            path="/assessment"
            element={
              <PrivateRoute>
                <AssessmentForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/assessment/tool"
            element={
              <PrivateRoute>
                <AssessmentTool />
              </PrivateRoute>
            }
          />
          <Route
            path="/email-tool"
            element={
              <PrivateRoute>
                <EmailTool />
              </PrivateRoute>
            }
          />
          {/* SWASA Routes */}
          <Route path="/swasa" element={<SwasaLogin />} />
          <Route path="/swasa/analysis" element={<SwasaAnalysis />} />
          <Route path="/swasa/demo" element={<SwasaDemo />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;