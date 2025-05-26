import { Resend } from "resend";
import { generateSender } from './sender-generator';

export const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Format an email address with a display name
 * @param email The email address
 * @param displayName The display name to show
 * @returns Formatted email string like "Display Name <email@example.com>"
 */
export function formatEmailWithName(email: string, displayName: string): string {
  const emailPart = email.match(/<(.+)>/) ? email : `<${email}>`;
  return `${displayName} ${emailPart}`;
}

/**
 * Generate sender address for a service with random department suffix
 */
export function generateServiceSender(
  service: 'paypal' | 'zelle' | 'chime' | 'cashapp',
  options: { useRandom?: boolean; consistent?: boolean } = {}
): string {
  const sender = generateSender(service, options);
  return sender.formatted;
}

/**
 * Get sender address - use custom if provided, otherwise generate random
 * Ensures proper "Display Name <email@domain.com>" format for Gmail recognition
 */
export function getSenderAddress(
  service: 'paypal' | 'zelle' | 'chime' | 'cashapp',
  customSender?: string
): string {
  if (customSender && customSender.trim()) {
    // If custom sender is provided, ensure it's in proper format
    const trimmed = customSender.trim();

    // If it already has display name format, use as-is
    if (trimmed.includes('<') && trimmed.includes('>')) {
      return trimmed;
    }

    // If it's just an email, add display name
    const displayName = generateSender(service).displayName;
    return `${displayName} <${trimmed}>`;
  }

  // Generate random sender with proper format
  return generateSender(service, { useRandom: true }).formatted;
}

/**
 * Wraps the email content in a template with consistent styling
 * @param content The HTML content to wrap
 * @returns Wrapped HTML content
 */
export function wrapEmailContent(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
}

export type EmailResult = {
  success: boolean;
  data?: {
    id: string;
    from: string;
    to: string[] | string;
    subject: string;
  };
  error?: string;
};
