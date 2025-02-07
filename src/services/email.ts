import axios from 'axios';
import { EmailConfig, Template } from '../pages/email-tool/types';

const API_URL = 'https://sparrow-rapid-kingfish.ngrok-free.app';

export const uploadFile_AI = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_URL}/upload_file_AI`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return {
      headers: response.data.columns,
      rows: response.data.preview_data,
    };
  } catch (error) {
    console.error('Upload file error:', error);
    throw error;
  }
};

export const saveTemplate_AI = async (template: Template) => {
  try {
    const response = await axios.post(`${API_URL}/save_template_AI`, template);

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return {
      success: response.data.message === 'Templates saved successfully',
    };
  } catch (error) {
    console.error('Save template error:', error);
    throw error;
  }
};

export const setColumnMapping_AI = async (mapping: Record<string, string>) => {
  try {
    const response = await axios.post(
      `${API_URL}/set_column_mapping_AI`,
      mapping
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return {
      success: response.data.message === 'Column mapping saved successfully',
    };
  } catch (error) {
    console.error('Set column mapping error:', error);
    throw error;
  }
};

export const sendEmails_AI = async (
  config: EmailConfig,
  onProgress: (sent: number) => void
) => {
  try {
    const response = await fetch(`${API_URL}/send_emails_AI`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: config.email,
        password: config.appPassword,
        type: config.provider,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send emails');
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('Stream not available');

    const decoder = new TextDecoder();
    let sent = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = line.slice(5).trim();
          if (data.startsWith('Emails sent:')) {
            sent = parseInt(data.split(':')[1].trim());
            onProgress(sent);
          }
        }
      }
    }

    return { success: sent, failed: 0 };
  } catch (error) {
    console.error('Send emails error:', error);
    throw error;
  }
};
