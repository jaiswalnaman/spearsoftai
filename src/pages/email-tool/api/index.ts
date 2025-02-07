import axios from 'axios';
import { FileData, Template, EmailConfig, MappedColumns } from '../types';

const API_BASE_URL = 'https://sparrow-rapid-kingfish.ngrok-free.app';

export const uploadFile = async (file: File): Promise<FileData> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/upload_file_AI`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

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

export const saveTemplate = async (
  template: Template
): Promise<{ success: boolean }> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/save_template_AI`,
      template
    );

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

export const setColumnMapping = async (
  mapping: MappedColumns
): Promise<{ success: boolean }> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/set_column_mapping_AI`,
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

export const sendEmails = async (
  data: {
    template: Template;
    config: EmailConfig;
  },
  onProgress: (progress: number) => void
): Promise<{ success: number; failed: number }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/send_emails_AI`, data);

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return {
      success: response.data.success_count,
      failed: response.data.failed_count,
    };
  } catch (error) {
    console.error('Send emails error:', error);
    throw error;
  }
};
