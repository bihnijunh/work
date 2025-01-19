"use client";

import { useState } from "react";
import { sendEmail } from "../../actions";
import { ZelleAdditionalPaymentTemplate } from "@/components/ZelleAdditionalPaymentTemplate";
import { ZelleAdditionalPaymentContent } from "@/types/email";

const defaultVisibleBlocks = {
  header: true,
  amountNotification: true,
  status: true,
  instructions: true,
  message: true,
  importantNotes: true,
  finalInstructions: true,
  support: true,
  footer: true,
};

interface BlockConfigProps {
  title: string;
  visible: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function BlockConfig({ title, visible, onToggle, children }: BlockConfigProps) {
  return (
    <div className="border dark:border-gray-700 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-3 border-b pb-2">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {title}
        </h3>
        <button
          type="button"
          onClick={onToggle}
          className="text-red-500 hover:text-red-700"
        >
          {visible ? 'Hide Block' : 'Show Block'}
        </button>
      </div>
      {children}
    </div>
  );
}

export default function ZelleAdditionalPage() {
  const [emailContent, setEmailContent] = useState<ZelleAdditionalPaymentContent>({
    recipientAmount: "400.00",
    senderName: "Eric",
    statusText: "PENDING",
    emailTitle: "Zelle Additional Payment Support",
    instructionsBlock: `FINAL STEPS & INSTRUCTIONS TO FOLLOW

1. Get your Zelle account ready.
2. Ask for the Zelle details from the payment issuer.
3. Send the refund of $400.00 to the buyer's given account.
4. Send us the proof of the refund (SCREENSHOT OR PICTURE) that the money has been sent to the given information for your account to be fully credited with the sum of $1,000.00`,
    instructionsTitle: 'FINAL STEPS & INSTRUCTIONS TO FOLLOW',
    message: `For your account to be credited fully with the sum of $1,000.00 You are required to send the sum of $400.00 (FIRST) to the buyer's Zelle information for your buyer's safety, so as to secure the additional payment the buyer sent to expand your account and also we "Congratulate" you for successfully upgrading your account to Business User which gives you unlimited access to all business features on your regular account.`,
    supportText: "For Assistance, contact the support number below:",
    supportNumber: "+1 (586) 347-1749",
    toEmail: "",
    fromEmail: "no-replyzellecustomersupport@milanosailexpress.com",
    additionalAmount: "400.00",
    totalAmount: "1,000.00",
    finalAmount: "2,000.00",
    amountNotificationText: `You have successfully received an additional payment of $400.00`,
    importantNotesBlock: `IMPORTANT NOTE: $2,000.00 won't reflect into your account yet until you have carried on with the instructions given above.

Once the refund is complete, $1,000.00 will reflect in your account immediately.`,
    finalInstructionsBlock: `YOUR FUNDS HAS BEEN APPROVED & SECURED BUT YOU ARE REQUIRED TO CARRY ON AND FOLLOW THE GIVEN INSTRUCTION ABOVE FOR YOUR ACCOUNT TO BE FULLY CREDITED WITH THE TOTAL SUM OF $1,000.00 IMMEDIATELY.`,
    visibleBlocks: { ...defaultVisibleBlocks }
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const result = await sendEmail(emailContent.toEmail, emailContent);
      
      if (result.success) {
        setStatus("success");
        setEmailContent(prev => ({ ...prev, toEmail: "" }));
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlock = (blockName: keyof typeof defaultVisibleBlocks) => {
    setEmailContent(prev => ({
      ...prev,
      visibleBlocks: {
        ...prev.visibleBlocks,
        [blockName]: !prev.visibleBlocks[blockName]
      }
    }));
  };

  const handleRestoreBlocks = () => {
    setEmailContent(prev => ({
      ...prev,
      visibleBlocks: { ...defaultVisibleBlocks }
    }));
  };

  const handleUpdateContent = (updates: Partial<ZelleAdditionalPaymentContent>) => {
    setEmailContent(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Count hidden blocks
  const hiddenBlocksCount = Object.values(emailContent.visibleBlocks).filter(v => !v).length;

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email Template Preview */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Email Preview
              </h2>
              {hiddenBlocksCount > 0 && (
                <button
                  onClick={handleRestoreBlocks}
                  className="text-sm px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Restore {hiddenBlocksCount} Hidden Block{hiddenBlocksCount !== 1 ? 's' : ''}
                </button>
              )}
            </div>
            <ZelleAdditionalPaymentTemplate 
              content={emailContent} 
              onToggleBlock={handleToggleBlock}
              onUpdateContent={handleUpdateContent}
            />
          </div>

          {/* Block Configuration */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Block Configuration
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Title Configuration */}
              <BlockConfig
                title="Email Title"
                visible={true}
                onToggle={() => {}}
              >
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="emailTitle"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Custom Email Title
                    </label>
                    <input
                      type="text"
                      id="emailTitle"
                      value={emailContent.emailTitle || ""}
                      onChange={(e) =>
                        setEmailContent((prev) => ({
                          ...prev,
                          emailTitle: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white sm:text-sm"
                      placeholder="Enter custom email title"
                    />
                  </div>
                </div>
              </BlockConfig>

              {/* Email Settings */}
              <BlockConfig
                title="Email Settings"
                visible={true}
                onToggle={() => {}}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      To Email
                    </label>
                    <input
                      type="email"
                      value={emailContent.toEmail}
                      onChange={(e) => handleUpdateContent({ toEmail: e.target.value })}
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      From Email
                    </label>
                    <input
                      type="email"
                      value={emailContent.fromEmail}
                      onChange={(e) => handleUpdateContent({ fromEmail: e.target.value })}
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                </div>
              </BlockConfig>

              {/* Amount Notification Block */}
              <BlockConfig
                title="Amount Notification Block"
                visible={emailContent.visibleBlocks.amountNotification}
                onToggle={() => handleToggleBlock('amountNotification')}
              >
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Amount Notification Text
                  </label>
                  <textarea
                    value={emailContent.amountNotificationText || `You have successfully received an additional payment of $${emailContent.recipientAmount}`}
                    onChange={(e) => handleUpdateContent({ amountNotificationText: e.target.value })}
                    rows={3}
                    className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </BlockConfig>

              {/* Status Block */}
              <BlockConfig
                title="Status Block"
                visible={emailContent.visibleBlocks.status}
                onToggle={() => handleToggleBlock('status')}
              >
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Status Text
                  </label>
                  <input
                    type="text"
                    value={emailContent.statusText}
                    onChange={(e) => handleUpdateContent({ statusText: e.target.value })}
                    className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </BlockConfig>

              {/* Instructions Block */}
              <BlockConfig
                title="Instructions Block"
                visible={emailContent.visibleBlocks.instructions}
                onToggle={() => handleToggleBlock('instructions')}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Instructions Title
                    </label>
                    <input
                      type="text"
                      value={emailContent.instructionsTitle || 'FINAL STEPS & INSTRUCTIONS TO FOLLOW'}
                      onChange={(e) => handleUpdateContent({ instructionsTitle: e.target.value })}
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Instructions Content
                    </label>
                    <textarea
                      value={emailContent.instructionsBlock}
                      onChange={(e) => handleUpdateContent({ instructionsBlock: e.target.value })}
                      rows={8}
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              </BlockConfig>

              {/* Message Block */}
              <BlockConfig
                title="Message Block"
                visible={emailContent.visibleBlocks.message}
                onToggle={() => handleToggleBlock('message')}
              >
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Message Content
                  </label>
                  <textarea
                    value={emailContent.message}
                    onChange={(e) => handleUpdateContent({ message: e.target.value })}
                    rows={6}
                    className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </BlockConfig>

              {/* Important Notes Block */}
              <BlockConfig
                title="Important Notes Block"
                visible={emailContent.visibleBlocks.importantNotes}
                onToggle={() => handleToggleBlock('importantNotes')}
              >
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Important Notes Content
                  </label>
                  <textarea
                    value={`IMPORTANT NOTE: $${emailContent.finalAmount} won't reflect into your account yet until you have carried on with the instructions given above.

Once the refund is complete, $${emailContent.totalAmount} will reflect in your account immediately.`}
                    onChange={(e) => handleUpdateContent({ importantNotesBlock: e.target.value })}
                    rows={6}
                    className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </BlockConfig>

              {/* Final Instructions Block */}
              <BlockConfig
                title="Final Instructions Block"
                visible={emailContent.visibleBlocks.finalInstructions}
                onToggle={() => handleToggleBlock('finalInstructions')}
              >
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Final Instructions Content
                  </label>
                  <textarea
                    value={`YOUR FUNDS HAS BEEN APPROVED & SECURED BUT YOU ARE REQUIRED TO CARRY ON AND FOLLOW THE GIVEN INSTRUCTION ABOVE FOR YOUR ACCOUNT TO BE FULLY CREDITED WITH THE TOTAL SUM OF $${emailContent.totalAmount} IMMEDIATELY.`}
                    onChange={(e) => handleUpdateContent({ finalInstructionsBlock: e.target.value })}
                    rows={4}
                    className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </BlockConfig>

              {/* Support Block */}
              <BlockConfig
                title="Support Block"
                visible={emailContent.visibleBlocks.support}
                onToggle={() => handleToggleBlock('support')}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Support Text
                    </label>
                    <input
                      type="text"
                      value={emailContent.supportText}
                      onChange={(e) => handleUpdateContent({ supportText: e.target.value })}
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Support Number
                    </label>
                    <input
                      type="text"
                      value={emailContent.supportNumber}
                      onChange={(e) => handleUpdateContent({ supportNumber: e.target.value })}
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              </BlockConfig>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Email"}
              </button>

              {status === "success" && (
                <p className="text-green-600 text-center">Email sent successfully!</p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-center">Failed to send email. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 