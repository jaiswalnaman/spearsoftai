import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Campaign } from '../types';
import { EMAIL_LIMIT, EMAIL_LIMIT_MESSAGE } from '../constants';

interface ProgressModalProps {
  campaign: Campaign;
  onClose: () => void;
  isBusinessAccount: boolean;
}

export default function ProgressModal({ campaign, onClose, isBusinessAccount }: ProgressModalProps) {
  const progress = (campaign.current / campaign.total) * 100;
  const hasReachedLimit = !isBusinessAccount && campaign.current >= EMAIL_LIMIT;
  const isComplete = campaign.current === campaign.total;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold neon-text">Campaign Progress</h3>
            {isComplete && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className={`h-full ${hasReachedLimit ? 'bg-yellow-500' : 'bg-blue-500'}`}
                />
              </div>
            </div>

            {hasReachedLimit && (
              <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-yellow-400">{EMAIL_LIMIT_MESSAGE}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Sent</span>
                  <span className="text-green-400">{campaign.success}</span>
                </div>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Failed</span>
                  <span className="text-red-400">{campaign.failed}</span>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-400">
              {hasReachedLimit ? (
                'Campaign paused - Email limit reached'
              ) : (
                `Processed ${campaign.current} of ${campaign.total} emails`
              )}
            </div>

            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="neon-button"
                >
                  Close
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}