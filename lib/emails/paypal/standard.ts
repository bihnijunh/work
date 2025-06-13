import { PaypalEmailContent } from "@/types/email";
import { resend, getSenderAddress, wrapEmailContent, EmailResult } from "../utils";
import { generateOptimizedTelLink, formatPhoneForDisplay } from "@/lib/utils/phone-formatting";
import { getPayPalLogo } from "@/lib/config/images";

/**
 * Generate HTML content for PayPal email
 */
export function generatePaypalEmailContent(content: PaypalEmailContent): string {
  const headerLogo = getPayPalLogo('header');
  const footerLogo = getPayPalLogo('footer');

  return `
    <div style="max-width: 640px; margin: 0 auto; background-color: #FAF8F5;">
      <!-- Header with Logo and Greeting -->
      <div style="background-color: #FAF8F5; padding: 16px 32px;">
        <p style="color: #687173; font-weight: 500; font-size: 14px; margin: 0 0 16px 0;">
          Hello, ${content.recipientName}
        </p>
        <img
          src="${headerLogo.primary}"
          alt="PayPal"
          style="width: 63px; height: 63px;"
          onerror="this.src='${headerLogo.fallback}'"
        />
      </div>

      <!-- Main Content -->
      <div style="padding: 0 32px 32px 32px;">
        <h1 style="font-size: 32px; font-weight: 500; line-height: 38px; color: #001c64; margin: 24px 0;">
          ${content.title}
        </h1>

        <div style="font-size: 14px; color: #2c2e2f;">
          <div style="background-color: #0070BA; color: white; padding: 16px; border-radius: 8px; text-align: center; font-size: 18px; font-weight: 500; margin-bottom: 24px;">
            You have received $${content.amount} from ${content.senderName}
          </div>

          <div style="background-color: #F5F7FA; padding: 16px; border-radius: 8px; text-align: center; font-weight: 500; margin-bottom: 24px;">
            ${content.statusHeading}: ${content.status}
          </div>

          <div style="margin-bottom: 24px;">
            ${content.message.split('\n').map(paragraph =>
              `<p style="margin-bottom: 16px;">${paragraph}</p>`
            ).join('')}
          </div>

          <div style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
            <p style="color: #0070BA; font-weight: 500;">
              ${content.supportText}
              <a href="${generateOptimizedTelLink(content.supportNumber)}" style="color: #0070BA; text-decoration: none;">
                ${formatPhoneForDisplay(content.supportNumber)}
              </a>
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="border-top: 1px solid #e5e7eb;">
        <div style="padding: 16px;">
          <img
            src="${footerLogo.primary}"
            alt="PayPal"
            style="width: 283px; height: 100px;"
            onerror="this.src='${footerLogo.fallback}'"
          />
        </div>

        <!-- Footer Links -->
        <div style="padding: 8px 32px; font-size: 12px; font-weight: 500;">
          <div style="color: #0070e0;">
            <a href="#" style="color: #0070e0; text-decoration: none;">Help & Contact</a>
            <span style="color: #9ca3af; margin: 0 8px;">|</span>
            <a href="#" style="color: #0070e0; text-decoration: none;">Security</a>
            <span style="color: #9ca3af; margin: 0 8px;">|</span>
            <a href="#" style="color: #0070e0; text-decoration: none;">Apps</a>
          </div>
        </div>

        <!-- Footer Text -->
        <div style="padding: 16px 32px; font-size: 12px; color: #2c2e2f;">
          <p style="margin-bottom: 16px;">
            PayPal is committed to preventing fraudulent emails. Emails from PayPal will always contain your full name.
            <a href="#" style="color: #0070e0; text-decoration: none; margin-left: 4px;">
              Learn to identify phishing
            </a>
          </p>
          <p style="margin-bottom: 16px;">
            Please don't reply to this email. To get in touch with us, click
            <a href="#" style="color: #0070e0; text-decoration: none; margin-left: 4px;">
              Help & Contact
            </a>.
          </p>
          <p style="margin-bottom: 16px;">
            Copyright 1999-${new Date().getFullYear()} PayPal. All rights reserved.
          </p>
          <p style="margin: 0;">
            PayPal Pte. Ltd. is licensed by the Monetary Authority of Singapore as a Major Payment Institution under the Payment Services Act 2019.
          </p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Send a PayPal email
 */
export async function sendPaypalEmail(email: string, content: PaypalEmailContent): Promise<EmailResult> {
  try {
    const htmlContent = generatePaypalEmailContent(content);
    const from = getSenderAddress('paypal', content.customSender);

    const result = await resend.emails.send({
      from,
      to: [email],
      subject: content.title || "PayPal Support",
      html: wrapEmailContent(htmlContent),
    });

    return {
      success: true,
      data: {
        id: result.data?.id || '',
        from,
        to: email,
        subject: content.title || "PayPal Support"
      }
    };
  } catch (error) {
    console.error("Error sending PayPal email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send PayPal email"
    };
  }
}
