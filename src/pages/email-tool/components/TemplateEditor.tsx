import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Variable, Eye, Save } from 'lucide-react';
import { MappedColumns, Template, FileData } from '../types';
import { saveTemplate } from '../api';

interface TemplateEditorProps {
  mappedColumns: MappedColumns | null;
  fileData: FileData | null;
  onTemplateChange: (template: Template) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function TemplateEditor({
  mappedColumns,
  fileData,
  onTemplateChange,
  onNext,
  onBack
}: TemplateEditorProps) {
  const [template, setTemplate] = useState<Template>({
    subject: '',
    body: ''
  });
  const [preview, setPreview] = useState<{ subject: string; body: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const subjectRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  // Handle Enter key in textareas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const target = e.target as HTMLTextAreaElement;
        const value = target.value;
        const selectionStart = target.selectionStart;
        const selectionEnd = target.selectionEnd;
        const newValue = value.substring(0, selectionStart) + '\n' + value.substring(selectionEnd);
        
        if (target === subjectRef.current) {
          setTemplate(prev => ({ ...prev, subject: newValue }));
        } else if (target === bodyRef.current) {
          setTemplate(prev => ({ ...prev, body: newValue }));
        }
      }
    };

    subjectRef.current?.addEventListener('keydown', handleKeyDown);
    bodyRef.current?.addEventListener('keydown', handleKeyDown);

    return () => {
      subjectRef.current?.removeEventListener('keydown', handleKeyDown);
      bodyRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleTemplateChange = (field: keyof Template, value: string) => {
    setTemplate(prev => ({
      ...prev,
      [field]: value
    }));
    onTemplateChange({
      ...template,
      [field]: value
    });
  };

  const handleSaveTemplate = async () => {
    setError(null);
    setIsSaving(true);
    
    try {
      await saveTemplate(template);
      onTemplateChange(template);
    } catch (error) {
      setError('Failed to save template. Please try again.');
      console.error('Error saving template:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, columnName: string) => {
    e.dataTransfer.setData('text/plain', `{${columnName}}`);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, field: keyof Template) => {
    e.preventDefault();
    const variable = e.dataTransfer.getData('text/plain');
    const target = field === 'subject' ? subjectRef.current : bodyRef.current;
    
    if (target) {
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const currentValue = template[field];
      const newValue = currentValue.substring(0, start) + variable + currentValue.substring(end);
      handleTemplateChange(field, newValue);
    }
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handlePreview = () => {
    if (!fileData || !template.subject || !template.body) return;
    
    try {
      const randomIndex = Math.floor(Math.random() * fileData.rows.length);
      const randomRow = fileData.rows[randomIndex];
      
      let previewSubject = template.subject;
      let previewBody = template.body;
      
      Object.keys(randomRow).forEach(key => {
        const value = randomRow[key];
        previewSubject = previewSubject.replace(new RegExp(`{${key}}`, 'g'), value);
        previewBody = previewBody.replace(new RegExp(`{${key}}`, 'g'), value);
      });
      
      setPreview({ subject: previewSubject, body: previewBody });
    } catch (error) {
      console.error('Error generating preview:', error);
    }
  };

  const isValid = template.subject.trim() && template.body.trim();

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Subject
            </label>
            <textarea
              ref={subjectRef}
              value={template.subject}
              onChange={(e) => handleTemplateChange('subject', e.target.value)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'subject')}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
              rows={2}
              placeholder="Drag and drop variables here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Body
            </label>
            <textarea
              ref={bodyRef}
              value={template.body}
              onChange={(e) => handleTemplateChange('body', e.target.value)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'body')}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
              rows={12}
              placeholder="Drag and drop variables here..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveTemplate}
              disabled={!isValid || isSaving}
              className={`px-6 py-2 rounded-lg flex items-center ${
                isValid && !isSaving
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Template'}
            </motion.button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-300 mb-4">Available Variables</h3>
            <div className="space-y-2">
              {fileData?.headers.map((header) => (
                <div
                  key={header}
                  draggable
                  onDragStart={(e) => handleDragStart(e, header)}
                  onDragEnd={handleDragEnd}
                  className={`px-3 py-2 bg-gray-800 rounded-lg cursor-move flex items-center ${
                    isDragging ? 'opacity-50' : 'hover:bg-gray-700'
                  }`}
                >
                  <Variable className="w-4 h-4 mr-2 icon-theme" />
                  <span className="text-gray-300">{header}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePreview}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>

          {preview && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Preview</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-gray-400">Subject:</span>
                  <p className="text-white">{preview.subject}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Body:</span>
                  <p className="text-white whitespace-pre-wrap">{preview.body}</p>
                </div>
              </div>
            </div>
          )}
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