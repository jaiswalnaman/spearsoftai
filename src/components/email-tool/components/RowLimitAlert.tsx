import { AlertCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROW_LIMIT } from '../constants';

interface RowLimitAlertProps {
  totalRows: number;
}

export default function RowLimitAlert({ totalRows }: RowLimitAlertProps) {
  if (totalRows <= ROW_LIMIT) return null;

  return (
    <div className="bg-gray-800/50 border border-current rounded-lg p-4 mb-4">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-current mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-medium neon-text mb-1">
            Row Limit Notice
          </h4>
          <p className="text-sm text-gray-300">
            Your file contains {totalRows} rows. The preview shows the first {ROW_LIMIT} rows, but all rows will be processed when sending emails.
          </p>
        </div>
      </div>
    </div>
  );
}