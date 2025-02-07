import { AlertTriangle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EMAIL_LIMIT } from '../constants';

export default function EmailLimitWarning() {
  return (
    <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-medium text-yellow-400 mb-1">
            Free Account Limit
          </h4>
          <p className="text-sm text-gray-300 mb-3">
            Free accounts are limited to sending {EMAIL_LIMIT} emails. For unlimited emails and advanced features, please contact our team for a business account.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center text-sm text-yellow-400 hover:underline"
          >
            Upgrade Account
            <ExternalLink className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}