/**
 * Phone number formatting utilities for email templates
 * Ensures phone numbers work correctly across different email clients and devices
 */

/**
 * Format phone number for tel: links in emails
 * Removes all non-digit characters except the leading +
 * 
 * @param phoneNumber - Raw phone number string
 * @returns Formatted phone number for tel: links
 */
export function formatPhoneForTel(phoneNumber: string): string {
  if (!phoneNumber) return '';
  
  // Remove all characters except digits and +
  let cleaned = phoneNumber.replace(/[^\d+]/g, '');
  
  // If it starts with 1 and doesn't have +, add +1
  if (cleaned.match(/^1\d{10}$/)) {
    cleaned = '+' + cleaned;
  }
  // If it's 10 digits, add +1
  else if (cleaned.match(/^\d{10}$/)) {
    cleaned = '+1' + cleaned;
  }
  // If it doesn't start with + but has country code, add +
  else if (cleaned.match(/^\d{11,}$/) && !cleaned.startsWith('+')) {
    cleaned = '+' + cleaned;
  }
  
  return cleaned;
}

/**
 * Format phone number for display in emails
 * Keeps the original formatting for readability
 * 
 * @param phoneNumber - Raw phone number string
 * @returns Formatted phone number for display
 */
export function formatPhoneForDisplay(phoneNumber: string): string {
  if (!phoneNumber) return '';
  
  // Return as-is for display, but ensure it's clean
  return phoneNumber.trim();
}

/**
 * Generate email-safe phone link HTML
 * Creates a tel: link that works better across email clients
 * 
 * @param phoneNumber - Raw phone number string
 * @param displayText - Optional custom display text
 * @param className - Optional CSS class
 * @param style - Optional inline styles
 * @returns HTML string for phone link
 */
export function generatePhoneLink(
  phoneNumber: string, 
  displayText?: string,
  className?: string,
  style?: string
): string {
  if (!phoneNumber) return displayText || '';
  
  const telNumber = formatPhoneForTel(phoneNumber);
  const displayNumber = displayText || formatPhoneForDisplay(phoneNumber);
  
  // Build attributes
  const classAttr = className ? ` class="${className}"` : '';
  const styleAttr = style ? ` style="${style}"` : '';
  
  return `<a href="tel:${telNumber}"${classAttr}${styleAttr}>${displayNumber}</a>`;
}

/**
 * Validate phone number format
 * 
 * @param phoneNumber - Phone number to validate
 * @returns True if phone number appears valid
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  if (!phoneNumber) return false;
  
  const cleaned = phoneNumber.replace(/[^\d]/g, '');
  
  // Should have at least 10 digits (US format) or 11 with country code
  return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Format phone number specifically for US numbers
 * Converts various formats to standard US format
 * 
 * @param phoneNumber - Raw phone number
 * @returns Formatted US phone number
 */
export function formatUSPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) return '';
  
  const cleaned = phoneNumber.replace(/[^\d]/g, '');
  
  // Handle different US formats
  if (cleaned.length === 10) {
    // Format: (XXX) XXX-XXXX
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    // Format: +1 (XXX) XXX-XXXX
    const number = cleaned.slice(1);
    return `+1 (${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;
  }
  
  // Return original if not standard US format
  return phoneNumber;
}

/**
 * Email client specific phone formatting
 * Some email clients handle tel: links differently
 */
export const EMAIL_CLIENT_PHONE_FORMATS = {
  // Gmail handles tel: links well but prefers +1 format
  gmail: (phone: string) => formatPhoneForTel(phone),
  
  // Outlook sometimes has issues with tel: links
  outlook: (phone: string) => formatPhoneForTel(phone),
  
  // Apple Mail handles tel: links very well
  appleMail: (phone: string) => formatPhoneForTel(phone),
  
  // Default format for unknown clients
  default: (phone: string) => formatPhoneForTel(phone)
};

/**
 * Generate phone link with email client optimization
 * 
 * @param phoneNumber - Raw phone number
 * @param clientHint - Email client hint (optional)
 * @returns Optimized tel: URL
 */
export function generateOptimizedTelLink(phoneNumber: string, clientHint?: string): string {
  const formatter = EMAIL_CLIENT_PHONE_FORMATS[clientHint as keyof typeof EMAIL_CLIENT_PHONE_FORMATS] 
    || EMAIL_CLIENT_PHONE_FORMATS.default;
  
  return `tel:${formatter(phoneNumber)}`;
}
