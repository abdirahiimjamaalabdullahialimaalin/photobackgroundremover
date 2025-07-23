export interface ProcessedImage {
  id: string;
  originalFile: File;
  originalUrl: string;
  processedUrl: string | null;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  error?: string;
  createdAt: Date;
}

export interface BackgroundOption {
  id: string;
  type: 'transparent' | 'solid' | 'image';
  value: string;
  name: string;
  preview?: string;
}

export interface ProcessingCredits {
  total: number;
  used: number;
  remaining: number;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

export type SupportedFileType = 'image/png' | 'image/jpeg' | 'image/jpg';

export const SUPPORTED_FILE_TYPES: SupportedFileType[] = [
  'image/png',
  'image/jpeg',
  'image/jpg',
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB