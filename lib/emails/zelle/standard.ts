import { ZelleEmailContent } from "@/types/email";
import { resend, getSenderAddress, EmailResult } from "../utils";
import { zelleTemplate } from "./template";
import { generateOptimizedTelLink, formatPhoneForDisplay } from "@/lib/utils/phone-formatting";

/**
 * Generate HTML content for standard Zelle email
 */
export function generateZelleEmailContent(content: ZelleEmailContent): string {
  const htmlContent = `
    <div style="text-align: center;">
      <h2 style="color: #333; font-size: 20px; margin-bottom: 20px;">
        You have received $${content.recipientAmount} from ${content.senderName}
      </h2>

      <div style="background-color: #6D1ED4; color: white; padding: 15px; margin: 20px 0; border-radius: 5px;">
        ${content.statusText}
      </div>

      <div style="color: #666; margin: 20px 0; text-align: left;">
        ${content.message.split('\n').map(line =>
          `<p style="margin: 0 0 10px 0;">${line}</p>`
        ).join('')}

        <p style="color: #6D1ED4; font-weight: 500; margin-top: 16px;">
          ${content.supportText}
          <a href="${generateOptimizedTelLink(content.supportNumber)}" style="color: #6D1ED4; text-decoration: none;">
            ${formatPhoneForDisplay(content.supportNumber)}
          </a>
        </p>
      </div>
    </div>
  `;

  return zelleTemplate(htmlContent);
}

/**
 * Send a standard Zelle email
 */
export async function sendZelleEmail(email: string, content: ZelleEmailContent): Promise<EmailResult> {
  try {
    const htmlContent = generateZelleEmailContent(content);
    const from = getSenderAddress('zelle', content.customSender);

    const result = await resend.emails.send({
      from,
      to: [email],
      subject: content.emailTitle || "Zelle Support",
      html: htmlContent,
    });

    return {
      success: true,
      data: {
        id: result.data?.id || '',
        from,
        to: email,
        subject: content.emailTitle || "Zelle Support"
      }
    };
  } catch (error) {
    console.error("Error sending Zelle email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send Zelle email"
    };
  }
}
