import axios from 'axios';
import { FileData } from '../types';

const API_URL = 'https://sparrow-rapid-kingfish.ngrok-free.app';

export class FileUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileUploadError';
  }
}

export const uploadFile = async (file: File): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_URL}/upload_file_AI`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    if (response.data.error) {
      throw new FileUploadError(response.data.error);
    }
  } catch (error) {
    if (error instanceof FileUploadError) {
      throw error;
    }
    throw new FileUploadError('Failed to upload file');
  }
};

export const getFileData = async (): Promise<FileData> => {
  try {
    const response = await axios.get(`${API_URL}/get_file_data_AI`, {
      withCredentials: true,
    });

    if (response.data.error) {
      throw new FileUploadError(response.data.error);
    }

    return {
      headers: response.data.columns,
      rows: response.data.preview_data,
      totalRows: response.data.total_rows,
    };
  } catch (error) {
    if (error instanceof FileUploadError) {
      throw error;
    }
    throw new FileUploadError('Failed to get file data');
  }
};
