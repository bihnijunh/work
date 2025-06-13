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
    // PayPal logos - downloaded from PayPal CDN
    paypalHeader: `${GITHUB_BASE_URL}/logos/paypal-header-logo.png`,
    paypalFooter: `${GITHUB_BASE_URL}/logos/paypal-footer-logo.png`,
    // Chime logos - downloaded from Chime CDN
    chimeHeader: `${GITHUB_BASE_URL}/logos/chime-header-logo.png`,
    chimeFooter: `${GITHUB_BASE_URL}/logos/chime-footer-logo.png`,
    chimeVerification: `${GITHUB_BASE_URL}/logos/chime-verification.png`,
    // Zelle logo - downloaded from Zelle CDN
    zelle: `${GITHUB_BASE_URL}/logos/zelle-logo.png`,
  },

  // Social media icons hosted on GitHub
  social: {
    // Social media icons - downloaded from Cash App CDN
    twitter: `${GITHUB_BASE_URL}/social/x.png`,
    instagram: `${GITHUB_BASE_URL}/social/instagram.png`,
    twitch: `${GITHUB_BASE_URL}/social/twitch.png`,
    tiktok: `${GITHUB_BASE_URL}/social/tiktok.png`,
  },

  // Icons hosted on GitHub
  icons: {
    // Green heart emoji - downloaded from Google Fonts
    greenHeart: `${GITHUB_BASE_URL}/icons/green-heart-emoji.png`,
    // Chime social media icons - downloaded from Chime CDN
    chimeInstagram: `${GITHUB_BASE_URL}/icons/chime-social/instagram.png`,
    chimeTwitter: `${GITHUB_BASE_URL}/icons/chime-social/twitter.png`,
    chimeTiktok: `${GITHUB_BASE_URL}/icons/chime-social/tiktok.png`,
    chimeFacebook: `${GITHUB_BASE_URL}/icons/chime-social/facebook.png`,
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
    // PayPal logos (fallbacks)
    paypalHeaderLogo: 'https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/paypal-rebranding/pp-logo-in-circle-2x.png',
    paypalFooterLogo: 'https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/paypal-rebranding/footer-logo-with-crop-2x.png',
    // Chime logos (fallbacks)
    chimeHeaderLogo: 'https://braze-images.com/appboy/communication/assets/image_assets/images/65cb26e0d78955004bdec58e/original.png',
    chimeVerificationImage: 'https://braze-images.com/appboy/communication/assets/image_assets/images/66a75347189c73005c5ef712/original.png',
    chimeFooterLogo: 'https://braze-images.com/appboy/communication/assets/image_assets/images/65cb1e7c22a85f0055b6cf60/original.png',
    // Chime social media icons (fallbacks)
    chimeInstagramIcon: 'https://braze-images.com/appboy/communication/assets/image_assets/images/65cb1e7cc06cc2004c638d78/original.png',
    chimeTwitterIcon: 'https://braze-images.com/appboy/communication/assets/image_assets/images/65cb1e7ca660b4004ccd2634/original.png',
    chimeTiktokIcon: 'https://braze-images.com/appboy/communication/assets/image_assets/images/65cb1e7cabaa99004cf4ae37/original.png',
    chimeFacebookIcon: 'https://braze-images.com/appboy/communication/assets/image_assets/images/65cb1e7ce203eb004cfaecf2/original.png',
    // Green heart emoji (fallback)
    greenHeartEmoji: 'https://fonts.gstatic.com/s/e/notoemoji/16.0/1f49a/32.png',
    // Zelle logo (white horizontal with tagline) (fallback)
    zelleLogo: 'https://www.zellepay.com/sites/default/files/Zelle-logo-tagline-horizontal-white-v2_1_0.png',
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

// PayPal specific image utilities with fallback support
export const PAYPAL_IMAGES = {
  headerLogo: {
    primary: IMAGE_URLS.logos.paypalHeader,
    fallback: IMAGE_URLS.external.paypalHeaderLogo,
  },
  footerLogo: {
    primary: IMAGE_URLS.logos.paypalFooter,
    fallback: IMAGE_URLS.external.paypalFooterLogo,
  },
};

// Get PayPal logo with fallback
export function getPayPalLogo(type: 'header' | 'footer'): { primary: string; fallback: string } {
  return type === 'header' ? PAYPAL_IMAGES.headerLogo : PAYPAL_IMAGES.footerLogo;
}

// Chime specific image utilities with fallback support
export const CHIME_IMAGES = {
  headerLogo: {
    primary: IMAGE_URLS.logos.chimeHeader,
    fallback: IMAGE_URLS.external.chimeHeaderLogo,
  },
  footerLogo: {
    primary: IMAGE_URLS.logos.chimeFooter,
    fallback: IMAGE_URLS.external.chimeFooterLogo,
  },
  verificationImage: {
    primary: IMAGE_URLS.logos.chimeVerification,
    fallback: IMAGE_URLS.external.chimeVerificationImage,
  },
  greenHeart: {
    primary: IMAGE_URLS.icons.greenHeart,
    fallback: IMAGE_URLS.external.greenHeartEmoji,
  },
  socialIcons: {
    instagram: {
      primary: IMAGE_URLS.icons.chimeInstagram,
      fallback: IMAGE_URLS.external.chimeInstagramIcon,
    },
    twitter: {
      primary: IMAGE_URLS.icons.chimeTwitter,
      fallback: IMAGE_URLS.external.chimeTwitterIcon,
    },
    tiktok: {
      primary: IMAGE_URLS.icons.chimeTiktok,
      fallback: IMAGE_URLS.external.chimeTiktokIcon,
    },
    facebook: {
      primary: IMAGE_URLS.icons.chimeFacebook,
      fallback: IMAGE_URLS.external.chimeFacebookIcon,
    },
  },
};

// Get Chime logo with fallback
export function getChimeLogo(type: 'header' | 'footer'): { primary: string; fallback: string } {
  return type === 'header' ? CHIME_IMAGES.headerLogo : CHIME_IMAGES.footerLogo;
}

// Get Chime verification image with fallback
export function getChimeVerificationImage(): { primary: string; fallback: string } {
  return CHIME_IMAGES.verificationImage;
}

// Get Chime green heart emoji with fallback
export function getChimeGreenHeart(): { primary: string; fallback: string } {
  return CHIME_IMAGES.greenHeart;
}

// Get Chime social icon with fallback
export function getChimeSocialIcon(platform: 'instagram' | 'twitter' | 'tiktok' | 'facebook'): { primary: string; fallback: string } {
  return CHIME_IMAGES.socialIcons[platform];
}

// Zelle specific image utilities with fallback support
export const ZELLE_IMAGES = {
  logo: {
    primary: IMAGE_URLS.logos.zelle,
    fallback: IMAGE_URLS.external.zelleLogo,
  },
};

// Get Zelle logo with fallback
export function getZelleLogo(): { primary: string; fallback: string } {
  return ZELLE_IMAGES.logo;
}
