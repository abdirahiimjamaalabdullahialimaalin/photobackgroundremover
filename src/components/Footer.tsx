import React from 'react';
import { Heart, Github, Twitter, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">AI Background Remover</h3>
            <p className="text-gray-400 text-sm">
              Professional-grade background removal powered by AI. 
              Remove backgrounds from any image in seconds.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
              <span>for creators</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Features
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>AI-Powered Processing</li>
              <li>High-Quality Results</li>
              <li>Batch Processing</li>
              <li>Custom Backgrounds</li>
              <li>No Watermarks</li>
            </ul>
          </div>

          {/* Use Cases */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Use Cases
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>E-commerce Photos</li>
              <li>Profile Pictures</li>
              <li>Marketing Materials</li>
              <li>Social Media</li>
              <li>Product Catalogs</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:support@example.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="text-sm text-gray-400">
              <p>Questions? Reach out to us</p>
              <a
                href="mailto:support@example.com"
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                support@example.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2025 AI Background Remover. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">API Documentation</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};