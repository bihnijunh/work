import React from 'react';
import { CashAppPaymentEmailContent } from '@/types/email';
import { IMAGE_URLS, getCashAppLogo, getCashAppSocialIcon } from '@/lib/config/images';
import { generateOptimizedTelLink, formatPhoneForDisplay } from '@/lib/utils/phone-formatting';

interface CashAppEmailTemplateProps {
  content: CashAppPaymentEmailContent;
}

export function CashAppEmailTemplate({ content }: CashAppEmailTemplateProps) {
  const {
    senderName = "María Elena Rodriguez",
    senderHandle = "$cheny1954",
    amount = "10.00",
    paymentDescription = "miscellaneous",
    supportPhone = "1 (336) 310-9279",
    supportHours = "9 AM to 7 PM ET",
    senderProfileImage,
    visibleBlocks = {
      header: true,
      senderInfo: true,
      amount: true,
      supportInfo: true,
      socialLinks: true,
      footer: true
    }
  } = content;

  // Use GitHub-hosted image as primary, with CDN as fallback
  const githubProfileImage = IMAGE_URLS.profiles.mariaElena;
  const fallbackProfileImage = IMAGE_URLS.external.cashAppProfile;

  // For preview component, we can use either the hosted URL or base64, with fallback to GitHub hosted
  const profileImageSrc = senderProfileImage || githubProfileImage;

  // Get Cash App logo and social icons with fallback support
  const cashAppLogo = getCashAppLogo();
  const twitterIcon = getCashAppSocialIcon('twitter');
  const instagramIcon = getCashAppSocialIcon('instagram');
  const twitchIcon = getCashAppSocialIcon('twitch');
  const tiktokIcon = getCashAppSocialIcon('tiktok');

  return (
    <div className="bg-gray-100 p-4 rounded-lg max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
        {visibleBlocks.header && (
          <div className="p-8 pb-4">
            <img
              src={cashAppLogo.primary}
              alt="Cash App Logo"
              className="h-12 w-30"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = cashAppLogo.fallback;
              }}
            />
          </div>
        )}

        <div className="px-8 pb-8">
          {visibleBlocks.senderInfo && (
            <div className="mb-8">
              <img
                src={profileImageSrc}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover mb-4"
              />
              <h2 className="text-3xl font-medium text-gray-900 mb-1">
                {senderName}
              </h2>
              <p className="text-gray-600">
                Payment from {senderHandle}
              </p>
            </div>
          )}

          {visibleBlocks.amount && (
            <div className="mb-8">
              <div className="text-5xl font-medium text-gray-900">
                ${amount}
              </div>
            </div>
          )}

          {visibleBlocks.supportInfo && (
            <div className="border-t border-gray-200 pt-6 mb-8">
              <p className="text-sm text-gray-600 mb-4">
                For any issues, including the recipient not receiving funds, please contact us at{' '}
                <a href="#" className="text-gray-900 underline">support</a> or you can reach Cash App Support by calling{' '}
                <a href={generateOptimizedTelLink(supportPhone || '')} className="text-gray-900 underline">
                  {formatPhoneForDisplay(supportPhone || '')}
                </a>. We're here to help every day from {supportHours}.
              </p>
              <div className="text-sm">
                <a href="#" className="text-gray-900 underline">Privacy Policy</a> |{' '}
                <a href="#" className="text-gray-900 underline">Terms of Service</a>
              </div>
            </div>
          )}

          {visibleBlocks.socialLinks && (
            <div className="flex justify-between items-center mb-8">
              <img
                src={cashAppLogo.primary}
                alt="Cash App Logo"
                className="h-12 w-30"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = cashAppLogo.fallback;
                }}
              />
              <div className="flex space-x-8">
                <a href="https://twitter.com/CashApp" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Twitter</span>
                  <img
                    src={twitterIcon.primary}
                    alt="Twitter"
                    className="w-4 h-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = twitterIcon.fallback;
                    }}
                  />
                </a>
                <a href="https://www.instagram.com/cashapp" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Instagram</span>
                  <img
                    src={instagramIcon.primary}
                    alt="Instagram"
                    className="w-4 h-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = instagramIcon.fallback;
                    }}
                  />
                </a>
                <a href="https://www.twitch.tv/cashapp" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Twitch</span>
                  <img
                    src={twitchIcon.primary}
                    alt="Twitch"
                    className="w-4 h-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = twitchIcon.fallback;
                    }}
                  />
                </a>
                <a href="https://www.tiktok.com/@cashapp" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">TikTok</span>
                  <img
                    src={tiktokIcon.primary}
                    alt="TikTok"
                    className="w-4 h-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = tiktokIcon.fallback;
                    }}
                  />
                </a>
              </div>
            </div>
          )}

          {visibleBlocks.footer && (
            <div className="text-sm text-gray-600">
              <p>
                Cash App is a service of Block, Inc., 1955 Broadway Street, Suite 600, Oakland, CA 94612.{' '}
                Review <a href="#" className="text-gray-900 underline">licenses</a>.
              </p>
              <p className="mt-3">
                Cash App is a financial services platform, not a bank. Banking services are provided by
                Cash App's bank partner(s). Prepaid debit cards issued by Sutton Bank. Money transmission
                and bitcoin services by Block, Inc. Tax preparation services by Cash App Taxes, Inc.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}