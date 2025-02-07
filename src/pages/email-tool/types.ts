export interface FileData {
  headers: string[];
  rows: Record<string, string>[];
  totalRows: number;
}

export interface MappedColumns {
  name: string;
  email: string;
}

export interface Template {
  subject: string;
  body: string;
}

export interface EmailConfig {
  provider: 'gmail' | 'outlook';
  email: string;
  appPassword: string;
}

export interface Campaign {
  total: number;
  current: number;
  success: number;
  failed: number;
}