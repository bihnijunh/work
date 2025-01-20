import { CashAppEmailContent } from "@/types/email";
import { resend, formatEmailWithName, EmailResult } from "../utils";
import { cashAppTemplate } from "./template";

export function generateCashAppEmailContent(content: CashAppEmailContent): string {
  const htmlContent = `
    <div style="text-align: center;">
      <h2 style="color: #333; font-size: 20px; margin-bottom: 20px;">
        ${content.emailTitle}
      </h2>
      
      <div style="color: #666; margin: 20px 0; text-align: left;">
        ${content.message.split('\n').map((line: string) => 
          `<p style="margin: 0 0 10px 0;">${line}</p>`
        ).join('')}
        
        <p style="color: #1EC677; font-weight: 500; margin-top: 16px;">
          ${content.supportText} 
          <a href="tel:${content.supportNumber.replace(/\D/g, '')}" style="color: #1EC677; text-decoration: none;">
            ${content.supportNumber}
          </a>
        </p>
      </div>
    </div>
  `;

  return cashAppTemplate(htmlContent);
}

export async function sendCashAppEmail(email: string, content: CashAppEmailContent): Promise<EmailResult> {
  try {
    const htmlContent = generateCashAppEmailContent(content);
    const from = formatEmailWithName(content.fromEmail, "Chime Support");

    const result = await resend.emails.send({
      from,
      to: [email],
      subject: content.emailTitle || "Chime Support",
      html: htmlContent,
    });

    return { 
      success: true, 
      data: {
        id: result.data?.id || '',
        from,
        to: email,
        subject: content.emailTitle || "Chime Support"
      }
    };
  } catch (error) {
    console.error("Error sending Chime email:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to send Chime email" 
    };
  }
} 