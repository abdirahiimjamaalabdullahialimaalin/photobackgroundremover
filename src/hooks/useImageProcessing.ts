import { useState, useCallback } from 'react';
import { ProcessedImage } from '../types';
import { backgroundRemovalService } from '../services/backgroundRemovalService';
import { createImageUrl } from '../utils/imageUtils';

export const useImageProcessing = () => {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const addImage = useCallback(async (file: File) => {
    const id = crypto.randomUUID();
    const originalUrl = createImageUrl(file);

    const newImage: ProcessedImage = {
      id,
      originalFile: file,
      originalUrl,
      processedUrl: null,
      status: 'processing',
      progress: 0,
      createdAt: new Date(),
    };

    setImages(prev => [newImage, ...prev]);
    setSelectedImageId(id);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setImages(prev =>
          prev.map(img =>
            img.id === id
              ? { ...img, progress: Math.min(img.progress + Math.random() * 20, 90) }
              : img
          )
        );
      }, 500);

      // Process the image
      const processedBlob = await backgroundRemovalService.removeBackground(file);
      const processedUrl = URL.createObjectURL(processedBlob);

      clearInterval(progressInterval);

      setImages(prev =>
        prev.map(img =>
          img.id === id
            ? {
                ...img,
                processedUrl,
                status: 'completed' as const,
                progress: 100,
              }
            : img
        )
      );

      // Increment credits used
      backgroundRemovalService.incrementCreditsUsed();

    } catch (error) {
      setImages(prev =>
        prev.map(img =>
          img.id === id
            ? {
                ...img,
                status: 'error' as const,
                error: error instanceof Error ? error.message : 'Processing failed',
                progress: 0,
              }
            : img
        )
      );
    }
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      
      // If we're removing the selected image, select the first remaining one
      if (selectedImageId === id) {
        setSelectedImageId(filtered.length > 0 ? filtered[0].id : null);
      }
      
      return filtered;
    });

    // Clean up URLs to prevent memory leaks
    const imageToRemove = images.find(img => img.id === id);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.originalUrl);
      if (imageToRemove.processedUrl) {
        URL.revokeObjectURL(imageToRemove.processedUrl);
      }
    }
  }, [images, selectedImageId]);

  const selectImage = useCallback((id: string) => {
    setSelectedImageId(id);
  }, []);

  const selectedImage = images.find(img => img.id === selectedImageId) || null;

  return {
    images,
    selectedImage,
    selectedImageId,
    addImage,
    removeImage,
    selectImage,
  };
};