import { ProcessedImage, ApiResponse } from '../types';

// Simulated Remove.bg API service
class BackgroundRemovalService {
  private apiKey: string;
  private baseUrl: string = 'https://api.remove.bg/v1.0';

  constructor() {
    this.apiKey = import.meta.env.VITE_REMOVEBG_API_KEY || 'demo-key';
  }

  async removeBackground(file: File): Promise<Blob> {
    // Simulate API processing time
    await this.simulateProcessing();

    // In a real implementation, this would call the Remove.bg API
    return this.simulateBackgroundRemoval(file);
  }

  private async simulateProcessing(): Promise<void> {
    // Simulate realistic processing time (2-5 seconds)
    const processingTime = Math.random() * 3000 + 2000;
    await new Promise(resolve => setTimeout(resolve, processingTime));
  }

  private async simulateBackgroundRemoval(file: File): Promise<Blob> {
    // For demo purposes, we'll create a canvas and simulate background removal
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Draw the original image
        ctx.drawImage(img, 0, 0);

        // Simulate background removal by creating a mask effect
        // In reality, this would be done by the AI model
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Simple background removal simulation
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Simple background detection (this is just for demo)
          const brightness = (r + g + b) / 3;
          const isBackground = brightness > 200 || (
            Math.abs(r - g) < 30 && 
            Math.abs(g - b) < 30 && 
            Math.abs(r - b) < 30
          );
          
          if (isBackground) {
            data[i + 3] = 0; // Make transparent
          }
        }

        ctx.putImageData(imageData, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to process image'));
          }
        }, 'image/png');
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  async replaceBackground(file: File, backgroundColor: string): Promise<Blob> {
    // First remove the background
    const removedBgBlob = await this.removeBackground(file);
    
    // Then add new background
    return this.addBackgroundColor(removedBgBlob, backgroundColor);
  }

  private async addBackgroundColor(blob: Blob, color: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Fill with background color
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the processed image on top
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((newBlob) => {
          if (newBlob) {
            resolve(newBlob);
          } else {
            reject(new Error('Failed to add background'));
          }
        }, 'image/png');
      };

      img.onerror = () => reject(new Error('Failed to load processed image'));
      img.src = URL.createObjectURL(blob);
    });
  }

  getCreditsUsed(): number {
    // Simulate credits usage
    return parseInt(localStorage.getItem('creditsUsed') || '0');
  }

  incrementCreditsUsed(): void {
    const current = this.getCreditsUsed();
    localStorage.setItem('creditsUsed', (current + 1).toString());
  }
}

export const backgroundRemovalService = new BackgroundRemovalService();