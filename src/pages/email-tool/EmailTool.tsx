import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { checkBusinessAccount } from './services/accountService';
import Header from './components/Header';
import StepIndicator from './components/StepIndicator';
import FileUpload from './components/FileUpload';
import ColumnMapper from './components/ColumnMapper';
import TemplateEditor from './components/TemplateEditor';
import EmailSettings from './components/EmailSettings';
import ProgressModal from './components/ProgressModal';
import AccountStatusMessage from './components/AccountStatusMessage';
import { sendEmails } from './services/emailService';
import { STEPS } from './constants/steps';
import {
  FileData,
  MappedColumns,
  Template,
  EmailConfig,
  Campaign,
} from './types';

export default function EmailTool() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isBusinessAccount, setIsBusinessAccount] = useState(false);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [mappedColumns, setMappedColumns] = useState<MappedColumns | null>(null);
  const [template, setTemplate] = useState<Template | null>(null);
  const [emailConfig, setEmailConfig] = useState<EmailConfig | null>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [campaign, setCampaign] = useState<Campaign>({
    total: 0,
    current: 0,
    success: 0,
    failed: 0,
  });

  useEffect(() => {
    const checkAccount = async () => {
      if (user?.email) {
        const status = await checkBusinessAccount(user.email);
        setIsBusinessAccount(status.isBusinessAccount);
      }
    };

    if (isAuthenticated && user?.email) {
      checkAccount();
    } else {
      navigate('/login', { state: { from: '/email-tool' } });
    }
  }, [isAuthenticated, navigate, user]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleFileProcessed = (data: FileData) => {
    setFileData(data);
  };

  const handleColumnMapping = (mapping: MappedColumns) => {
    setMappedColumns(mapping);
  };

  const handleTemplateChange = (newTemplate: Template) => {
    setTemplate(newTemplate);
  };

  const handleStartCampaign = async () => {
    if (!template || !emailConfig || !fileData || !user?.email) return;

    setShowProgress(true);
    setCampaign({
      total: fileData.totalRows || 0,
      current: 0,
      success: 0,
      failed: 0,
    });

    try {
      await sendEmails(
        {
          ...emailConfig,
          main_email: user.email,
        },
        (sent: number) => {
          setCampaign((prev) => ({
            ...prev,
            current: sent,
            success: sent,
          }));
        }
      );
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Header />
        <AccountStatusMessage isBusinessAccount={isBusinessAccount} />
        <StepIndicator steps={STEPS} currentStep={currentStep} />

        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg neon-border">
          {currentStep === 0 && (
            <FileUpload
              onFileProcessed={handleFileProcessed}
              onNext={handleNext}
            />
          )}

          {currentStep === 1 && fileData && (
            <ColumnMapper
              fileData={fileData}
              onColumnsMapping={handleColumnMapping}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 2 && (
            <TemplateEditor
              mappedColumns={mappedColumns}
              fileData={fileData}
              onTemplateChange={handleTemplateChange}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <EmailSettings
              onConfigChange={setEmailConfig}
              onBack={handleBack}
              onStart={handleStartCampaign}
            />
          )}
        </div>

        {showProgress && (
          <ProgressModal
            campaign={campaign}
            onClose={() => setShowProgress(false)}
            isBusinessAccount={isBusinessAccount}
          />
        )}
      </div>
    </div>
  );
}