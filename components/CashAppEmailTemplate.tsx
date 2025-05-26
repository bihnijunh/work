import { CashAppEmailContent } from '@/types/email';

interface ChimeEmailTemplateProps {
  content: CashAppEmailContent;
}

export function ChimeEmailTemplate({ content }: ChimeEmailTemplateProps) {
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
      <div style={{
        display: 'none',
        fontSize: '1px',
        color: '#ffffff',
        lineHeight: '1px',
        maxHeight: '0px',
        maxWidth: '0px',
        opacity: 0,
        overflow: 'hidden'
      }}>
        Finish enrolling and start getting paid earlier.
      </div>

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
                      <td style={{ padding: 0 }}>
                        <a href="https://www.chime.com" target="_blank" rel="noopener noreferrer">
                          <img
                            src="https://braze-images.com/appboy/communication/assets/image_assets/images/65cb26e0d78955004bdec58e/original.png"
                            alt="Chime"
                            style={{
                              width: '100%',
                              maxWidth: '375px',
                              display: 'block'
                            }}
                          />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>

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
                    <tr>
                      <td style={{ fontSize: '40px', lineHeight: '48px', fontWeight: 700, padding: '0 30px 22px' }}>
                        {content.emailTitle}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: '18px', lineHeight: '26px', fontWeight: 400, padding: '0 30px 22px' }}>
                        {content.message}
                      </td>
                    </tr>
                    <tr>
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
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Footer Section */}
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
                      <td style={{ padding: '30px', fontSize: '13px', lineHeight: '20px', color: 'white' }}>
                        <div style={{ fontWeight: 'normal' }}>
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
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}