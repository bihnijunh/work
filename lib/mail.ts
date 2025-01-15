import { ZelleEmailContent, PaypalEmailContent } from '@/types/email';
import { Resend } from "resend";
import { ZelleEmailTemplate } from '@/components/ZelleEmailTemplate';
import { PaypalEmailTemplate } from '@/components/PaypalEmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

const emailTemplate = (content: string) => `
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
          ©2025 Early Warning Services, LLC. All rights reserved. Zelle and the Zelle marks used herein are trademarks 
          of Early Warning Services, LLC. Other product and company names mentioned herein are the property of their 
          respective owners.
        </p>
      </div>
    </div>
  </body>
  </html>
`;

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string
) => {
  const content = `
    <h2>Your Two-Factor Authentication Code</h2>
    <p>Use the following code to complete your login:</p>
    <h3 style="font-size: 24px; background-color: #e9e9e9; padding: 10px; text-align: center;">${token}</h3>
    <p>This code will expire in 5 minutes.</p>
    <p>If you didn't request this code, please ignore this email.</p>
  `;

  await resend.emails.send({
    from: "mail@milanosailexpress.com",
    to: email,
    subject: "Your 2FA Code - Milano Shipping Logistics",
    html: emailTemplate(content)
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  const content = `
    <h2>Reset Your Password</h2>
    <p>Click the button below to reset your password:</p>
    <a href="${resetLink}" class="button">Reset Password</a>
    <p>If you didn't request a password reset, please ignore this email.</p>
    <p>This link will expire in 1 hour.</p>
  `;

  await resend.emails.send({
    from: "mail@milanosailexpress.com",
    to: email,
    subject: "Reset Your Password - Milano Shipping Logistics",
    html: emailTemplate(content)
  });
};

export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const content = `
    <h2>Verify Your Email Address</h2>
    <p>Thank you for registering with Milano Shipping Logistics. Please click the button below to verify your email address:</p>
    <p style="text-align: center;">
      <a href="${confirmLink}" class="button">Verify Email</a>
    </p>
    <p>If you didn't create an account with us, you can safely ignore this email.</p>
    <p>This link will expire in 24 hours.</p>
  `;

  await resend.emails.send({
    from: "verify@milanosailexpress.com",
    to: email,
    subject: "Verify Your Email - Milano Shipping Logistics",
    html: emailTemplate(content)
  });
};

export async function sendFlightBookingConfirmationEmail(
  email: string,
  bookingDetails: {
    ticketNumber: string;
    passengerName: string;
    flightNumber: string;
    fromCity: string;
    toCity: string;
    departureDate: Date;
    returnDate?: Date | null;
  }
) {
  const { ticketNumber, passengerName, flightNumber, fromCity, toCity, departureDate, returnDate } = bookingDetails;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    }).format(new Date(date));
  };

  const flightStatusUrl = `${process.env.NEXT_PUBLIC_APP_URL}/flights/status/${ticketNumber}`;

  const content = `
    <div class="content" style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto;">
      <!-- Header with animated background -->
      <div style="background: linear-gradient(45deg, #003366, #1a4d80); padding: 30px; border-radius: 10px 10px 0 0; text-align: center; position: relative; overflow: hidden;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgMTBMOTAgOTBIMTBMNTAgMTB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=') repeat; animation: slide 20s linear infinite;"></div>
        <h1 style="color: white; margin: 0; position: relative; font-size: 28px;">✈️ Flight Confirmation</h1>
      </div>

      <!-- Passenger Info Card -->
      <div style="background: white; padding: 25px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #003366; margin-top: 0;">Hello ${passengerName} 👋</h2>
        <p style="color: #666; line-height: 1.6;">Your flight has been successfully booked!</p>
      </div>

      <!-- Flight Details Card -->
      <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0;">
        <!-- Flight Route Visualization -->
        <div style="padding: 40px 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin: 20px 0; flex-wrap: wrap;">
            <div style="text-align: center; flex: 1; min-width: 150px; padding: 20px;">
              <div style="font-size: 48px; margin-bottom: 15px;">🛫</div>
              <div style="font-weight: bold; color: #003366; font-size: 18px;">${fromCity}</div>
              <div style="color: #666; font-size: 14px; margin-top: 5px;">${formatDate(departureDate).split(',')[0]}</div>
            </div>
            
            <div style="flex: 2; min-width: 200px; position: relative; padding: 20px 0;">
              <div style="border-top: 3px dashed #003366; margin: 0 20px;">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #f8f9fa; padding: 15px; border-radius: 50%;">
                  <div style="font-size: 36px; transform: rotate(90deg) translateX(2px); display: inline-block;">✈️</div>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; flex: 1; min-width: 150px; padding: 20px;">
              <div style="font-size: 48px; margin-bottom: 15px;">🛬</div>
              <div style="font-weight: bold; color: #003366; font-size: 18px;">${toCity}</div>
              <div style="color: #666; font-size: 14px; margin-top: 5px;">
                ${returnDate ? formatDate(returnDate).split(',')[0] : formatDate(departureDate).split(',')[0]}
              </div>
            </div>
          </div>
        </div>

        <!-- Flight Info -->
        <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <span style="color: #666;">🎫 Ticket Number</span>
                <br>
                <strong>${ticketNumber}</strong>
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <span style="color: #666;">✈️ Flight Number</span>
                <br>
                <strong>${flightNumber}</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px;">
                <span style="color: #666;">📅 Departure</span>
                <br>
                <strong>${formatDate(departureDate)}</strong>
              </td>
              ${returnDate ? `
              <td style="padding: 10px;">
                <span style="color: #666;">🔄 Return</span>
                <br>
                <strong>${formatDate(returnDate)}</strong>
              </td>
              ` : ''}
            </tr>
          </table>
        </div>
      </div>

      <!-- Action Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="${flightStatusUrl}" style="display: inline-block; background-color: #003366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; transition: all 0.3s ease;">
          Check Flight Status →
        </a>
      </div>

      <!-- Important Information -->
      <div style="background: #fff4e6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #ff9800; margin-top: 0;">⚠️ Important Information</h3>
        <ul style="list-style-type: none; padding: 0; margin: 0;">
          <li style="padding: 10px 0; border-bottom: 1px solid rgba(255,152,0,0.2);">
            ⏰ Arrive at least 2 hours before departure
          </li>
          <li style="padding: 10px 0; border-bottom: 1px solid rgba(255,152,0,0.2);">
            🪪 Bring a valid ID or passport
          </li>
          <li style="padding: 10px 0;">
            🧳 Check baggage policy for allowed items
          </li>
        </ul>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding: 20px; color: #666; font-size: 14px;">
        <p>Need help? Contact our customer service</p>
        <div style="margin-top: 10px;">
          <a href="${flightStatusUrl}" style="color: #003366; text-decoration: none;">View booking online →</a>
        </div>
      </div>
    </div>

    <style>
      @keyframes slide {
        from { background-position: 0 0; }
        to { background-position: 100% 0; }
      }
    </style>
  `;

  try {
    await resend.emails.send({
      from: "Milano Shipping Logistics <bookings@milanosailexpress.com>",
      to: email,
      subject: `Flight Booking Confirmation - Ticket #${ticketNumber}`,
      html: emailTemplate(content),
    });
  } catch (error) {
    console.error("Failed to send flight booking confirmation email:", error);
  }
}

export async function sendZelle(email: string, content: ZelleEmailContent) {
  const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
      <div style="max-width: 640px; margin: 0 auto;">
        <!-- Header with Zelle Logo -->
        <div style="background-color: #6D1ED4; padding: 20px; text-align: center;">
          <img 
            src="https://www.zellepay.com/sites/default/files/Zelle-logo-tagline-horizontal-white-v2_1_0.png"
            alt="Zelle" 
            style="height: 32px; width: auto; max-width: 200px; margin: 0 auto; display: block;"
          />
        </div>

        <!-- Main Content -->
        <div style="padding: 24px; background-color: white;">
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
                ${content.supportText} ${content.supportNumber}
              </p>
            </div>

            <!-- Footer Text -->
            <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
              <div style="text-align: center; color: #6b7280; font-size: 14px;">
                <p style="margin: 12px 0;">
                  <a href="https://www.zellepay.com/privacy-policy" style="color: #6D1ED4; text-decoration: none;">
                    Do Not Sell or Share My Personal Information*
                  </a>
                </p>
                <p style="margin: 12px 0; font-size: 12px;">
                  *We don't sell data. However, we do share data for cross context behavioral advertising. 
                  You can opt out by clicking the link above.
                </p>
                <p style="margin: 16px 0 0 0; font-size: 12px;">
                  ©2025 Early Warning Services, LLC. All rights reserved. Zelle and the Zelle marks used herein are trademarks 
                  of Early Warning Services, LLC. Other product and company names mentioned herein are the property of their 
                  respective owners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // Extract email address from the fromEmail string
    const emailPart = content.fromEmail.match(/<(.+)>/) ? content.fromEmail : `<${content.fromEmail}>`;
    const from = `Zelle Support ${emailPart}`;

    const data = await resend.emails.send({
      from,
      to: [content.toEmail],
      subject: `Zelle Payment Notification - $${content.recipientAmount}`,
      html: emailTemplate,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending Zelle email:', error);
    throw error;
  }
}

export async function sendPaypal(email: string, content: PaypalEmailContent) {
  const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
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
                ${content.supportText} ${content.supportNumber}
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
              Copyright © 1999-${new Date().getFullYear()} PayPal. All rights reserved.
            </p>
            <p style="margin: 0;">
              PayPal Pte. Ltd. is licensed by the Monetary Authority of Singapore as a Major Payment Institution under the Payment Services Act 2019.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // Extract email address from the fromEmail string
    const emailPart = content.fromEmail.match(/<(.+)>/) ? content.fromEmail : `<${content.fromEmail}>`;
    const from = `PayPal Support ${emailPart}`;

    const data = await resend.emails.send({
      from,
      to: [content.toEmail],
      subject: content.title,
      html: emailTemplate,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending PayPal email:', error);
    throw error;
  }
}