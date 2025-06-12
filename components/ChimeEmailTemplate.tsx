import { ChimeEmailContent } from '@/types/email';
import Image from 'next/image';
import { generateOptimizedTelLink, formatPhoneForDisplay } from '@/lib/utils/phone-formatting';

interface ChimeEmailTemplateProps {
  content: ChimeEmailContent;
  onToggleBlock: (blockName: keyof ChimeEmailContent['visibleBlocks']) => void;
}

export function ChimeEmailTemplate({ content, onToggleBlock }: ChimeEmailTemplateProps) {
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
                            src="https://braze-images.com/appboy/communication/assets/image_assets/images/65cb26e0d78955004bdec58e/original.png"
                            alt="Chime"
                            width={375}
                            height={100}
                            style={{
                              width: '100%',
                              maxWidth: '375px',
                              height: 'auto'
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
                                    src="https://ci3.googleusercontent.com/meips/ADKq_NbAQ8JSi49vhhq1n8OScC1B00N0iSKLbt2Szkz6_-MMP22ktjtP8IbxmBLsTDIlR_MKXGE9TFPYGe2Eke1kvhjSN6rrJY4_yiM40i0lhF1zupiw47dri3zL3wJ5gvV7Ku41x5CROb-EK3g1-w9FYZY03HzOQgKpsCmOEbaIPdxjGi3vFKsPWIZsbXAPZ2Uo=s0-d-e1-ft#https://braze-images.com/appboy/communication/assets/image_assets/images/66a75347189c73005c5ef712/original.png?1722241863"
                                    alt="Chime Verification"
                                    style={{
                                      width: '100%',
                                      maxWidth: '440px',
                                      display: 'block',
                                      margin: '0 auto'
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
                                    <img src="https://fonts.gstatic.com/s/e/notoemoji/16.0/1f49a/32.png" alt="💚" style={{ verticalAlign: 'middle', width: '16px', height: '16px' }} />
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
                                      src="https://ci3.googleusercontent.com/meips/ADKq_NYX3j8L4ZBBgeruVzUH5ksfkxYAQCVcxEjMxNqhPV6Ea4-EkazJr4_-dEfTdW1r9U_raBoW6ok11XPdx-pSikP6G1T51f7-FRzjmOjsOnC1c5p88l43oOxoATEitzXh3nbqI7iQpgV1GvWdTKjDBZqb_omI8lJSZbXFuXpJ1dsGziCuevpt81TTAPb2afMh=s0-d-e1-ft#https://braze-images.com/appboy/communication/assets/image_assets/images/65cb1e7c22a85f0055b6cf60/original.png?1707810428"
                                      alt="Chime"
                                      width="110"
                                      style={{ display: 'block', lineHeight: 0 }}
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
                                            <img alt="Instagram" src="https://ci3.googleusercontent.com/meips/ADKq_NYM3vDdlqOicy6UW4Uq3QYjKZvw0Ekhr8OQUI7yXMk4PXZMTR7AOdZ8ZKCKj60toD35L83Xi2ZJsHgEfWxEDwiW2naXcL5bdYmigYUyCxCYsoFHBZu2NDIE4Zwt54YDnnZILfN9NXTz1XRfcxH2zZmPEVJcuLTSwilfrQMpaMnh3NbOsfi7ASn09OqzusEA=s0-d-e1-ft#https://braze-images.com/appboy/communication/assets/image_assets/images/65cb1e7cc06cc2004c638d78/original.png?1707810428" width="14" />
                                          </a>
                                        </td>
                                        <td align="left" valign="top" width="30" style={{ padding: 0 }}>
                                          <a href="#" style={{ color: '#052316', fontWeight: 700, textDecoration: 'underline' }}>
                                            <img alt="Twitter" src="https://ci3.googleusercontent.com/meips/ADKq_NaL4guiRAdmkN_DNXJqPfesPZSxroyigRWQeVMQi5xAFDAsr1caC0oiJDCKH0-53kqzgDpPjplkpzq1ESw7ji7b53F9BjhGuIPgxJsn9_sUbmbh4kCBrQbW5OuAB7O5a2BmMl_AbHyE5BnAz3JUhWFeGQrvYZsSS4OF5xgrQzECKMczvXujab9NJphX59Qo=s0-d-e1-ft#https://braze-images.com/appboy/communication/assets/image_assets/images/65cb1e7ca660b4004ccd2634/original.png?1707810428" width="14" />
                                          </a>
                                        </td>
                                        <td align="left" valign="top" width="30" style={{ padding: 0 }}>
                                          <a href="#" style={{ color: '#052316', fontWeight: 700, textDecoration: 'underline' }}>
                                            <img alt="TikTok" src="https://ci3.googleusercontent.com/meips/ADKq_NZWQZI0jfNiK0ZwfJcWnv_z0L2xs4LVeaZ1IkiT7ImyqRpXC5Szr17Q7F3jxkXELKYucZbc2fYYy6s7phBRWxQiYNMtEouC9QkIwt3wwAIfeT6Pp5dP-CqB_oWNpYthr9YCANoC0f5Qkl5gGRaS8sjGsf-j62wmziIkDdLDuJvQ6nkGFN3fy1piTA1oRFxZ=s0-d-e1-ft#https://braze-images.com/appboy/communication/assets/image_assets/images/65cb1e7cabaa99004cf4ae37/original.png?1707810428" width="14" />
                                          </a>
                                        </td>
                                        <td align="left" valign="top" width="30" style={{ padding: 0 }}>
                                          <a href="#" style={{ color: '#052316', fontWeight: 700, textDecoration: 'underline' }}>
                                            <img alt="Facebook" src="https://ci3.googleusercontent.com/meips/ADKq_NYPip5bFeQ5iVAAEqgnh2EWVP7qFXqOcN_B4DSulJco571Tz-Y-9yNFjw53C3FBqV5GjRa6j0m74iqXeallftg8HHwiqlswprFEnhF99MnT5trBRiH3L29m5VeP-3Pxt0325VU3kmkUaWvEv3hT47kO6dE2h5CxnARW_oZygRqbxE8mrnlCtkKKFrZY5Xyr=s0-d-e1-ft#https://braze-images.com/appboy/communication/assets/image_assets/images/65cb1e7ce203eb004cfaecf2/original.png?1707810428" width="14" />
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