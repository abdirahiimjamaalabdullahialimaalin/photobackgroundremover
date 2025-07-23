import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { UploadZone } from './components/UploadZone';
import { ImagePreview } from './components/ImagePreview';
import { ProcessingQueue } from './components/ProcessingQueue';
import { Footer } from './components/Footer';
import { useImageProcessing } from './hooks/useImageProcessing';
import { backgroundRemovalService } from './services/backgroundRemovalService';
import { Sparkles, Zap, Shield, Clock } from 'lucide-react';

function App() {
  const {
    images,
    selectedImage,
    selectedImageId,
    addImage,
    removeImage,
    selectImage,
  } = useImageProcessing();

  const [creditsUsed, setCreditsUsed] = useState(0);
  const totalCredits = 100;

  useEffect(() => {
    setCreditsUsed(backgroundRemovalService.getCreditsUsed());
  }, [images]);

  const backgroundOptions = [
    { color: 'transparent', name: 'Transparent' },
    { color: '#ffffff', name: 'White' },
    { color: '#000000', name: 'Black' },
    { color: '#f3f4f6', name: 'Light Gray' },
    { color: '#3b82f6', name: 'Blue' },
    { color: '#10b981', name: 'Green' },
    { color: '#f59e0b', name: 'Orange' },
    { color: '#ef4444', name: 'Red' },
  ];

  const isProcessing = images.some(img => img.status === 'processing');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header creditsRemaining={totalCredits - creditsUsed} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {images.length === 0 ? (
          // Landing Page
          <div className="space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-8 py-12">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
                  Remove Backgrounds with
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    {' '}AI Precision
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Transform your images with professional-grade background removal. 
                  Perfect for e-commerce, social media, and creative projects.
                </p>
              </div>

              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-primary-500" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-accent-500" />
                  <span>Lightning Fast</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-secondary-500" />
                  <span>High Quality</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-warning-500" />
                  <span>Instant Results</span>
                </div>
              </div>
            </div>

            {/* Upload Zone */}
            <UploadZone onFileUpload={addImage} isProcessing={isProcessing} />

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
              <div className="text-center space-y-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">AI-Powered Precision</h3>
                <p className="text-gray-600">
                  Advanced machine learning algorithms detect and remove backgrounds with pixel-perfect accuracy.
                </p>
              </div>

              <div className="text-center space-y-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Lightning Fast Processing</h3>
                <p className="text-gray-600">
                  Get professional results in seconds. No waiting, no complex editing required.
                </p>
              </div>

              <div className="text-center space-y-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-secondary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">High-Quality Output</h3>
                <p className="text-gray-600">
                  Preserve original resolution and image quality. Perfect for professional use.
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Processing/Results View
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upload and Queue */}
            <div className="space-y-6">
              <UploadZone onFileUpload={addImage} isProcessing={isProcessing} />
              <ProcessingQueue
                images={images}
                onRemoveImage={removeImage}
                onSelectImage={selectImage}
                selectedImageId={selectedImageId}
              />
            </div>

            {/* Right Column - Preview */}
            <div className="lg:col-span-2">
              {selectedImage && (
                <ImagePreview
                  image={selectedImage}
                  backgroundOptions={backgroundOptions}
                />
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;