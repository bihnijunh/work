import { ChimeEmailContent } from "@/types/email";
import { resend, formatEmailWithName, EmailResult } from "../utils";
import { chimeTemplate } from "./template";

export function generateChimeEmailContent(content: ChimeEmailContent): string {
  const htmlContent = `
    <div style="background-color: #ffffff; margin: 0; padding: 0; width: 100%;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin: 0; padding: 20px; background-color: #ffffff;">
        <tr>
          <td align="center" style="padding: 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 500px; margin: 0 auto; background-color: #CCF2D2; border-radius: 16px; overflow: hidden;">
              ${content.visibleBlocks.header ? `
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <img src="https://braze-images.com/appboy/communication/assets/image_assets/images/65cb26e0d78955004bdec58e/original.png"
                         alt="Chime"
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
                      <a href="tel:${content.supportNumber.replace(/\D/g, '')}" style="color: #1EC677; text-decoration: none;">
                        ${content.supportNumber}
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
                        <img src="https://fonts.gstatic.com/s/e/notoemoji/16.0/1f49a/32.png" alt="💚" style="width: 16px; height: 16px; vertical-align: middle;" />
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
                          <img src="https://ci3.googleusercontent.com/meips/ADKq_NYX3j8L4ZBBgeruVzUH5ksfkxYAQCVcxEjMxNqhPV6Ea4-EkazJr4_-dEfTdW1r9U_raBoW6ok11XPdx-pSikP6G1T51f7-FRzjmOjsOnC1c5p88l43oOxoATEitzXh3nbqI7iQpgV1GvWdTKjDBZqb_omI8lJSZbXFuXpJ1dsGziCuevpt81TTAPb2afMh=s0-d-e1-ft"
                               alt="Chime"
                               width="110"
                               style="display: block;"
                          />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table role="presentation" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding-right: 20px;">
                              <a href="#"><img alt="Instagram" src="https://ci3.googleusercontent.com/meips/ADKq_NYM3vDdlqOicy6UW4Uq3QYjKZvw0Ekhr8OQUI7yXMk4PXZMTR7AOdZ8ZKCKj60toD35L83Xi2ZJsHgEfWxEDwiW2naXcL5bdYmigYUyCxCYsoFHBZu2NDIE4Zwt54YDnnZILfN9NXTz1XRfcxH2zZmPEVJcuLTSwilfrQMpaMnh3NbOsfi7ASn09OqzusEA=s0-d-e1-ft" width="14" /></a>
                            </td>
                            <td style="padding-right: 20px;">
                              <a href="#"><img alt="Twitter" src="https://ci3.googleusercontent.com/meips/ADKq_NaL4guiRAdmkN_DNXJqPfesPZSxroyigRWQeVMQi5xAFDAsr1caC0oiJDCKH0-53kqzgDpPjplkpzq1ESw7ji7b53F9BjhGuIPgxJsn9_sUbmbh4kCBrQbW5OuAB7O5a2BmMl_AbHyE5BnAz3JUhWFeGQrvYZsSS4OF5xgrQzECKMczvXujab9NJphX59Qo=s0-d-e1-ft" width="14" /></a>
                            </td>
                            <td style="padding-right: 20px;">
                              <a href="#"><img alt="TikTok" src="https://ci3.googleusercontent.com/meips/ADKq_NZWQZI0jfNiK0ZwfJcWnv_z0L2xs4LVeaZ1IkiT7ImyqRpXC5Szr17Q7F3jxkXELKYucZbc2fYYy6s7phBRWxQiYNMtEouC9QkIwt3wwAIfeT6Pp5dP-CqB_oWNpYthr9YCANoC0f5Qkl5gGRaS8sjGsf-j62wmziIkDdLDuJvQ6nkGFN3fy1piTA1oRFxZ=s0-d-e1-ft" width="14" /></a>
                            </td>
                            <td>
                              <a href="#"><img alt="Facebook" src="https://ci3.googleusercontent.com/meips/ADKq_NYPip5bFeQ5iVAAEqgnh2EWVP7qFXqOcN_B4DSulJco571Tz-Y-9yNFjw53C3FBqV5GjRa6j0m74iqXeallftg8HHwiqlswprFEnhF99MnT5trBRiH3L29m5VeP-3Pxt0325VU3kmkUaWvEv3hT47kO6dE2h5CxnARW_oZygRqbxE8mrnlCtkKKFrZY5Xyr=s0-d-e1-ft" width="14" /></a>
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