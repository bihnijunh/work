import { Resend } from "resend";

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
