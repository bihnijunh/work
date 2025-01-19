import React from 'react';
import { ZelleAdditionalPaymentContent } from "@/types/email";
import Image from 'next/image';

interface ZelleAdditionalPaymentTemplateProps {
  content: ZelleAdditionalPaymentContent;
  onToggleBlock: (blockName: keyof ZelleAdditionalPaymentContent['visibleBlocks']) => void;
  onUpdateContent: (updates: Partial<ZelleAdditionalPaymentContent>) => void;
}

export function ZelleAdditionalPaymentTemplate({ content, onToggleBlock, onUpdateContent }: ZelleAdditionalPaymentTemplateProps) {
  return (
    <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Header with Zelle Logo */}
      {content.visibleBlocks.header && (
        <div className="bg-[#6D1ED4] p-5 text-center">
          <Image 
            src="https://www.zellepay.com/sites/default/files/Zelle-logo-tagline-horizontal-white-v2_1_0.png"
            alt="Zelle" 
            width={200}
            height={32}
            className="h-8 mx-auto"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="p-6 bg-white dark:bg-gray-800">
        <div className="text-center">
          {/* Amount Notification */}
          {content.visibleBlocks.amountNotification && (
            <h2 className="text-gray-800 dark:text-gray-200 text-xl font-medium mb-4">
              {content.amountNotificationText || `You have successfully received an additional payment of $${content.recipientAmount}`}
            </h2>
          )}
          
          {/* Status */}
          {content.visibleBlocks.status && (
            <div className="bg-[#6D1ED4] text-white py-3 px-4 my-5 rounded">
              {content.statusText}
            </div>
          )}

          {/* Instructions */}
          {content.visibleBlocks.instructions && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
              <div className="text-left">
                <span 
                  style={{
                    lineHeight: 'normal',
                    fontFamily: 'Averta,Avenir,Helvetica,Arial,sans-serif',
                    fontSize: '1.5rem',
                    color: '#6D1ED4',
                    display: 'block',
                    marginBottom: '1rem',
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                >
                  {content.instructionsTitle || 'FINAL STEPS & INSTRUCTIONS TO FOLLOW'}
                </span>
                <div 
                  className="whitespace-pre-wrap text-gray-700 dark:text-gray-300"
                  style={{ fontSize: '1rem', lineHeight: '1.5' }}
                >
                  {content.instructionsBlock}
                </div>
              </div>
            </div>
          )}
          
          <div className="text-left text-gray-600 dark:text-gray-300">
            {/* Message */}
            {content.visibleBlocks.message && (
              <div className="mb-4 whitespace-pre-wrap">
                {content.message}
              </div>
            )}
            
            {/* Important Notes */}
            {content.visibleBlocks.importantNotes && (
              <div className="border-t pt-4 mt-4">
                <p className="text-[#6D1ED4] dark:text-purple-400 font-medium mb-4">
                  {content.importantNotesBlock}
                </p>
                <p className="text-[#6D1ED4] dark:text-purple-400 font-medium">
                  {content.finalInstructionsBlock || `Once the refund is complete, ${content.totalAmount} will reflect in your account immediately.`}
                </p>
              </div>
            )}

            {/* Final Instructions */}
            {content.visibleBlocks.finalInstructions && (
              <div className="border-t border-b py-4 my-4">
                <p className="font-bold">
                  {content.finalInstructionsBlock || `YOUR FUNDS HAS BEEN APPROVED & SECURED BUT YOU ARE REQUIRED TO CARRY ON AND FOLLOW THE GIVEN INSTRUCTION ABOVE FOR YOUR ACCOUNT TO BE FULLY CREDITED WITH THE TOTAL SUM OF ${content.totalAmount} IMMEDIATELY.`}
                </p>
              </div>
            )}
            
            {/* Support Information */}
            {content.visibleBlocks.support && (
              <p className="text-primary font-medium mt-5">
                {content.supportText}{' '}
                <a 
                  href={`tel:${content.supportNumber.replace(/\D/g, '')}`}
                  className="text-primary hover:underline"
                >
                  {content.supportNumber}
                </a>
              </p>
            )}
          </div>

          {/* Footer Text */}
          {content.visibleBlocks.footer && (
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 space-y-3">
              <p>
                <a href="https://www.zellepay.com/privacy-policy" className="text-purple-600 dark:text-purple-400 hover:underline">
                  Do Not Sell or Share My Personal Information*
                </a>
              </p>
              <p className="text-xs">
                *We don't sell data. However, we do share data for cross context behavioral advertising. 
                You can opt out by clicking the link above.
              </p>
              <p className="text-xs mt-4">
                2025 Early Warning Services, LLC. All rights reserved. Zelle and the Zelle marks used herein are trademarks 
                of Early Warning Services, LLC. Other product and company names mentioned herein are the property of their 
                respective owners.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 