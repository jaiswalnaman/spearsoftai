import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Key, AlertCircle } from 'lucide-react';
import { EmailConfig } from '../types';

interface EmailSettingsProps {
  onConfigChange: (config: EmailConfig) => void;
  onBack: () => void;
  onStart: () => void;
}

export default function EmailSettings({ onConfigChange, onBack, onStart }: EmailSettingsProps) {
  const [config, setConfig] = useState<EmailConfig>({
    provider: 'gmail',
    email: '',
    appPassword: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof EmailConfig, value: string) => {
    setError(null);
    const newConfig = {
      ...config,
      [field]: value
    };
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  const handleSubmit = () => {
    if (!config.email) {
      setError('Email is required');
      return;
    }
    if (!config.appPassword) {
      setError('App password is required');
      return;
    }
    onStart();
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Provider
        </label>
        <select
          value={config.provider}
          onChange={(e) => handleChange('provider', e.target.value as 'gmail' | 'outlook')}
          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5"
        >
          <option value="gmail">Gmail</option>
          <option value="outlook">Outlook</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            value={config.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg pl-10 p-2.5"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          App Password
        </label>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="password"
            value={config.appPassword}
            onChange={(e) => handleChange('appPassword', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg pl-10 p-2.5"
            placeholder="Enter app password"
          />
        </div>
      </div>

      <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-blue-400 mb-1">
              Using App Passwords
            </h4>
            <p className="text-sm text-gray-300">
              For security reasons, you'll need to use an app password instead of your regular password.
              Learn how to generate an app password for{' '}
              <a
                href="https://support.google.com/accounts/answer/185833?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Gmail
              </a>
              {' '}or{' '}
              <a
                href="https://support.microsoft.com/en-us/account-billing/manage-app-passwords-for-two-step-verification-d6dc8c6d-4bf7-4851-ad95-6d07799387e9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Outlook
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Start Campaign
        </motion.button>
      </div>
    </div>
  );
}