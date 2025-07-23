import React from 'react';
import { Scissors, Zap, Crown } from 'lucide-react';

interface HeaderProps {
  creditsRemaining: number;
}

export const Header: React.FC<HeaderProps> = ({ creditsRemaining }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Background Remover</h1>
              <p className="text-sm text-gray-500">Professional image editing</p>
            </div>
          </div>

          {/* Credits Display */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-accent-50 to-primary-50 px-4 py-2 rounded-full border border-accent-200">
              <Zap className="w-4 h-4 text-accent-600" />
              <span className="text-sm font-medium text-gray-700">
                {creditsRemaining} credits
              </span>
            </div>
            
            <button className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-sm hover:shadow-md">
              <Crown className="w-4 h-4" />
              <span className="text-sm font-medium">Upgrade</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};