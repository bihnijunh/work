import React from 'react';
import { PaypalEmailContent } from "@/types/email";

interface PaypalEmailTemplateProps {
  content: PaypalEmailContent;
}

export function PaypalEmailTemplate({ content }: PaypalEmailTemplateProps) {
  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#FAF8F5' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', padding: '16px' }}>
        <p style={{ color: '#687173', fontWeight: 500, fontSize: '14px', margin: 0 }}>
          Hello, {content.recipientName}
        </p>
      </div>

      {/* PayPal Logo */}
      <div style={{ padding: '16px' }}>
        <img 
          src="https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/paypal-rebranding/pp-logo-in-circle-2x.png"
          alt="PayPal"
          style={{ width: '63px', height: '63px' }}
        />
      </div>

      {/* Main Content */}
      <div style={{ padding: '0 32px 32px 32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 500, lineHeight: '38px', color: '#001c64', marginBottom: '24px' }}>
          {content.title}
        </h1>
        
        <div style={{ fontSize: '14px', color: '#2c2e2f' }}>
          <div style={{ backgroundColor: '#0070BA', color: 'white', padding: '16px', borderRadius: '8px', textAlign: 'center', fontSize: '18px', fontWeight: 500, marginBottom: '24px' }}>
            You have received ${content.amount} from {content.senderName}
          </div>
          
          <div style={{ backgroundColor: '#F5F7FA', padding: '16px', borderRadius: '8px', textAlign: 'center', fontWeight: 500, marginBottom: '24px' }}>
            {content.statusHeading}: {content.status}
          </div>

          <div style={{ marginBottom: '24px', whiteSpace: 'pre-wrap' }}>
            {content.message.split('\n').map((paragraph, index) => (
              <p key={index} style={{ marginBottom: '16px' }}>{paragraph}</p>
            ))}
          </div>
          
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
            <p style={{ color: '#0070BA', fontWeight: 500, margin: 0 }}>
              {content.supportText} {content.supportNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #e5e7eb' }}>
        <div style={{ padding: '16px' }}>
          <img 
            src="https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/paypal-rebranding/footer-logo-with-crop-2x.png"
            alt="PayPal"
            style={{ width: '283px', height: '100px' }}
          />
        </div>

        {/* Footer Links */}
        <div style={{ padding: '8px 32px', fontSize: '12px', fontWeight: 500 }}>
          <div style={{ display: 'flex', gap: '16px', color: '#0070e0' }}>
            <a href="#" style={{ color: '#0070e0', textDecoration: 'none' }}>Help & Contact</a>
            <span style={{ color: '#9ca3af' }}>|</span>
            <a href="#" style={{ color: '#0070e0', textDecoration: 'none' }}>Security</a>
            <span style={{ color: '#9ca3af' }}>|</span>
            <a href="#" style={{ color: '#0070e0', textDecoration: 'none' }}>Apps</a>
          </div>
        </div>

        {/* Footer Text */}
        <div style={{ padding: '16px 32px', fontSize: '12px', color: '#2c2e2f' }}>
          <p style={{ marginBottom: '16px' }}>
            PayPal is committed to preventing fraudulent emails. Emails from PayPal will always contain your full name. 
            <a href="#" style={{ color: '#0070e0', textDecoration: 'none', marginLeft: '4px' }}>
              Learn to identify phishing
            </a>
          </p>
          <p style={{ marginBottom: '16px' }}>
            Please don't reply to this email. To get in touch with us, click 
            <a href="#" style={{ color: '#0070e0', textDecoration: 'none', marginLeft: '4px' }}>
              Help & Contact
            </a>.
          </p>
          <p style={{ marginBottom: '16px' }}>
            Copyright © 1999-{new Date().getFullYear()} PayPal. All rights reserved.
          </p>
          <p style={{ margin: 0 }}>
            PayPal Pte. Ltd. is licensed by the Monetary Authority of Singapore as a Major Payment Institution under the Payment Services Act 2019.
          </p>
        </div>
      </div>
    </div>
  );
} 