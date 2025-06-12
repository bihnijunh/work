export const cashAppPaymentTemplate = (content: string) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cash App Payment Notification</title>
    <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <![endif]-->
    <style>
      body { 
        font-family: "Cash Sans", "Helvetica Neue", Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background-color: #f0f0f0;
      }
      .container { 
        width: 100%;
        background-color: #f0f0f0;
      }
      .content-table {
        width: 100%;
        max-width: 640px;
        margin: 0 auto;
        background-color: #f0f0f0;
        border-spacing: 0;
        border-collapse: collapse;
      }
      .main-content-table {
        width: 100%;
        border-radius: 16px;
        overflow: hidden;
        table-layout: fixed;
        background-color: #ffffff;
        border-spacing: 0;
        border-collapse: collapse;
      }
      .cash-app-logo {
        display: block;
        height: 48px;
        width: 120px;
      }
      .profile-image {
        border-radius: 50%;
        display: block;
        height: 64px;
        width: 64px;
      }
      .sender-name {
        font-size: 32px;
        font-weight: 500;
        line-height: 36px;
        text-align: left;
        padding-top: 16px;
        color: #1e1e1e;
      }
      .payment-from {
        display: block;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0.005em;
        text-align: left;
        padding-top: 4px;
        color: #666666;
      }
      .amount {
        font-weight: 500;
        line-height: 52px;
        text-align: left;
        font-size: 48px;
        color: #1e1e1e;
      }
      .support-text {
        margin: 0px;
        padding: 16px 0px 10px;
        line-height: 20px;
        font-size: 14px;
        color: #666666;
      }
      .support-link {
        text-decoration: none;
        color: #101010;
      }
      .footer-links {
        font-size: 14px;
        line-height: 20px;
        display: block;
      }
      .footer-links a {
        text-decoration: none;
        color: #101010;
      }
      .social-icon {
        display: block;
      }
      .footer-text {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0.01em;
        text-align: left;
        display: block;
        margin: 0px;
        color: #666666;
      }
      .footer-text a {
        text-decoration: none;
        color: #101010;
      }
      
      /* Responsive styles */
      @media only screen and (max-width: 600px) {
        .content-table {
          width: 100% !important;
        }
        .main-content-table {
          width: 100% !important;
        }
        .sender-name {
          font-size: 28px !important;
          line-height: 32px !important;
        }
        .amount {
          font-size: 40px !important;
          line-height: 44px !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      ${content}
    </div>
  </body>
  </html>
`;
