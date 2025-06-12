import { CashAppPaymentEmailContent } from "@/types/email";
import { resend, getSenderAddress, EmailResult } from "../utils";
import { cashAppPaymentTemplate } from "./template";
import { IMAGE_URLS } from "@/lib/config/images";

/**
 * Generate HTML content for Cash App Payment email
 */
export function generateCashAppPaymentEmailContent(content: CashAppPaymentEmailContent): string {
  const {
    senderName,
    senderHandle,
    senderProfileImage,
    amount,
    paymentDescription = "miscellaneous",
    supportText,
    supportPhone = "1 (336) 310-9279",
    supportHours = "9 AM to 7 PM ET",
    visibleBlocks = {
      header: true,
      senderInfo: true,
      amount: true,
      supportInfo: true,
      socialLinks: true,
      footer: true
    }
  } = content;

  // Use GitHub-hosted image as primary, with CDN as fallback
  const githubProfileImage = IMAGE_URLS.profiles.mariaElena;
  const fallbackProfileImage = IMAGE_URLS.external.cashAppProfile;

  // Validate and use profile image with fallback
  let profileImageUrl = githubProfileImage;
  if (senderProfileImage) {
    // Prefer hosted URLs for better email deliverability
    if (senderProfileImage.startsWith('http')) {
      profileImageUrl = senderProfileImage;
    } else if (senderProfileImage.startsWith('data:image/') && senderProfileImage.includes('base64,')) {
      // Only use base64 as last resort and warn about potential issues
      console.warn('Using base64 image in email - this may affect deliverability. Consider using hosted images.');
      profileImageUrl = senderProfileImage;
    }
    // If invalid format, fall back to GitHub hosted image
  }

  // Add fallback URL as a data attribute for email clients that support it
  const profileImageWithFallback = `${profileImageUrl}" onerror="this.src='${fallbackProfileImage}'`;

  const htmlContent = `
    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="content-table">
      <tbody>
        <tr>
          <td></td>
          <td align="center" width="640">
            <table width="100%" cellspacing="0" cellpadding="0" border="0" class="main-content-table">
              <tbody>
                ${visibleBlocks.header ? `
                <tr>
                  <td style="padding: 0px 24px;"></td>
                </tr>
                <tr>
                  <td style="padding: 42px 32px;" height="48" width="120">
                    <img src="https://cash-s.squarecdn.com/static/email/arcade/cash-app-logo.png"
                         alt="Cash App Logo"
                         height="48"
                         width="120"
                         class="cash-app-logo">
                  </td>
                </tr>
                ` : ''}

                <tr>
                  <td width="100%" align="center" style="padding: 0px 32px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="main-content-table">
                      <tbody>
                        <tr>
                          <td style="padding: 0px 32px;" width="100%">
                            <table width="100%" cellspacing="0" cellpadding="0" border="0">
                              <tbody>
                                <tr>
                                  <td height="44">
                                    <img src="https://cash-s.squarecdn.com/static/images/alpha.gif"
                                         width="1"
                                         height="44"
                                         alt=""
                                         style="display: block;">
                                  </td>
                                </tr>

                                ${visibleBlocks.senderInfo ? `
                                <tr>
                                  <td style="padding-bottom: 16px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tbody>
                                        <tr>
                                          <td align="left">
                                            <img height="64"
                                                 width="64"
                                                 class="profile-image"
                                                 src="${profileImageWithFallback}"
                                                 alt="Profile picture of ${senderName}"
                                                 style="border-radius: 50%; display: block; height: 64px; width: 64px; object-fit: cover; border: 0; background-image: url('${fallbackProfileImage}'); background-size: cover; background-position: center;">
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="left">
                                            <div class="sender-name">
                                              ${senderName}
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="left">
                                            <span class="payment-from">Payment from ${senderHandle}</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                ` : ''}

                                ${visibleBlocks.amount ? `
                                <tr>
                                  <td align="left" style="padding-bottom: 32px;">
                                    <span class="amount">$${amount}</span>
                                  </td>
                                </tr>
                                ` : ''}

                                ${visibleBlocks.supportInfo ? `
                                <tr>
                                  <td>
                                    <table style="width: 100%; border-top-style: solid; border-width: 1px; border-color: #e8e8e8; color: #666666;">
                                      <tbody>
                                        <tr></tr>
                                        <tr>
                                          <td style="line-height: 20px; font-size: 14px; display: block;">
                                            <p class="support-text">
                                              ${supportText || `For any issues, including the recipient not receiving funds, please contact us at`}
                                              <a href="#" class="support-link">support</a>
                                              or you can reach Cash App Support by calling
                                              <a href="tel:${supportPhone?.replace(/\s/g, '')}" class="support-link">${supportPhone}</a>.
                                              We're here to help every day from ${supportHours}.
                                            </p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td class="footer-links">
                                            <span>
                                              <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
                                            </span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                ` : ''}

                                ${visibleBlocks.socialLinks ? `
                                <tr>
                                  <td style="padding: 32px 0px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tbody>
                                        <tr>
                                          <td height="48" width="120">
                                            <img src="https://cash-s.squarecdn.com/static/email/arcade/cash-app-logo.png"
                                                 alt="Cash App Logo"
                                                 height="48"
                                                 width="120"
                                                 class="cash-app-logo">
                                          </td>
                                          <td align="right" valign="middle">
                                            <table>
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                      <tbody>
                                                        <tr>
                                                          <td valign="top" height="17" width="17" style="padding-right: 40px;">
                                                            <a href="https://twitter.com/CashApp">
                                                              <img alt="Twitter"
                                                                   src="https://cash-s.squarecdn.com/static/email/arcade/x.png"
                                                                   height="17"
                                                                   width="17"
                                                                   class="social-icon">
                                                            </a>
                                                          </td>
                                                          <td valign="top" height="18" width="18" style="padding-right: 40px;">
                                                            <a href="https://www.instagram.com/cashapp">
                                                              <img alt="Instagram"
                                                                   src="https://cash-s.squarecdn.com/static/email/arcade/instagram.png"
                                                                   height="18"
                                                                   width="18"
                                                                   class="social-icon">
                                                            </a>
                                                          </td>
                                                          <td valign="top" height="20" width="19" style="padding-right: 40px;">
                                                            <a href="https://www.twitch.tv/cashapp">
                                                              <img alt="Twitch"
                                                                   src="https://cash-s.squarecdn.com/static/email/arcade/twitch.png"
                                                                   height="20"
                                                                   width="19"
                                                                   class="social-icon">
                                                            </a>
                                                          </td>
                                                          <td valign="top" height="18" width="16">
                                                            <a href="https://www.tiktok.com/@cashapp">
                                                              <img alt="Tiktok"
                                                                   src="https://cash-s.squarecdn.com/static/email/arcade/tiktok.png"
                                                                   height="18"
                                                                   width="16"
                                                                   class="social-icon">
                                                            </a>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                ` : ''}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                ${visibleBlocks.footer ? `
                <tr>
                  <td align="center" style="padding: 32px;">
                    <table width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tbody>
                        <tr>
                          <td>
                            <p class="footer-text">
                              Cash App is a service of Block, Inc., 1955 Broadway Street, Suite 600, Oakland, CA 94612.
                              Review <a href="#">licenses</a>.
                              <span style="display: block; margin-top: 12px;">
                                Cash App is a financial services platform, not a bank. Banking services are provided by
                                Cash App's bank partner(s). Prepaid debit cards issued by Sutton Bank. Money transmission
                                and bitcoin services by Block, Inc. Tax preparation services by Cash App Taxes, Inc.
                              </span>
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                ` : ''}
              </tbody>
            </table>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  `;

  return cashAppPaymentTemplate(htmlContent);
}

/**
 * Send a Cash App Payment email
 */
export async function sendCashAppPaymentEmail(email: string, content: CashAppPaymentEmailContent): Promise<EmailResult> {
  try {
    const htmlContent = generateCashAppPaymentEmailContent(content);
    const from = getSenderAddress('cashapp', content.customSender); // Use cashapp sender for Cash App style emails

    const result = await resend.emails.send({
      from,
      to: [email],
      subject: content.subject || content.emailTitle || `${content.senderName} sent you $${content.amount}`,
      html: htmlContent,
    });

    return {
      success: true,
      data: {
        id: result.data?.id || '',
        from,
        to: email,
        subject: content.subject || content.emailTitle || `${content.senderName} sent you $${content.amount}`
      }
    };
  } catch (error) {
    console.error("Error sending Chase email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send Chase email"
    };
  }
}