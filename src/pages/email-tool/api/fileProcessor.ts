import { read, utils } from 'xlsx';
import { FileData } from '../types';

export const processFile = async (file: File): Promise<FileData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = read(data, { type: 'binary' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = utils.sheet_to_json<Record<string, string>>(firstSheet);
        
        if (rows.length === 0) {
          throw new Error('File is empty');
        }

        const headers = Object.keys(rows[0]);

        resolve({
          headers,
          rows
        });
      } catch (error) {
        reject(new Error('Failed to process file'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsBinaryString(file);
  });
};