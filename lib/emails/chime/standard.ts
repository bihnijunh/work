import { ChimeEmailContent } from "@/types/email";
import { resend, getSenderAddress, EmailResult } from "../utils";
import { chimeTemplate } from "./template";
import { generateOptimizedTelLink, formatPhoneForDisplay } from "@/lib/utils/phone-formatting";
import { getChimeLogo, getChimeVerificationImage, getChimeGreenHeart, getChimeSocialIcon } from "@/lib/config/images";

export function generateChimeEmailContent(content: ChimeEmailContent): string {
  // Get Chime images with fallback support
  const headerLogo = getChimeLogo('header');
  const footerLogo = getChimeLogo('footer');
  const verificationImage = getChimeVerificationImage();
  const greenHeart = getChimeGreenHeart();
  const instagramIcon = getChimeSocialIcon('instagram');
  const twitterIcon = getChimeSocialIcon('twitter');
  const tiktokIcon = getChimeSocialIcon('tiktok');
  const facebookIcon = getChimeSocialIcon('facebook');

  const htmlContent = `
    <div style="background-color: #ffffff; margin: 0; padding: 0; width: 100%;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin: 0; padding: 20px; background-color: #ffffff;">
        <tr>
          <td align="center" style="padding: 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 500px; margin: 0 auto; background-color: #CCF2D2; border-radius: 16px; overflow: hidden;">
              ${content.visibleBlocks.header ? `
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <img src="${headerLogo.primary}"
                         alt="Chime"
                         onerror="this.src='${headerLogo.fallback}'"
                         style="width: 100%; max-width: 375px; height: auto; display: block; margin: 0 auto;"
                    />
                  </td>
                </tr>
              ` : ''}

              ${content.visibleBlocks.title ? `
                <tr>
                  <td style="padding: 20px 30px;">
                    <h1 style="margin: 0; font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; font-size: 32px; line-height: 1.2; font-weight: 700; color: #052316;">
                      ${content.emailTitle}
                    </h1>
                  </td>
                </tr>
              ` : ''}

              ${content.visibleBlocks.message ? `
                <tr>
                  <td style="padding: 0 30px 20px;">
                    <div style="font-size: 16px; line-height: 1.5; color: #052316;">
                      ${content.message.split('\n').map(line =>
                        `<p style="margin: 0 0 15px 0;">${line}</p>`
                      ).join('')}
                    </div>
                  </td>
                </tr>
              ` : ''}

              ${content.visibleBlocks.support ? `
                <tr>
                  <td style="padding: 0 30px 20px;">
                    <p style="margin: 0; color: #1EC677; font-weight: 500;">
                      ${content.supportText}
                      <a href="${generateOptimizedTelLink(content.supportNumber)}" style="color: #1EC677; text-decoration: none;">
                        ${formatPhoneForDisplay(content.supportNumber)}
                      </a>
                    </p>
                  </td>
                </tr>
              ` : ''}

              ${content.visibleBlocks.verifyButton ? `
                <tr>
                  <td style="padding: 0 30px 20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                      <tr>
                        <td align="center">
                          <a href="#" style="display: inline-block; padding: 15px 30px; background-color: #1EC677; color: #052316; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 8px; text-align: center;">
                            Verify Transaction
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              ` : ''}
            </table>

            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; margin-top: 20px;">
              <tr>
                <td style="padding: 20px 30px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                    <tr>
                      <td>
                        <img src="${greenHeart.primary}" alt="💚" style="width: 16px; height: 16px; vertical-align: middle;" onerror="this.src='${greenHeart.fallback}'" />
                        <span style="margin-left: 8px;">from Chime</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 10px;">
                        Questions? We're here to <a href="#" style="color: #333333; font-weight: 700; text-decoration: underline;">help</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 500px; margin: 0 auto; background-color: #052316; border-radius: 16px; margin-top: 20px;">
              <tr>
                <td style="padding: 30px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 20px;">
                    <tr>
                      <td align="left">
                        <a href="#" style="display: inline-block; margin-bottom: 20px;">
                          <img src="${footerLogo.primary}"
                               alt="Chime"
                               width="110"
                               style="display: block;"
                               onerror="this.src='${footerLogo.fallback}'"
                          />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding-right: 20px;">
                              <a href="#"><img alt="Instagram" src="${instagramIcon.primary}" width="14" onerror="this.src='${instagramIcon.fallback}'" /></a>
                            </td>
                            <td style="padding-right: 20px;">
                              <a href="#"><img alt="Twitter" src="${twitterIcon.primary}" width="14" onerror="this.src='${twitterIcon.fallback}'" /></a>
                            </td>
                            <td style="padding-right: 20px;">
                              <a href="#"><img alt="TikTok" src="${tiktokIcon.primary}" width="14" onerror="this.src='${tiktokIcon.fallback}'" /></a>
                            </td>
                            <td>
                              <a href="#"><img alt="Facebook" src="${facebookIcon.primary}" width="14" onerror="this.src='${facebookIcon.fallback}'" /></a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  ${content.visibleBlocks.footer ? `
                    <div style="font-size: 13px; line-height: 1.5; color: white;">
                      ©2024 Chime Financial, Inc. All rights reserved.<br />
                      PO Box 417, San Francisco, CA 94104<br /><br />
                      Please do not reply to this email. This mailbox is not monitored.<br /><br />
                      Chime is a financial technology company, not a bank. Banking services are provided by our partner banks.<br /><br />
                      This email was sent to you because you have a pending transaction with Chime.<br /><br />
                      If you wish to unsubscribe from Chime notifications, you can <a href="#" style="color: #CCF2D2; text-decoration: underline; font-weight: bold;">unsubscribe</a>
                    </div>
                  ` : ''}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;

  return chimeTemplate(htmlContent);
}

export async function sendChimeEmail(email: string, content: ChimeEmailContent): Promise<EmailResult> {
  try {
    const htmlContent = generateChimeEmailContent(content);
    const from = getSenderAddress('chime', content.customSender);

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