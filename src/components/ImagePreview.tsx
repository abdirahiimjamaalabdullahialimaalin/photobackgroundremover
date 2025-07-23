import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCcw, Download, Eye, EyeOff } from 'lucide-react';
import { ProcessedImage } from '../types';
import { downloadImage } from '../utils/imageUtils';

interface ImagePreviewProps {
  image: ProcessedImage;
  backgroundOptions?: { color: string; name: string }[];
  onBackgroundChange?: (color: string) => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  image, 
  backgroundOptions,
  onBackgroundChange 
}) => {
  const [showComparison, setShowComparison] = useState(true);
  const [selectedBackground, setSelectedBackground] = useState('#ffffff');

  const handleDownload = () => {
    if (image.processedUrl) {
      const filename = `${image.originalFile.name.split('.')[0]}_no_bg.png`;
      downloadImage(image.processedUrl, filename);
    }
  };

  const handleBackgroundChange = (color: string) => {
    setSelectedBackground(color);
    onBackgroundChange?.(color);
  };

  if (image.status === 'processing') {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Processing Image</h3>
          <p className="text-sm text-gray-500">Please wait while we remove the background...</p>
        </div>
        
        <div className="p-6">
          <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="space-y-2">
                <div className="w-64 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${image.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{image.progress}% complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (image.status === 'error') {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-error-600">Processing Failed</h3>
          <p className="text-sm text-gray-500">There was an error processing your image.</p>
        </div>
        
        <div className="p-6">
          <div className="aspect-video bg-error-50 rounded-xl flex items-center justify-center border-2 border-dashed border-error-200">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-error-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-error-600 text-2xl">⚠️</span>
              </div>
              <p className="text-error-700 font-medium">Processing failed</p>
              <p className="text-sm text-error-600">{image.error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Image Preview</h3>
            <p className="text-sm text-gray-500">Compare original and processed images</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {showComparison ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="text-sm">{showComparison ? 'Hide' : 'Show'} Original</span>
            </button>
            
            <button
              onClick={handleDownload}
              disabled={!image.processedUrl}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Background Options */}
      {backgroundOptions && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <p className="text-sm font-medium text-gray-700 mb-3">Background Options:</p>
          <div className="flex space-x-2">
            {backgroundOptions.map((option) => (
              <button
                key={option.color}
                onClick={() => handleBackgroundChange(option.color)}
                className={`w-8 h-8 rounded-lg border-2 transition-all ${
                  selectedBackground === option.color
                    ? 'border-primary-500 scale-110'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: option.color }}
                title={option.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Image Display */}
      <div className="p-6">
        <div className={`grid gap-6 ${showComparison ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Original Image */}
          {showComparison && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Original</h4>
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                <TransformWrapper
                  initialScale={1}
                  minScale={0.5}
                  maxScale={3}
                  wheel={{ step: 0.1 }}
                >
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                      <div className="absolute top-4 right-4 z-10 flex space-x-2">
                        <button
                          onClick={() => zoomIn()}
                          className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm transition-colors"
                        >
                          <ZoomIn className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => zoomOut()}
                          className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm transition-colors"
                        >
                          <ZoomOut className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => resetTransform()}
                          className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm transition-colors"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                      <TransformComponent
                        wrapperStyle={{ width: '100%', height: '100%' }}
                        contentStyle={{ width: '100%', height: '100%' }}
                      >
                        <img
                          src={image.originalUrl}
                          alt="Original"
                          className="w-full h-full object-contain"
                        />
                      </TransformComponent>
                    </>
                  )}
                </TransformWrapper>
              </div>
            </div>
          )}

          {/* Processed Image */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">
              {showComparison ? 'Processed' : 'Result'}
            </h4>
            <div 
              className="aspect-video rounded-xl overflow-hidden"
              style={{ 
                backgroundColor: selectedBackground,
                backgroundImage: selectedBackground === 'transparent' 
                  ? 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)'
                  : undefined,
                backgroundSize: selectedBackground === 'transparent' ? '20px 20px' : undefined,
                backgroundPosition: selectedBackground === 'transparent' ? '0 0, 0 10px, 10px -10px, -10px 0px' : undefined
              }}
            >
              <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={3}
                wheel={{ step: 0.1 }}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <div className="absolute top-4 right-4 z-10 flex space-x-2">
                      <button
                        onClick={() => zoomIn()}
                        className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm transition-colors"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => zoomOut()}
                        className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm transition-colors"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => resetTransform()}
                        className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                    <TransformComponent
                      wrapperStyle={{ width: '100%', height: '100%' }}
                      contentStyle={{ width: '100%', height: '100%' }}
                    >
                      {image.processedUrl && (
                        <img
                          src={image.processedUrl}
                          alt="Processed"
                          className="w-full h-full object-contain"
                        />
                      )}
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};