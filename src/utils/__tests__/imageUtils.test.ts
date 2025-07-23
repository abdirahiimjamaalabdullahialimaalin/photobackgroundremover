import { describe, it, expect } from 'vitest';
import { validateFile, formatFileSize } from '../imageUtils';

describe('imageUtils', () => {
  describe('validateFile', () => {
    it('should accept valid PNG file', () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      const result = validateFile(file);
      expect(result.isValid).toBe(true);
    });

    it('should accept valid JPEG file', () => {
      const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
      const result = validateFile(file);
      expect(result.isValid).toBe(true);
    });

    it('should reject unsupported file type', () => {
      const file = new File([''], 'test.gif', { type: 'image/gif' });
      const result = validateFile(file);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Unsupported file type');
    });

    it('should reject file exceeding size limit', () => {
      const largeContent = new Array(11 * 1024 * 1024).fill('a').join('');
      const file = new File([largeContent], 'test.png', { type: 'image/png' });
      const result = validateFile(file);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('File size exceeds 10MB limit');
    });
  });

  describe('formatFileSize', () => {
    it('should format bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
      expect(formatFileSize(1536)).toBe('1.5 KB');
    });
  });
});