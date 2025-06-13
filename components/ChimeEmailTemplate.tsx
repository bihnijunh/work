import { ChimeEmailContent } from '@/types/email';
import Image from 'next/image';
import { generateOptimizedTelLink, formatPhoneForDisplay } from '@/lib/utils/phone-formatting';
import { getChimeLogo, getChimeVerificationImage, getChimeGreenHeart, getChimeSocialIcon } from '@/lib/config/images';

interface ChimeEmailTemplateProps {
  content: ChimeEmailContent;
  onToggleBlock: (blockName: keyof ChimeEmailContent['visibleBlocks']) => void;
}

export function ChimeEmailTemplate({ content, onToggleBlock }: ChimeEmailTemplateProps) {
  // Get Chime images with fallback support
  const headerLogo = getChimeLogo('header');
  const footerLogo = getChimeLogo('footer');
  const verificationImage = getChimeVerificationImage();
  const greenHeart = getChimeGreenHeart();
  const instagramIcon = getChimeSocialIcon('instagram');
  const twitterIcon = getChimeSocialIcon('twitter');
  const tiktokIcon = getChimeSocialIcon('tiktok');
  const facebookIcon = getChimeSocialIcon('facebook');

  return (
    <div style={{
      height: '100%',
      width: '100%',
      fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
      color: '#052316',
      textAlign: 'left',
      fontSize: '18px',
      lineHeight: '26px',
      fontWeight: 400,
      margin: 0,
      padding: 0,
      backgroundColor: '#FFFFFF'
    }}>
      {/* Hidden preview text */}
      {content.visibleBlocks.preview && (
        <div
          style={{
        display: 'none',
        fontSize: '1px',
        color: '#ffffff',
        lineHeight: '1px',
        maxHeight: '0px',
        maxWidth: '0px',
        opacity: 0,
        overflow: 'hidden'
          }}
          onClick={() => onToggleBlock('preview')}
        >
        Finish enrolling and start getting paid earlier.
      </div>
      )}

      {/* Main Content Table */}
      <table style={{
        borderCollapse: 'collapse',
        borderSpacing: '0',
        tableLayout: 'fixed',
        margin: '0 auto',
        width: '100%',
        backgroundColor: '#FFFFFF'
      }}>
        <tbody>
          <tr>
            <td style={{ padding: 0 }}>
              <div style={{ width: '100%', textAlign: 'center' }}>
                {/* Header with Chime Logo */}
                {content.visibleBlocks.header && (
                  <table
                    style={{
                  borderSpacing: '0',
                  borderCollapse: 'collapse',
                  tableLayout: 'fixed',
                  margin: '0 auto',
                  width: '500px',
                  backgroundColor: '#CCF2D2'
                    }}
                    onClick={() => onToggleBlock('header')}
                  >
                  <tbody>
                    <tr>
                      <td style={{ padding: 0 }}>
                        <a href="https://www.chime.com" target="_blank" rel="noopener noreferrer">
                          <Image
                            src={headerLogo.primary}
                            alt="Chime"
                            width={375}
                            height={100}
                            style={{
                              width: '100%',
                              maxWidth: '375px',
                              height: 'auto'
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = headerLogo.fallback;
                            }}
                          />
                        </a>
                      </td>
                    </tr>

                  </tbody>
                </table>
                )}

                {/* Main Content Section */}
                <table style={{
                  borderSpacing: '0',
                  borderCollapse: 'collapse',
                  tableLayout: 'fixed',
                  margin: '0 auto',
                  width: '500px',
                  backgroundColor: '#CCF2D2'
                }}>
                  <tbody>
                    <tr>
                      <td style={{ fontSize: '10px', lineHeight: '10px', padding: '0 0 12px' }}>&nbsp;</td>
                    </tr>
                    {content.visibleBlocks.title && (
                      <tr onClick={() => onToggleBlock('title')}>
                        <td style={{ padding: '0 30px 22px' }}>
                          <div style={{
                            textAlign: 'left',
                            fontSize: '48px',
                            lineHeight: '52px',
                            fontWeight: 800,
                            color: '#052316',
                            fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
                            letterSpacing: '-0.5px'
                          }}>
                          {content.emailTitle}
                        </div>
                      </td>
                    </tr>
                    )}
                    {content.visibleBlocks.message && (
                      <tr onClick={() => onToggleBlock('message')}>
                        <td style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 400, padding: '0 30px 22px' }}>
                          <div style={{ textAlign: 'left' }}>
                            {content.message}
                          </div>
                        </td>
                      </tr>
                    )}
                    {/* Support Information */}
                    {content.visibleBlocks.support && (
                      <tr onClick={() => onToggleBlock('support')}>
                        <td style={{ padding: '0 30px 22px' }}>
                          <div style={{ textAlign: 'left', color: '#1EC677', fontWeight: 500 }}>
                            {content.supportText}{' '}
                            <a href={generateOptimizedTelLink(content.supportNumber)} style={{ color: '#1EC677', textDecoration: 'none' }}>
                              {formatPhoneForDisplay(content.supportNumber)}
                            </a>
                          </div>
                        </td>
                      </tr>
                    )}
                    {content.visibleBlocks.verifyButton && (
                      <tr onClick={() => onToggleBlock('verifyButton')}>
                        <td style={{ padding: '0 30px 22px' }}>
                          <table style={{
                            borderSpacing: '0',
                            borderCollapse: 'collapse',
                            tableLayout: 'fixed',
                            margin: '0 auto',
                            width: '100%'
                          }}>
                            <tbody>
                              <tr>
                                <td style={{
                                  borderRadius: '8px',
                                  padding: 0,
                                  backgroundColor: '#1EC677',
                                  textAlign: 'center'
                                }}>
                                  <a href="#" style={{
                                    textDecoration: 'none',
                                    color: '#052316',
                                    fontWeight: 'bold',
                                    backgroundColor: '#1EC677',
                                    fontSize: '18px',
                                    lineHeight: '26px',
                                    textAlign: 'center',
                                    display: 'block',
                                    borderRadius: '8px',
                                    padding: '0 5px',
                                    border: '15px solid #1EC677'
                                  }}>
                                    Verify Transaction
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ padding: '20px 0 0' }}>
                                  <img
                                    src={verificationImage.primary}
                                    alt="Chime Verification"
                                    style={{
                                      width: '100%',
                                      maxWidth: '440px',
                                      display: 'block',
                                      margin: '0 auto'
                                    }}
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = verificationImage.fallback;
                                    }}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* White Separator Section */}
                <table style={{
                  borderSpacing: '0',
                  borderCollapse: 'collapse',
                  tableLayout: 'fixed',
                  margin: '0 auto',
                  width: '100%',
                  backgroundColor: '#FFFFFF'
                }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: 0 }}>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                          <table style={{
                            borderSpacing: '0',
                            borderCollapse: 'collapse',
                            tableLayout: 'fixed',
                            margin: '0 auto',
                            width: '500px',
                            backgroundColor: '#FFFFFF'
                          }}>
                            <tbody>
                              <tr>
                                <td style={{ fontSize: '10px', lineHeight: '10px', padding: '0 0 12px' }}>&nbsp;</td>
                              </tr>
                              <tr>
                                <td style={{
                                  fontSize: '16px',
                                  lineHeight: '25px',
                                  fontWeight: 400,
                                  padding: '20px 30px 42px',
                                  textAlign: 'left'
                                }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <img
                                      src={greenHeart.primary}
                                      alt="💚"
                                      style={{ verticalAlign: 'middle', width: '16px', height: '16px' }}
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = greenHeart.fallback;
                                      }}
                                    />
                                    <span>from Chime</span>
                                  </div>
                                  <div>
                                    Questions? We&apos;re here to <a href="#" style={{ color: '#333333', fontWeight: 700, textDecoration: 'underline' }}>help</a>.
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Pre-Footer Logo Section */}
                <table style={{
                  borderSpacing: '0',
                  borderCollapse: 'collapse',
                  tableLayout: 'fixed',
                  margin: '0 auto',
                  width: '100%',
                  backgroundColor: '#FFFFFF'
                }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: 0 }}>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                          <table style={{
                            borderSpacing: '0',
                            borderCollapse: 'collapse',
                            tableLayout: 'fixed',
                            margin: '0 auto',
                            width: '500px',
                            backgroundColor: '#052316'
                          }}>
                            <tbody>
                              <tr>
                                <td style={{ padding: '0 30px 22px' }}>&nbsp;</td>
                              </tr>
                              <tr>
                                <td style={{ padding: '0 30px 22px' }}>
                                  <a href="#" style={{ color: '#1ec677', textDecoration: 'none', fontSize: '32px', fontWeight: 700 }}>
                                    <img
                                      src={footerLogo.primary}
                                      alt="Chime"
                                      width="110"
                                      style={{ display: 'block', lineHeight: 0 }}
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = footerLogo.fallback;
                                      }}
                                    />
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" valign="top" style={{ padding: '0 30px 22px' }}>
                                  <table align="left" border={0} cellPadding={0} cellSpacing={0} role="presentation" width="180" style={{
                                    borderSpacing: '0',
                                    borderCollapse: 'collapse',
                                    tableLayout: 'fixed',
                                    margin: '0 auto'
                                  }}>
                                    <tbody>
                                      <tr>
                                        <td align="left" valign="top" width="30" style={{ padding: 0 }}>
                                          <a href="#" style={{ color: '#052316', fontWeight: 700, textDecoration: 'underline' }}>
                                            <img
                                              alt="Instagram"
                                              src={instagramIcon.primary}
                                              width="14"
                                              onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = instagramIcon.fallback;
                                              }}
                                            />
                                          </a>
                                        </td>
                                        <td align="left" valign="top" width="30" style={{ padding: 0 }}>
                                          <a href="#" style={{ color: '#052316', fontWeight: 700, textDecoration: 'underline' }}>
                                            <img
                                              alt="Twitter"
                                              src={twitterIcon.primary}
                                              width="14"
                                              onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = twitterIcon.fallback;
                                              }}
                                            />
                                          </a>
                                        </td>
                                        <td align="left" valign="top" width="30" style={{ padding: 0 }}>
                                          <a href="#" style={{ color: '#052316', fontWeight: 700, textDecoration: 'underline' }}>
                                            <img
                                              alt="TikTok"
                                              src={tiktokIcon.primary}
                                              width="14"
                                              onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = tiktokIcon.fallback;
                                              }}
                                            />
                                          </a>
                                        </td>
                                        <td align="left" valign="top" width="30" style={{ padding: 0 }}>
                                          <a href="#" style={{ color: '#052316', fontWeight: 700, textDecoration: 'underline' }}>
                                            <img
                                              alt="Facebook"
                                              src={facebookIcon.primary}
                                              width="14"
                                              onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = facebookIcon.fallback;
                                              }}
                                            />
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Footer Section */}
                {content.visibleBlocks.footer && (
                  <table
                    style={{
                  borderSpacing: '0',
                  borderCollapse: 'collapse',
                  tableLayout: 'fixed',
                  margin: '0 auto',
                  width: '500px',
                  backgroundColor: '#052316'
                    }}
                    onClick={() => onToggleBlock('footer')}
                  >
                  <tbody>
                    <tr>
                        <td style={{ padding: '30px', fontSize: '13px', lineHeight: '20px', color: 'white' }}>
                        <div style={{ fontWeight: 'normal', textAlign: 'left' }}>
                          ©2024 Chime Financial, Inc. All rights reserved.<br />
                          PO Box 417, San Francisco, CA 94104<br /><br />

                          Please do not reply to this email. This mailbox is not monitored.<br /><br />

                          Chime is a financial technology company, not a bank. Banking services are provided by our partner banks.<br /><br />

                          This email was sent to you because you have a pending transaction with Chime.<br /><br />

                          If you wish to unsubscribe from Chime notifications, you can <a href="#" style={{ color: '#CCF2D2', textDecoration: 'underline', fontWeight: 'bold' }}>unsubscribe</a>.
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}