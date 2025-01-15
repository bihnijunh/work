import { ZelleEmailContent } from "@/types/email";

interface ZelleEmailTemplateProps {
  content: ZelleEmailContent;
}

export function ZelleEmailTemplate({ content }: ZelleEmailTemplateProps) {
  return (
    <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Header with Zelle Logo */}
      <div className="bg-[#6D1ED4] p-5 text-center">
        <img 
          src="https://www.zellepay.com/sites/default/files/Zelle-logo-tagline-horizontal-white-v2_1_0.png"
          alt="Zelle" 
          className="h-8 mx-auto"
        />
      </div>

      {/* Main Content */}
      <div className="p-6 bg-white dark:bg-gray-800">
        <div className="text-center">
          <h2 className="text-gray-800 dark:text-gray-200 text-xl font-medium">
            You have received ${content.recipientAmount} from {content.senderName}
          </h2>
          
          <div className="bg-[#6D1ED4] text-white py-3 px-4 my-5 rounded">
            {content.statusText}
          </div>
          
          <div className="text-left text-gray-600 dark:text-gray-300">
            <div className="mb-4 whitespace-pre-wrap">
              {content.message}
            </div>
            
            <p className="text-purple-600 dark:text-purple-400 font-medium">
              {content.supportText} {content.supportNumber}
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
              *We don't sell data. However, we do share data for cross context behavioral advertising. 
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