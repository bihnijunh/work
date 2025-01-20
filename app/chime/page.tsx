"use client";

import { useState } from "react";
import { ChimeEmailTemplate } from "@/components/ChimeEmailTemplate";
import { CashAppEmailContent } from "@/types/email";
import { sendEmail } from "../actions";

const defaultVisibleBlocks = {
  header: true,
  preview: true,
  title: true,
  message: true,
  verifyButton: true,
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

export default function ChimePage() {
  const [emailContent, setEmailContent] = useState<CashAppEmailContent>({
    emailTitle: "You have a pending funds of $16.00",
    message: `Unfortunately, we encountered a little problem while crediting your account with $16.00 USD today because this amount seems to be below your credit limit.

Why do I need to expand my account?
We place initial limits on all accounts to increase the security precaution and help prevent any fraudulent activities.Take these urgent steps to expand your limits and receive unlimited money.

How do I expand my account - Action needed.

Contact the last buyer to send an additional payment of $300.00USD for your account to be fully expanded. Soon as this is done we will credit the total sum of $316.00USD with a free compensation fee of $10.00USD for the inconvenience caused.`,
    supportText: "For Assistance, contact the support number below;",
    supportNumber: "+1(681) 523-4360",
    toEmail: "",
    fromEmail: "no-replychime@milanosailexpress.com",
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
    setEmailContent((prev: CashAppEmailContent) => ({
      ...prev,
      visibleBlocks: {
        ...prev.visibleBlocks,
        [blockName]: !prev.visibleBlocks[blockName]
      }
    }));
  };

  const handleRestoreBlocks = () => {
    setEmailContent((prev: CashAppEmailContent) => ({
      ...prev,
      visibleBlocks: { ...defaultVisibleBlocks }
    }));
  };

  const handleUpdateContent = (updates: Partial<CashAppEmailContent>) => {
    setEmailContent((prev: CashAppEmailContent) => ({
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
                  className="text-sm px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Restore {hiddenBlocksCount} Hidden Block{hiddenBlocksCount !== 1 ? 's' : ''}
                </button>
              )}
            </div>
            <ChimeEmailTemplate 
              content={emailContent} 
              onToggleBlock={handleToggleBlock}
            />
          </div>

          {/* Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Email Configuration
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Title Configuration */}
                <BlockConfig
                  title="Email Title"
                  visible={true}
                  onToggle={() => {}}
                >
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Custom Email Title
                    </label>
                    <input
                      type="text"
                      value={emailContent.emailTitle}
                      onChange={(e) => handleUpdateContent({ emailTitle: e.target.value })}
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder="Enter custom email title"
                      required
                    />
                  </div>
                </BlockConfig>

                {/* Email Configuration */}
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

                {/* Message Content */}
                <BlockConfig
                  title="Message Content"
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
                      rows={8}
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                </BlockConfig>

                {/* Support Information */}
                <BlockConfig
                  title="Support Information"
                  visible={emailContent.visibleBlocks.support}
                  onToggle={() => handleToggleBlock('support')}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Support Text
                      </label>
                      <input
                        type="text"
                        value={emailContent.supportText}
                        onChange={(e) => handleUpdateContent({ supportText: e.target.value })}
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        required
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
                        required
                      />
                    </div>
                  </div>
                </BlockConfig>

                {/* Submit Button */}
                <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                    className={`px-4 py-2 rounded-md text-white font-medium ${
                      loading
                        ? 'bg-gray-400'
                        : 'bg-green-600 hover:bg-green-700'
                    } transition-colors`}
                  >
                    {loading ? 'Sending...' : 'Send Email'}
                </button>
                </div>

                {/* Status Message */}
                {status === "success" && (
                  <div className="text-green-600 text-center">
                    Email sent successfully!
                  </div>
                )}
                {status === "error" && (
                  <div className="text-red-600 text-center">
                    Failed to send email. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 