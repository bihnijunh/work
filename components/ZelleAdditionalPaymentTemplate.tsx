import React from 'react';
import Image from 'next/image';
import { ZelleAdditionalPaymentContent } from "@/types/email";

interface ZelleAdditionalPaymentTemplateProps {
  content: ZelleAdditionalPaymentContent;
}

export function ZelleAdditionalPaymentTemplate({
  content
}: ZelleAdditionalPaymentTemplateProps) {
  return (
    <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Header with Zelle Logo */}
      <div className="bg-[#6D1ED4] p-5 text-center">
        <Image
          src="https://i.ibb.co/dsVRwbDH/quizlet.png"
          alt="Zelle"
          width={200}
          height={32}
          className="h-8 mx-auto"
        />
      </div>

      {/* Main Content */}
      <div className="p-6 bg-white dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-gray-800 dark:text-gray-200 text-xl font-medium">
            {content.amountNotificationText || `You have successfully received an additional payment of $${content.recipientAmount}`}
          </h2>

          <div className="bg-[#6D1ED4] text-white py-3 px-4 my-5 rounded">
            {content.statusText}
          </div>

          <div className="text-left text-gray-600 dark:text-gray-300">
            <div className="mb-4 whitespace-pre-wrap">
              {content.message}
            </div>

            {content.instructionsBlock && (
              <div className="mb-4 whitespace-pre-wrap">
                <strong>{content.instructionsTitle || 'FINAL STEPS & INSTRUCTIONS TO FOLLOW'}:</strong><br />
                {content.instructionsBlock}
              </div>
            )}

            {content.importantNotesBlock && (
              <div className="mb-4 whitespace-pre-wrap">
                <strong>Important Notes:</strong><br />
                {content.importantNotesBlock}
              </div>
            )}

            {content.finalInstructionsBlock && (
              <div className="mb-4 whitespace-pre-wrap">
                <strong>Final Instructions:</strong><br />
                {content.finalInstructionsBlock}
              </div>
            )}

            <p className="text-purple-600 dark:text-purple-400 font-medium">
              {content.supportText}{' '}
              <a
                href={`tel:${content.supportNumber.replace(/\D/g, '')}`}
                className="text-purple-600 dark:text-purple-400"
              >
                {content.supportNumber}
              </a>
            </p>
          </div>

          {/* Footer Text */}
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 space-y-3">
            <p>
              <a href="https://www.zellepay.com/privacy-policy" className="text-purple-600 dark:text-purple-400 hover:underline">
                Do Not Sell or Share My Personal Information*
              </a>
            </p>
            <p className="text-xs">
              *We don&apos;t sell data. However, we do share data for cross context behavioral advertising.
              You can opt out by clicking the link above.
            </p>
            <p className="text-xs mt-4">
              ©2025 Early Warning Services, LLC. All rights reserved. Zelle and the Zelle marks used herein are trademarks
              of Early Warning Services, LLC. Other product and company names mentioned herein are the property of their
              respective owners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}