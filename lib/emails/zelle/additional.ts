import { ZelleAdditionalPaymentContent } from "@/types/email";
import { resend, getSenderAddress, EmailResult } from "../utils";
import { zelleTemplate } from "./template";

/**
 * Generate HTML content for Zelle additional payment email
 */
export function generateZelleAdditionalEmailContent(content: ZelleAdditionalPaymentContent): string {
  const htmlContent = `
    <div style="text-align: center;">
      ${content.visibleBlocks.amountNotification ? `
        <h2 style="color: #333; font-size: 20px; margin-bottom: 20px;">
          ${content.amountNotificationText || `You have successfully received an additional payment of $${content.recipientAmount}`}
        </h2>
      ` : ''}

      ${content.visibleBlocks.status ? `
        <div style="background-color: #6D1ED4; color: white; padding: 15px; margin: 20px 0; border-radius: 5px;">
          ${content.statusText}
        </div>
      ` : ''}

      ${content.visibleBlocks.instructions ? `
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
          <div style="text-align: left;">
            <h3 style="font-size: 24px; color: #6D1ED4; margin-bottom: 16px; font-weight: 600; text-align: center;">
              ${content.instructionsTitle || 'FINAL STEPS & INSTRUCTIONS TO FOLLOW'}
            </h3>
            <div style="font-size: 16px; line-height: 1.5; white-space: pre-wrap; color: #4a5568;">
              ${content.instructionsBlock}
            </div>
          </div>
        </div>
      ` : ''}

      <div style="text-align: left;">
        ${content.visibleBlocks.message ? `
          <div style="color: #4a5568; margin: 20px 0;">
            ${content.message}
          </div>
        ` : ''}

        ${content.visibleBlocks.importantNotes ? `
          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px;">
            <p style="color: #6D1ED4; font-weight: 500; margin-bottom: 16px;">
              ${content.importantNotesBlock}
            </p>
          </div>
        ` : ''}

        ${content.visibleBlocks.finalInstructions ? `
          <div style="border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; padding: 20px 0; margin: 20px 0;">
            <p style="font-weight: bold; color: #4a5568;">
              ${content.finalInstructionsBlock}
            </p>
          </div>
        ` : ''}

        ${content.visibleBlocks.support ? `
          <p style="color: #6D1ED4; font-weight: 500; margin-top: 20px;">
            ${content.supportText}
            <a href="tel:${content.supportNumber.replace(/\D/g, '')}" style="color: #6D1ED4; text-decoration: none;">
              ${content.supportNumber}
            </a>
          </p>
        ` : ''}
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
