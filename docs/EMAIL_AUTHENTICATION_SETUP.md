# Email Authentication Setup Guide

## Overview
This guide will help you set up email authentication to get verification checkmarks in Gmail and improve deliverability.

## Step 1: Resend Domain Configuration

1. **Login to Resend Dashboard**
   - Go to https://resend.com/domains
   - Click "Add Domain"
   - Enter your domain: `customersupportagent.support`

2. **Add DNS Records**
   Resend will provide you with DNS records to add to your domain:

   ```dns
   # SPF Record (TXT)
   Name: @
   Value: v=spf1 include:resend.com ~all

   # DKIM Record (TXT) 
   Name: resend._domainkey
   Value: [Provided by Resend]

   # DMARC Record (TXT)
   Name: _dmarc
   Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@customersupportagent.support
   ```

3. **Verify Domain**
   - Wait for DNS propagation (up to 24 hours)
   - Click "Verify" in Resend dashboard

## Step 2: Update Environment Variables

Add to your `.env.local`:

```env
# Resend Configuration
RESEND_API_KEY=your_resend_api_key
RESEND_DOMAIN=customersupportagent.support
```

## Step 3: Benefits After Setup

✅ **Green Checkmark in Gmail**
✅ **Better Deliverability** 
✅ **Reduced Spam Filtering**
✅ **Professional Appearance**

## Step 4: Optional - BIMI Setup (Advanced)

For logo display in email clients:

1. **Get Verified Mark Certificate (VMC)**
   - Cost: ~$1,500-$3,000/year
   - Providers: DigiCert, Entrust

2. **Add BIMI DNS Record**
   ```dns
   Name: default._bimi
   Value: v=BIMI1; l=https://customersupportagent.support/logo.svg; a=https://customersupportagent.support/vmc.pem
   ```

## Testing

Use these tools to verify setup:
- https://mxtoolbox.com/spf.aspx
- https://dmarcian.com/dmarc-inspector/
- Send test emails to Gmail/Outlook

## Cost Summary

- **Basic Authentication (SPF/DKIM/DMARC)**: Free
- **BIMI with VMC**: $1,500-$3,000/year
- **Resend**: Pay-as-you-go pricing
