import { motion } from 'framer-motion';
import { FileText, Table, Download, Mail, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';

const demoData = {
  patientName: "Rish",
  clinicalData: {
    respiratoryFunction: "Frequent episodes of wheezing and shortness of breath",
    allergySymptoms: "Nasal congestion and sneezing, especially with exposure to pollen",
    smokingStatus: "Current smoker presenting with chronic cough"
  },
  patterns: [
    "Increased respiratory symptoms correlate with high pollen counts and cigarette smoke exposure",
    "A history of allergic reactions to specific food items (e.g., ice cream)"
  ],
  diseases: [
    { name: "Asthma", probability: 85 },
    { name: "Allergic Rhinitis", probability: 75 },
    { name: "Chronic Obstructive Pulmonary Disease (COPD)", probability: 60 },
    { name: "Eosinophilic Esophagitis", probability: 30 }
  ],
  medications: [
    {
      name: "Albuterol (Ventolin HFA, ProAir HFA)",
      dosage: "As needed for acute symptoms",
      purpose: "Rescue inhaler for asthma",
      sideEffects: "Nervousness, increased heart rate"
    },
    {
      name: "Fluticasone propionate",
      dosage: "Twice daily",
      purpose: "Long-term control of asthma",
      sideEffects: "Oral thrush, cough"
    },
    {
      name: "Montelukast (Singulair)",
      dosage: "10 mg orally in the evening",
      purpose: "Control of asthma and allergy symptoms",
      sideEffects: "Headache, dizziness"
    },
    {
      name: "Fluticasone furoate nasal spray",
      dosage: "Once daily",
      purpose: "Allergy symptom relief",
      sideEffects: "Nasal irritation, nosebleeds"
    },
    {
      name: "Loratadine (Claritin)",
      dosage: "10 mg during high pollen seasons",
      purpose: "Allergy symptom relief",
      sideEffects: "Fatigue, dry mouth"
    }
  ],
  lifestylePlan: [
    {
      title: "Smoking Cessation",
      details: [
        "Goal: Eliminate smoking",
        "Enroll in cessation program, utilize nicotine therapy, and engage in counseling"
      ]
    },
    {
      title: "Asthma Management",
      details: [
        "Use albuterol inhaler as needed",
        "Start inhaled corticosteroids and montelukast"
      ]
    },
    {
      title: "Physical Activity",
      details: [
        "Aim for 150 minutes of aerobic activity weekly, and include respiratory exercises",
        "Consider joining a pulmonary rehabilitation program"
      ]
    }
  ]
};

export default function SwasaDemo() {
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleDownloadPDF = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(demoData, null, 2)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${demoData.patientName}_analysis.txt`;
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
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src="/src/assets/swasa_logo.png" 
              alt="SWASA Logo" 
              className="h-24 w-auto"
            />
            <img 
              src="/src/assets/logo.png" 
              alt="Company Logo" 
              className="h-24 w-auto"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-sky-500">AI Analysis Report</h1>
          <p className="text-gray-600">Comprehensive Medical Analysis for {demoData.patientName}</p>
        </motion.div>

        <div className="flex justify-end space-x-4 mb-8">
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

        <div className="space-y-8">
          {/* Clinical Data Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg border border-sky-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-sky-500">Clinical Data Report</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Key Health Indicators:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Respiratory Function: {demoData.clinicalData.respiratoryFunction}</li>
                  <li>Allergy Symptoms: {demoData.clinicalData.allergySymptoms}</li>
                  <li>Smoking Status: {demoData.clinicalData.smokingStatus}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Identified Patterns:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  {demoData.patterns.map((pattern, index) => (
                    <li key={index}>{pattern}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Disease Probability Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg border border-sky-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-sky-500">Disease Probability Analysis</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-gray-600">Disease</th>
                    <th className="text-left py-3 text-gray-600">Probability Score</th>
                  </tr>
                </thead>
                <tbody>
                  {demoData.diseases.map((disease, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 text-gray-600">{disease.name}</td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className="h-2.5 rounded-full bg-gradient-to-r from-sky-500 to-orange-500"
                              style={{ width: `${disease.probability}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-600">{disease.probability}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Medication Table Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg border border-sky-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-sky-500">Prescribed Medications</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-gray-600">Medication</th>
                    <th className="text-left py-3 text-gray-600">Dosage</th>
                    <th className="text-left py-3 text-gray-600">Purpose</th>
                    <th className="text-left py-3 text-gray-600">Side Effects</th>
                  </tr>
                </thead>
                <tbody>
                  {demoData.medications.map((med, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 text-gray-600">{med.name}</td>
                      <td className="py-3 text-gray-600">{med.dosage}</td>
                      <td className="py-3 text-gray-600">{med.purpose}</td>
                      <td className="py-3 text-gray-600">{med.sideEffects}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Lifestyle Plan Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg border border-sky-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-sky-500">Lifestyle Improvement Plan</h2>
            <div className="grid gap-6">
              {demoData.lifestylePlan.map((plan, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3 text-sky-500">{plan.title}</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    {plan.details.map((detail, dIndex) => (
                      <li key={dIndex}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Add Disclaimer Section at the bottom */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-red-600 mb-4">Important Disclaimers</h3>
          <ul className="space-y-2 text-red-600">
            <li>AI reports are informational only and not a substitute for medical advice. No medical relationship is established, accuracy depends on input, and we are not liable for decisions made. For emergencies, seek immediate professional help.</li>
          </ul>
        </motion.section>

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