export const chimeTemplate = (content: string) => `
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
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
      }
      .container { 
        width: 100%;
        background-color: #FFFFFF;
      }
      .content-table {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-spacing: 0;
        border-collapse: collapse;
      }
      .header-logo {
        width: 100%;
        max-width: 375px;
        display: block;
        margin: 0 auto;
      }
      .main-content {
        font-size: 18px;
        line-height: 26px;
        color: #052316;
      }
      .verify-button {
        display: inline-block;
        background-color: #1EC677;
        color: #052316;
        text-decoration: none;
        padding: 15px 30px;
        border-radius: 8px;
        font-weight: bold;
      }
      .footer {
        background-color: #052316;
        color: #ffffff;
        font-size: 13px;
        line-height: 20px;
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