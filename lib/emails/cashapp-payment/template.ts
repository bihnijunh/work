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
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      .container {
        width: 100%;
        background-color: #f0f0f0;
        min-height: 100vh;
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
        background-color: #ffffff;
        border-spacing: 0;
        border-collapse: collapse;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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

      /* Prevent text overflow and ensure proper wrapping */
      table, td {
        word-wrap: break-word;
        word-break: break-word;
      }

      /* Ensure images are responsive */
      img {
        max-width: 100%;
        height: auto;
        display: block;
      }
      
      /* Responsive styles */
      @media only screen and (max-width: 600px) {
        .content-table {
          width: 100% !important;
          margin: 0 !important;
        }
        .main-content-table {
          width: 100% !important;
          border-radius: 0 !important;
        }
        .sender-name {
          font-size: 24px !important;
          line-height: 28px !important;
        }
        .amount {
          font-size: 36px !important;
          line-height: 40px !important;
        }
        .support-text {
          padding: 12px 0px 8px !important;
          font-size: 13px !important;
          line-height: 18px !important;
        }
        .footer-text {
          font-size: 12px !important;
          line-height: 16px !important;
        }
        /* Reduce padding on mobile */
        td[style*="padding: 42px 32px"] {
          padding: 20px 16px !important;
        }
        td[style*="padding: 0px 32px"] {
          padding: 0px 16px !important;
        }
        td[style*="padding: 32px"] {
          padding: 16px !important;
        }
        /* Fix social links layout on mobile */
        .social-icon {
          height: auto !important;
          width: auto !important;
          max-height: 16px !important;
          max-width: 16px !important;
        }
        /* Ensure text doesn't overflow */
        .payment-from {
          font-size: 14px !important;
          line-height: 20px !important;
          word-wrap: break-word !important;
        }
      }

      /* Extra small screens (iPhone SE, etc.) */
      @media only screen and (max-width: 375px) {
        .sender-name {
          font-size: 20px !important;
          line-height: 24px !important;
        }
        .amount {
          font-size: 32px !important;
          line-height: 36px !important;
        }
        .support-text {
          font-size: 12px !important;
          line-height: 16px !important;
        }
        /* Further reduce padding on very small screens */
        td[style*="padding: 20px 16px"] {
          padding: 12px 8px !important;
        }
        td[style*="padding: 0px 16px"] {
          padding: 0px 8px !important;
        }
        td[style*="padding: 16px"] {
          padding: 8px !important;
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
