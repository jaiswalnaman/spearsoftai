import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, Loader2, Download, Send } from 'lucide-react';

interface PatientData {
  name: string;
  sex: 'male' | 'female' | 'other';
  age: string;
  symptoms: string;
  allergies: string;
  lifestyle: string;
}

export default function SwasaAnalysis() {
  const [patientData, setPatientData] = useState<PatientData>({
    name: '',
    sex: 'male',
    age: '',
    symptoms: '',
    allergies: '',
    lifestyle: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // Simulate analysis delay (2-5 minutes)
    const delay = Math.floor(Math.random() * (300000 - 120000) + 120000);
    setTimeout(() => {
      setAnalysisResult(`# Patient Analysis Report

## Patient Information
- Name: ${patientData.name}
- Age: ${patientData.age}
- Sex: ${patientData.sex}

## Medical Assessment
### Symptoms
${patientData.symptoms}

### Allergies
${patientData.allergies}

### Lifestyle Factors
${patientData.lifestyle}

## Recommendations
1. Regular check-ups recommended
2. Maintain healthy diet and exercise routine
3. Monitor symptoms regularly

## Additional Notes
Please consult with your healthcare provider for specific medical advice.`);
      setIsAnalyzing(false);
    }, delay);
  };

  const handleDownloadPDF = () => {
    const element = document.createElement('a');
    const file = new Blob([analysisResult], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${patientData.name}_analysis.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSending(false);
    setShowEmailPopup(false);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <img 
            src="/src/assets/swasa_logo.png" 
            alt="SWASA Logo" 
            className="mx-auto h-24 w-auto mb-6"
          />
          <h1 className="text-4xl font-bold mb-4 text-sky-500">SWASA Analysis System</h1>
          <p className="text-gray-600">Enter patient information for analysis</p>
        </motion.div>

        {!analysisResult && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 rounded-lg shadow-lg border border-sky-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Patient Name
                </label>
                <input
                  type="text"
                  required
                  value={patientData.name}
                  onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-black placeholder-gray-400"
                  placeholder="Enter patient's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Age
                </label>
                <input
                  type="number"
                  required
                  value={patientData.age}
                  onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-black placeholder-gray-400"
                  placeholder="Enter patient's age"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Sex
                </label>
                <select
                  value={patientData.sex}
                  onChange={(e) => setPatientData({ ...patientData, sex: e.target.value as 'male' | 'female' | 'other' })}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-black"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  {/* <option value="other">Other</option> */}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Symptoms
              </label>
              <textarea
                required
                value={patientData.symptoms}
                onChange={(e) => setPatientData({ ...patientData, symptoms: e.target.value })}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-black placeholder-gray-400"
                rows={4}
                placeholder="Describe the patient's symptoms in detail"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Allergies
              </label>
              <textarea
                value={patientData.allergies}
                onChange={(e) => setPatientData({ ...patientData, allergies: e.target.value })}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-black placeholder-gray-400"
                rows={2}
                placeholder="List any known allergies (if none, write 'None')"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Lifestyle
              </label>
              <textarea
                value={patientData.lifestyle}
                onChange={(e) => setPatientData({ ...patientData, lifestyle: e.target.value })}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-black placeholder-gray-400"
                rows={3}
                placeholder="Describe patient's lifestyle (e.g., diet, exercise, smoking, alcohol consumption)"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-sky-500 to-orange-500 hover:from-sky-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </span>
              ) : (
                'Start Analysis'
              )}
            </motion.button>
          </motion.form>
        )}

        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8"
          >
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-sky-500" />
            <p className="text-gray-600">
              Analysis in progress... This may take 2-5 minutes
            </p>
          </motion.div>
        )}

        {analysisResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <div className="flex justify-end space-x-4 mb-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadPDF}
                className="flex items-center px-4 py-2 text-white bg-sky-500 rounded-md hover:bg-sky-600 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Report
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowEmailPopup(true)}
                className="flex items-center px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Report
              </motion.button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-sky-200">
              <FileText className="w-8 h-8 mb-4 text-sky-500" />
              <pre className="whitespace-pre-wrap font-mono text-gray-600">
                {analysisResult}
              </pre>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-red-600 mb-4">Important Disclaimers</h3>
              <ul className="space-y-2 text-red-600">
                <li>AI reports are informational only and not a substitute for medical advice. No medical relationship is established, accuracy depends on input, and we are not liable for decisions made. For emergencies, seek immediate professional help.</li>
              </ul>
            </motion.div>
          </motion.div>
        )}

        {showEmailPopup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
            >
              <h3 className="text-xl font-bold mb-4 text-sky-500">Send Report via Email</h3>
              <input
                type="email"
                placeholder="Enter recipient's email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-black placeholder-gray-400"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowEmailPopup(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendEmail}
                  disabled={isSending}
                  className="flex items-center px-4 py-2 text-white bg-gradient-to-r from-sky-500 to-orange-500 rounded-md hover:from-sky-600 hover:to-orange-600"
                >
                  {isSending ? (
                    <span className="flex items-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="w-5 h-5 mr-2" />
                      Send
                    </span>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}