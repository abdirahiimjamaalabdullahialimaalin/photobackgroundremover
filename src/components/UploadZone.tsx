import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { validateFile } from '../utils/imageUtils';

interface UploadZoneProps {
  onFileUpload: (file: File) => void;
  isProcessing: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileUpload, isProcessing }) => {
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const validation = validateFile(file);
      
      if (validation.isValid) {
        onFileUpload(file);
      }
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    disabled: isProcessing,
  });

  const hasErrors = fileRejections.length > 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-all duration-300 ease-in-out
          ${isDragActive 
            ? 'border-primary-400 bg-primary-50 scale-105' 
            : hasErrors
            ? 'border-error-300 bg-error-50'
            : 'border-gray-300 bg-gray-50 hover:border-primary-400 hover:bg-primary-50'
          }
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-6">
          {/* Upload Icon */}
          <div className="flex justify-center">
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center
              ${isDragActive 
                ? 'bg-primary-100 text-primary-600 animate-bounce-subtle' 
                : hasErrors
                ? 'bg-error-100 text-error-600'
                : 'bg-gray-100 text-gray-600'
              }
            `}>
              {hasErrors ? (
                <AlertCircle className="w-8 h-8" />
              ) : isDragActive ? (
                <Upload className="w-8 h-8" />
              ) : (
                <ImageIcon className="w-8 h-8" />
              )}
            </div>
          </div>

          {/* Upload Text */}
          <div className="space-y-2">
            {isDragActive ? (
              <p className="text-lg font-semibold text-primary-700">
                Drop your image here!
              </p>
            ) : (
              <>
                <p className="text-lg font-semibold text-gray-700">
                  Drop your image here, or <span className="text-primary-600">browse</span>
                </p>
                <p className="text-sm text-gray-500">
                  Supports PNG, JPG, JPEG up to 10MB
                </p>
              </>
            )}
          </div>

          {/* File Requirements */}
          <div className="flex flex-wrap justify-center gap-2">
            {['PNG', 'JPG', 'JPEG'].map((format) => (
              <span
                key={format}
                className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600"
              >
                {format}
              </span>
            ))}
            <span className="px-3 py-1 bg-accent-50 border border-accent-200 rounded-full text-xs font-medium text-accent-700">
              Max 10MB
            </span>
          </div>

          {/* Error Messages */}
          {hasErrors && (
            <div className="mt-4 p-3 bg-error-50 border border-error-200 rounded-lg">
              {fileRejections.map(({ file, errors }) => (
                <div key={file.name} className="text-sm text-error-700">
                  {errors.map((error) => (
                    <p key={error.code}>{error.message}</p>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm font-medium text-gray-600">Processing...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};