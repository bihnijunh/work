"use client";

import { useState } from 'react';
import { PROFILE_IMAGE_OPTIONS } from '@/lib/config/images';

interface ProfileImageSelectorProps {
  currentImage?: string;
  onImageChange: (imageUrl: string) => void;
  className?: string;
}

export function ProfileImageSelector({ 
  currentImage, 
  onImageChange, 
  className = "" 
}: ProfileImageSelectorProps) {
  const [selectedImageId, setSelectedImageId] = useState<string>(() => {
    // Find the currently selected image based on URL
    const currentOption = PROFILE_IMAGE_OPTIONS.find(option => option.url === currentImage);
    return currentOption?.id || PROFILE_IMAGE_OPTIONS[0].id;
  });

  const handleImageSelect = (option: typeof PROFILE_IMAGE_OPTIONS[0]) => {
    setSelectedImageId(option.id);
    onImageChange(option.url);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
          Profile Image
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Choose between GitHub-hosted (recommended) or original CDN image
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROFILE_IMAGE_OPTIONS.map((option) => (
          <div
            key={option.id}
            className={`
              relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200
              ${selectedImageId === option.id 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }
            `}
            onClick={() => handleImageSelect(option)}
          >
            {/* Selection indicator */}
            <div className="absolute top-2 right-2">
              <div className={`
                w-4 h-4 rounded-full border-2 flex items-center justify-center
                ${selectedImageId === option.id 
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-gray-300 dark:border-gray-600'
                }
              `}>
                {selectedImageId === option.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>

            {/* Image preview */}
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={option.url}
                alt={option.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                onError={(e) => {
                  // If GitHub image fails, try fallback if available
                  if (option.fallbackUrl && e.currentTarget.src !== option.fallbackUrl) {
                    e.currentTarget.src = option.fallbackUrl;
                  }
                }}
              />
              <div>
                <h5 className="font-medium text-gray-900 dark:text-gray-100">
                  {option.name}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {option.description}
                </p>
              </div>
            </div>

            {/* Source indicator */}
            <div className="flex items-center justify-between">
              <span className={`
                inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                ${option.source === 'github' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                }
              `}>
                {option.source === 'github' ? '📁 GitHub' : '🌐 CDN'}
              </span>
              
              {option.source === 'github' && (
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  Recommended
                </span>
              )}
            </div>

            {/* Fallback info for GitHub images */}
            {option.source === 'github' && option.fallbackUrl && (
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">Fallback:</span> Original CDN
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Current selection info */}
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Selected:
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {PROFILE_IMAGE_OPTIONS.find(opt => opt.id === selectedImageId)?.description}
          </span>
        </div>
        
        {selectedImageId === 'maria-elena-github' && (
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            <span className="font-medium">✅ Benefits:</span> Version controlled, faster loading, automatic fallback to CDN
          </div>
        )}
      </div>

      {/* Technical details (collapsible) */}
      <details className="mt-4">
        <summary className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100">
          Technical Details
        </summary>
        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <div><strong>GitHub URL:</strong> Uses raw.githubusercontent.com</div>
          <div><strong>CDN URL:</strong> Uses cash-images-f.squarecdn.com</div>
          <div><strong>Fallback:</strong> Automatic fallback to CDN if GitHub fails</div>
          <div><strong>Email Compatibility:</strong> Both URLs work in all major email clients</div>
        </div>
      </details>
    </div>
  );
}
