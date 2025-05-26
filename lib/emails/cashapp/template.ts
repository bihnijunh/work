export const cashAppTemplate = (content: string) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chime Support</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
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
        background-color: #1EC677;
        padding: 20px;
        text-align: center;
      }
      .logo {
        height: 40px;
        width: auto;
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
      .privacy-link {
        color: #1EC677;
        text-decoration: none;
      }
      .privacy-link:hover {
        text-decoration: underline;
      }
      .status-badge {
        background-color: #1EC677;
        color: white;
        padding: 8px 16px;
        border-radius: 16px;
        display: inline-block;
        margin: 16px 0;
      }
      .cashtag {
        color: #1EC677;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://braze-images.com/appboy/communication/assets/image_assets/images/65cb26e0d78955004bdec58e/original.png" alt="Chime" class="logo">
      </div>

      ${content}

      <div class="footer-text">
        <p>
          <a href="https://www.chime.com/policies/" class="privacy-link">
            Privacy Policy
          </a>
        </p>
        <p class="disclaimer">
          Chime is a financial technology company, not a bank. Banking services are provided by Chime's bank partner(s).
        </p>
      </div>
    </div>
  </body>
  </html>
`;