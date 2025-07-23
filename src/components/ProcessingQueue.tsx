import React from 'react';
import { ProcessedImage } from '../types';
import { Clock, CheckCircle, AlertCircle, X } from 'lucide-react';
import { formatFileSize } from '../utils/imageUtils';

interface ProcessingQueueProps {
  images: ProcessedImage[];
  onRemoveImage: (id: string) => void;
  onSelectImage: (id: string) => void;
  selectedImageId?: string;
}

export const ProcessingQueue: React.FC<ProcessingQueueProps> = ({
  images,
  onRemoveImage,
  onSelectImage,
  selectedImageId,
}) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Processing Queue</h3>
        <p className="text-sm text-gray-500">
          {images.length} image{images.length !== 1 ? 's' : ''} in queue
        </p>
      </div>

      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {images.map((image) => (
          <div
            key={image.id}
            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              selectedImageId === image.id ? 'bg-primary-50 border-l-4 border-primary-500' : ''
            }`}
            onClick={() => onSelectImage(image.id)}
          >
            <div className="flex items-center space-x-4">
              {/* Thumbnail */}
              <div className="flex-shrink-0">
                <img
                  src={image.originalUrl}
                  alt="Thumbnail"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>

              {/* Image Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {image.originalFile.name}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveImage(image.id);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {formatFileSize(image.originalFile.size)}
                  </span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-xs text-gray-500">
                    {new Date(image.createdAt).toLocaleTimeString()}
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-2 mt-2">
                  {image.status === 'processing' && (
                    <>
                      <Clock className="w-4 h-4 text-warning-500" />
                      <span className="text-xs text-warning-600">Processing...</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-warning-500 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${image.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{image.progress}%</span>
                    </>
                  )}

                  {image.status === 'completed' && (
                    <>
                      <CheckCircle className="w-4 h-4 text-success-500" />
                      <span className="text-xs text-success-600">Completed</span>
                    </>
                  )}

                  {image.status === 'error' && (
                    <>
                      <AlertCircle className="w-4 h-4 text-error-500" />
                      <span className="text-xs text-error-600">Error</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};