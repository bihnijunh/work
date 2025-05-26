/**
 * Cloudinary hosted logo URLs
 * After uploading logos to Cloudinary, these URLs will be used instead of external sources
 */

export const CLOUDINARY_LOGOS = {
  zelle: {
    url: 'https://res.cloudinary.com/dmieu4ase/image/upload/v1/email-logos/zelle-logo.png',
    alt: 'Zelle',
    width: 200,
    height: 32
  },
  paypal: {
    header: {
      url: 'https://res.cloudinary.com/dmieu4ase/image/upload/v1/email-logos/paypal-header-logo.png',
      alt: 'PayPal',
      width: 63,
      height: 63
    },
    footer: {
      url: 'https://res.cloudinary.com/dmieu4ase/image/upload/v1/email-logos/paypal-footer-logo.png',
      alt: 'PayPal',
      width: 283,
      height: 100
    }
  },
  chime: {
    url: 'https://res.cloudinary.com/dmieu4ase/image/upload/v1/email-logos/chime-logo.png',
    alt: 'Chime',
    width: 375,
    height: 100
  }
};

/**
 * Get optimized Cloudinary URL with transformations
 */
export function getOptimizedImageUrl(
  publicId: string, 
  options: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
  } = {}
): string {
  const baseUrl = 'https://res.cloudinary.com/dmieu4ase/image/upload';
  
  const transformations = [];
  
  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  if (options.format) transformations.push(`f_${options.format}`);
  
  // Add auto optimization
  transformations.push('f_auto', 'q_auto');
  
  const transformString = transformations.length > 0 ? `/${transformations.join(',')}` : '';
  
  return `${baseUrl}${transformString}/v1/${publicId}`;
}
