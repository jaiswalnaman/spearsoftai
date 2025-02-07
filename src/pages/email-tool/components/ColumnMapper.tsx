import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FileData, MappedColumns } from '../types';
import { setColumnMapping } from '../utils/api';

interface ColumnMapperProps {
  fileData: FileData | null;
  onColumnsMapping: (mapping: MappedColumns) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ColumnMapper({ fileData, onColumnsMapping, onNext, onBack }: ColumnMapperProps) {
  const [mapping, setMapping] = useState<MappedColumns>({
    name: '',
    email: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleColumnSelect = async (field: keyof MappedColumns, column: string) => {
    try {
      const newMapping = {
        ...mapping,
        [field]: column
      };
      setMapping(newMapping);
      
      const result = await setColumnMapping(newMapping);
      if (result.success) {
        setError(null);
        onColumnsMapping(newMapping);
      }
    } catch (error) {
      setError('Failed to save column mapping. Please try again.');
      console.error('Error saving column mapping:', error);
    }
  };

  const isValid = mapping.name && mapping.email;

  if (!fileData) {
    return (
      <div className="text-center text-gray-300">
        No file data available. Please upload a file first.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Name Column
          </label>
          <select
            value={mapping.name}
            onChange={(e) => handleColumnSelect('name', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5"
          >
            <option value="">Select column</option>
            {fileData.headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Column
          </label>
          <select
            value={mapping.email}
            onChange={(e) => handleColumnSelect('email', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5"
          >
            <option value="">Select column</option>
            {fileData.headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded-lg">
          {error}
        </div>
      )}

      {fileData.rows && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-300 mb-3">Preview</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {fileData.rows.slice(0, 5).map((row, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="px-6 py-4">{mapping.name ? row[mapping.name] : '-'}</td>
                    <td className="px-6 py-4">{mapping.email ? row[mapping.email] : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
          onClick={onNext}
          disabled={!isValid}
          className={`px-6 py-2 rounded-lg flex items-center ${
            isValid
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </motion.button>
      </div>
    </div>
  );
}