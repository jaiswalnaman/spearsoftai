import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileData } from '../types';
import ErrorMessage from './ErrorMessage';
import EmailLimitWarning from './EmailLimitWarning';

interface FileUploadProps {
  onFileProcessed: (data: FileData) => void;
  onNext: () => void;
}

export default function FileUpload({
  onFileProcessed,
  onNext,
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showLimitWarning, setShowLimitWarning] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);
      setIsUploading(true);

      try {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);

        const uploadResponse = await fetch(
          'https://sparrow-rapid-kingfish.ngrok-free.app/upload_file_AI',
          {
            method: 'POST',
            body: formData,
            credentials: 'include',
          }
        );

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload file');
        }

        const uploadData = await uploadResponse.json();

        if (uploadData.error) {
          throw new Error(uploadData.error);
        }

        const fileData: FileData = {
          headers: uploadData.columns,
          rows: uploadData.preview_data,
          totalRows: uploadData.total_rows,
        };

        setShowLimitWarning(true);
        onFileProcessed(fileData);
        onNext();
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred while processing the file'
        );
        console.error('Error processing file:', error);
      } finally {
        setIsUploading(false);
      }
    },
    [onFileProcessed, onNext]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false,
    disabled: isUploading,
    noClick: true, // Disable click to open on the container
  });

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {error && (
          <ErrorMessage message={error} onClose={() => setError(null)} />
        )}
      </AnimatePresence>

      {showLimitWarning && <EmailLimitWarning />}

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-gray-600 hover:border-blue-500'
        } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-blue-500" />
        <p className="text-lg mb-2">
          {isUploading
            ? 'Processing file...'
            : isDragActive
            ? 'Drop the file here...'
            : 'Upload your contact list file'}
        </p>
        <p className="text-sm text-gray-400 mb-4">
          Supports CSV, Excel (.xlsx, .xls)
        </p>
        <button
          type="button"
          onClick={open}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Select File
        </button>
      </div>
    </div>
  );
}