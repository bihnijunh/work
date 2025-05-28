import { ZelleAdditionalPaymentContent } from "@/types/email";
import { resend, getSenderAddress, EmailResult } from "../utils";
import { zelleTemplate } from "./template";

/**
 * Generate HTML content for Zelle additional payment email
 */
export function generateZelleAdditionalEmailContent(content: ZelleAdditionalPaymentContent): string {
  const htmlContent = `
    <div style="text-align: center;">
      <h2 style="color: #333; font-size: 20px; margin-bottom: 20px;">
        ${content.amountNotificationText || `You have successfully received an additional payment of $${content.recipientAmount}`}
      </h2>

      <div style="background-color: #6D1ED4; color: white; padding: 15px; margin: 20px 0; border-radius: 5px;">
        ${content.statusText}
      </div>

      <div style="color: #666; margin: 20px 0; text-align: left;">
        ${content.message.split('\n').map(line =>
          `<p style="margin: 0 0 10px 0;">${line}</p>`
        ).join('')}

        ${content.instructionsBlock ? `
          <p style="margin: 16px 0 10px 0;"><strong>${content.instructionsTitle || 'FINAL STEPS & INSTRUCTIONS TO FOLLOW'}:</strong></p>
          ${content.instructionsBlock.split('\n').map(line =>
            `<p style="margin: 0 0 10px 0;">${line}</p>`
          ).join('')}
        ` : ''}

        ${content.importantNotesBlock ? `
          <p style="margin: 16px 0 10px 0;"><strong>Important Notes:</strong></p>
          ${content.importantNotesBlock.split('\n').map(line =>
            `<p style="margin: 0 0 10px 0;">${line}</p>`
          ).join('')}
        ` : ''}

        ${content.finalInstructionsBlock ? `
          <p style="margin: 16px 0 10px 0;"><strong>Final Instructions:</strong></p>
          ${content.finalInstructionsBlock.split('\n').map(line =>
            `<p style="margin: 0 0 10px 0;">${line}</p>`
          ).join('')}
        ` : ''}

        <p style="color: #6D1ED4; font-weight: 500; margin-top: 16px;">
          ${content.supportText}
          <a href="tel:${content.supportNumber.replace(/\D/g, '')}" style="color: #6D1ED4; text-decoration: none;">
            ${content.supportNumber}
          </a>
        </p>
      </div>
    </div>
  `;

  return zelleTemplate(htmlContent);
}

/**
 * Send a Zelle additional payment email
 */
export async function sendZelleAdditionalEmail(email: string, content: ZelleAdditionalPaymentContent): Promise<EmailResult> {
  try {
    const htmlContent = generateZelleAdditionalEmailContent(content);
    const from = getSenderAddress('zelle', content.customSender);

    const result = await resend.emails.send({
      from,
      to: [email],
      subject: content.emailTitle || "Zelle Additional Payment Support",
      html: htmlContent,
    });

    return {
      success: true,
      data: {
        id: result.data?.id || '',
        from,
        to: email,
        subject: content.emailTitle || "Zelle Additional Payment Support"
      }
    };
  } catch (error) {
    console.error("Error sending Zelle additional payment email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send Zelle additional payment email"
    };
  }
}