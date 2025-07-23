# AI Background Remover

A professional-grade web application for AI-powered background removal. Built with React, TypeScript, and Tailwind CSS, featuring high-quality image processing and an intuitive user interface.

![AI Background Remover](https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800)

## 🌟 Features

### Core Functionality
- **AI-Powered Background Removal**: High-accuracy processing using advanced machine learning
- **Multiple File Format Support**: PNG, JPG, JPEG (up to 10MB per file)
- **Real-time Progress Tracking**: Visual feedback during processing
- **High-Quality Output**: Preserves original image resolution
- **Batch Processing**: Handle multiple images simultaneously

### User Experience
- **Drag & Drop Interface**: Intuitive file upload experience
- **Side-by-Side Comparison**: Before/after preview with zoom functionality
- **Background Replacement**: Solid colors and transparency options
- **One-Click Download**: Instant access to processed images
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Advanced Features
- **Processing Queue**: Manage multiple images efficiently
- **Credits System**: Track API usage and processing limits
- **Error Handling**: User-friendly error messages and recovery
- **Image Optimization**: Intelligent preprocessing and compression

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Remove.bg API key (optional for demo mode)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-background-remover.git
   cd ai-background-remover
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Remove.bg API Configuration
VITE_REMOVEBG_API_KEY=your_api_key_here

# Application Settings
VITE_MAX_FILE_SIZE=10485760
VITE_SUPPORTED_FORMATS=png,jpg,jpeg

# Optional: Analytics
VITE_GA_TRACKING_ID=your_tracking_id
```

### API Integration

The application supports multiple background removal services:

1. **Remove.bg API** (Recommended)
   - Sign up at [remove.bg](https://www.remove.bg/api)
   - Get your API key
   - Add to `.env` file

2. **Custom AI Models**
   - Implement your own service in `src/services/backgroundRemovalService.ts`
   - Supports U-2-Net, MODNet, or custom models

## 🏗️ Architecture

### Frontend Structure
```
src/
├── components/          # React components
│   ├── Header.tsx       # Navigation and credits
│   ├── UploadZone.tsx   # File upload interface
│   ├── ImagePreview.tsx # Before/after comparison
│   ├── ProcessingQueue.tsx # Batch processing queue
│   └── Footer.tsx       # Site footer
├── hooks/               # Custom React hooks
│   └── useImageProcessing.ts # Image processing logic
├── services/            # External API services
│   └── backgroundRemovalService.ts # AI processing
├── types/               # TypeScript definitions
│   └── index.ts         # Type definitions
├── utils/               # Utility functions
│   └── imageUtils.ts    # Image manipulation helpers
└── App.tsx             # Main application component
```

### Key Technologies
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **State Management**: React Hooks (useState, useCallback)
- **File Handling**: React Dropzone
- **Image Processing**: Canvas API, Remove.bg API
- **UI Components**: Custom components with Lucide icons
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Main actions and branding
- **Secondary**: Purple (#8B5CF6) - Accent elements
- **Accent**: Green (#10B981) - Success states
- **Warning**: Orange (#F59E0B) - Processing states
- **Error**: Red (#EF4444) - Error states

### Typography
- **Headings**: Inter font family, multiple weights
- **Body**: Optimized line height (150%) for readability
- **Code**: Monospace font for technical content

### Spacing System
- Based on 8px grid system
- Consistent margins and padding
- Responsive breakpoints: 768px (tablet), 1024px (desktop)

## 📦 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. **Connect your repository**
   ```bash
   vercel --prod
   ```

2. **Set environment variables**
   - Add `VITE_REMOVEBG_API_KEY` in Vercel dashboard
   - Configure other environment variables as needed

3. **Custom domain** (optional)
   - Add your domain in Vercel dashboard
   - Update DNS settings

### Deploy to Netlify

1. **Build command**: `npm run build`
2. **Publish directory**: `dist`
3. **Environment variables**: Add in Netlify dashboard

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔒 Security Considerations

### File Upload Security
- File type validation (whitelist approach)
- File size limits (10MB default)
- Malware scanning (recommended for production)
- Temporary file cleanup

### API Security
- Environment variable protection
- Rate limiting implementation
- Input validation and sanitization
- CORS configuration

### Data Privacy
- No permanent file storage
- Automatic cleanup of processed images
- GDPR compliance considerations
- User data anonymization

## 🚀 Performance Optimization

### Image Processing
- Intelligent image compression
- Progressive loading
- Memory management for large files
- Batch processing optimization

### Frontend Performance
- Code splitting with React.lazy
- Image lazy loading
- CSS optimization with Tailwind
- Bundle size optimization

### Caching Strategy
- Browser caching for static assets
- API response caching
- Service worker implementation (optional)

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Component Testing
```bash
npm run test:components
```

### E2E Testing
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:coverage
```

## 🛠️ Development

### Code Quality
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Pre-commit hooks with Husky

### Development Workflow
1. Create feature branch
2. Implement changes with tests
3. Run quality checks
4. Submit pull request
5. Deploy after review

## 📚 API Documentation

### Background Removal Endpoint

```typescript
POST /api/remove-background
Content-Type: multipart/form-data

{
  "image": File,
  "format": "png" | "jpg",
  "background": "transparent" | "#hexcolor"
}

Response:
{
  "success": boolean,
  "data": {
    "processedImageUrl": string,
    "creditsUsed": number
  },
  "error"?: string
}
```

### Error Codes
- `400`: Invalid file format or size
- `429`: Rate limit exceeded
- `500`: Processing error

## 🐛 Troubleshooting

### Common Issues

**Upload fails with "File too large"**
- Check file size (max 10MB)
- Compress image before upload
- Verify `VITE_MAX_FILE_SIZE` setting

**Processing takes too long**
- Check internet connection
- Verify API key configuration
- Try smaller image size

**Background removal quality is poor**
- Use high-resolution source images
- Ensure good contrast between subject and background
- Try different background colors for preview

**Build fails in production**
- Check all environment variables are set
- Verify API endpoints are accessible
- Review build logs for specific errors

### Support Channels
- GitHub Issues: Technical problems and bugs
- Email: support@example.com
- Documentation: Comprehensive guides and tutorials

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Remove.bg](https://www.remove.bg) for the background removal API
- [Tailwind CSS](https://tailwindcss.com) for the design system
- [Lucide](https://lucide.dev) for the icon library
- [React](https://reactjs.org) team for the framework
- [Vite](https://vitejs.dev) for the build tool