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

  // Logos hosted on GitHub
  logos: {
    // Cash App logo - downloaded from Cash App CDN
    cashApp: `${GITHUB_BASE_URL}/logos/cashapp-logo.png`,
  },

  // Social media icons hosted on GitHub
  social: {
    // Social media icons - downloaded from Cash App CDN
    twitter: `${GITHUB_BASE_URL}/social/x.png`,
    instagram: `${GITHUB_BASE_URL}/social/instagram.png`,
    twitch: `${GITHUB_BASE_URL}/social/twitch.png`,
    tiktok: `${GITHUB_BASE_URL}/social/tiktok.png`,
  },

  // External CDN URLs (keep these for authenticity and reliability as fallbacks)
  external: {
    // Original Cash App CDN URL (as fallback)
    cashAppProfile: 'https://cash-images-f.squarecdn.com/apps/imgs/P8Ick4Us9UicmB66kcUQxC.jpeg?width=120',
    // Cash App logo (fallback)
    cashAppLogo: 'https://cash-s.squarecdn.com/static/email/arcade/cash-app-logo.png',
    // Social media icons (fallbacks)
    twitterIcon: 'https://cash-s.squarecdn.com/static/email/arcade/x.png',
    instagramIcon: 'https://cash-s.squarecdn.com/static/email/arcade/instagram.png',
    twitchIcon: 'https://cash-s.squarecdn.com/static/email/arcade/twitch.png',
    tiktokIcon: 'https://cash-s.squarecdn.com/static/email/arcade/tiktok.png',
    // Chime logo
    chimeLogo: 'https://braze-images.com/appboy/communication/assets/image_assets/images/65cb26e0d78955004bdec58e/original.png',
    // Zelle logo (white horizontal with tagline)
    zelleLogo: 'https://ci3.googleusercontent.com/meips/ADKq_NZJu2P3tRoKFB4YkK3vYKySdWBBLkNo5dNz_K1NwjdWVrry291NXJmaKhq_EaWKqfCZwLzLfU9DoaN2YFw_tAb0on6KspfDkzjow5aa-q2T82qYSZM195XhiOQzchVDDLgFr1PxkUT9FIDXZ3gp0J9R=s0-d-e1-ft#https://www.zellepay.com/sites/default/files/Zelle-logo-tagline-horizontal-white-v2_1_0.png',
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

// Cash App specific image utilities with fallback support
export const CASH_APP_IMAGES = {
  // Logo with fallback
  logo: {
    primary: IMAGE_URLS.logos.cashApp,
    fallback: IMAGE_URLS.external.cashAppLogo,
  },
  // Social media icons with fallbacks
  socialIcons: {
    twitter: {
      primary: IMAGE_URLS.social.twitter,
      fallback: IMAGE_URLS.external.twitterIcon,
    },
    instagram: {
      primary: IMAGE_URLS.social.instagram,
      fallback: IMAGE_URLS.external.instagramIcon,
    },
    twitch: {
      primary: IMAGE_URLS.social.twitch,
      fallback: IMAGE_URLS.external.twitchIcon,
    },
    tiktok: {
      primary: IMAGE_URLS.social.tiktok,
      fallback: IMAGE_URLS.external.tiktokIcon,
    },
  },
};

// Get Cash App logo with fallback
export function getCashAppLogo(): { primary: string; fallback: string } {
  return CASH_APP_IMAGES.logo;
}

// Get Cash App social icon with fallback
export function getCashAppSocialIcon(platform: 'twitter' | 'instagram' | 'twitch' | 'tiktok'): { primary: string; fallback: string } {
  return CASH_APP_IMAGES.socialIcons[platform];
}
