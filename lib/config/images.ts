// Image configuration for email templates
// This file centralizes all image URLs used in the application

// Get the GitHub repository info from environment or use detected values
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'bihnijunh';
const GITHUB_REPO = process.env.GITHUB_REPO || 'work';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

// Base URL for GitHub raw files
const GITHUB_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}/public/images`;

// Alternative: GitHub Pages URL (if you have GitHub Pages enabled)
// const GITHUB_PAGES_URL = `https://${GITHUB_USERNAME}.github.io/${GITHUB_REPO}/images`;

export const IMAGE_URLS = {
  // Profile images hosted on GitHub
  profiles: {
    // María Elena Rodriguez - downloaded from Cash App CDN
    mariaElena: `${GITHUB_BASE_URL}/profiles/maria-elena-rodriguez.jpeg`,
    // Default fallback profile
    default: `${GITHUB_BASE_URL}/profiles/maria-elena-rodriguez.jpeg`,
  },
  
  // External CDN URLs (keep these for authenticity and reliability)
  external: {
    // Original Cash App CDN URL (as fallback)
    cashAppProfile: 'https://cash-images-f.squarecdn.com/apps/imgs/P8Ick4Us9UicmB66kcUQxC.jpeg?width=120',
    // Cash App logo
    cashAppLogo: 'https://cash-s.squarecdn.com/static/email/arcade/cash-app-logo.png',
    // Chime logo
    chimeLogo: 'https://braze-images.com/appboy/communication/assets/image_assets/images/65cb26e0d78955004bdec58e/original.png',
  }
};

// Profile image options for the selector
export const PROFILE_IMAGE_OPTIONS = [
  {
    id: 'maria-elena-github',
    url: IMAGE_URLS.profiles.mariaElena,
    name: 'María Elena Rodriguez',
    description: 'GitHub Hosted',
    source: 'github' as const,
    fallbackUrl: IMAGE_URLS.external.cashAppProfile
  },
  {
    id: 'maria-elena-original',
    url: IMAGE_URLS.external.cashAppProfile,
    name: 'María Elena Rodriguez',
    description: 'Original CDN',
    source: 'external' as const
  }
];

// Utility function to get image with fallback
export function getImageWithFallback(primaryUrl: string, fallbackUrl?: string): string {
  return primaryUrl; // In email context, we'll handle fallbacks via CSS or multiple sources
}

// Generate CSS for image fallback (useful for email templates)
export function generateImageFallbackCSS(primaryUrl: string, fallbackUrl: string): string {
  return `
    background-image: url('${fallbackUrl}'), url('${primaryUrl}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `;
}

// Validate image URL format
export function isValidImageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

// Get GitHub raw URL for a given path
export function getGitHubImageUrl(imagePath: string): string {
  return `${GITHUB_BASE_URL}/${imagePath}`;
}
