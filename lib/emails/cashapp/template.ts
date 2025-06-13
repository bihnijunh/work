import { getCashAppLogo } from '@/lib/config/images';

export const cashAppTemplate = (content: string) => {
  const cashAppLogo = getCashAppLogo();

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cash App Support</title>`;
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
        background-color: #00D632;
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
        color: #00D632;
        text-decoration: none;
      }
      .privacy-link:hover {
        text-decoration: underline;
      }
      .status-badge {
        background-color: #00D632;
        color: white;
        padding: 8px 16px;
        border-radius: 16px;
        display: inline-block;
        margin: 16px 0;
      }
      .cashtag {
        color: #00D632;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="${cashAppLogo.primary}" alt="Cash App" class="logo" onerror="this.src='${cashAppLogo.fallback}'">
      </div>

      ${content}

      <div class="footer-text">
        <p>
          <a href="#" class="privacy-link">
            Privacy Policy
          </a>
        </p>
        <p class="disclaimer">
          Cash App is a service of Block, Inc., 1955 Broadway Street, Suite 600, Oakland, CA 94612. Review licenses.
        </p>
      </div>
    </div>
  </body>
  </html>
`;
};