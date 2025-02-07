import { PhoneCall, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_THRESHOLD } from '../constants';

interface ContactSuggestionProps {
  totalRows: number;
}

export default function ContactSuggestion({ totalRows }: ContactSuggestionProps) {
  if (totalRows < CONTACT_THRESHOLD) return null;

  return (
    <div className="bg-gray-800/50 border border-current rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <PhoneCall className="w-5 h-5 text-current mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-medium neon-text mb-1">
            Large Campaign Detected
          </h4>
          <p className="text-sm text-gray-300 mb-3">
            For campaigns with {CONTACT_THRESHOLD}+ recipients, we recommend contacting our team for dedicated support and optimal delivery rates.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center text-sm neon-text hover:underline"
          >
            Contact Us
            <ExternalLink className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}