"use client";

import { useState } from "react";
import { sendEmail } from "../../actions";
import { ZelleAdditionalPaymentTemplate } from "@/components/ZelleAdditionalPaymentTemplate";
import { SenderConfiguration } from "@/components/SenderConfiguration";
import { ZelleAdditionalPaymentContent } from "@/types/email";

export default function ZelleAdditionalPage() {
  const [emailContent, setEmailContent] = useState<ZelleAdditionalPaymentContent>({
    recipientAmount: "400.00",
    senderName: "Eric",
    statusText: "PENDING",
    emailTitle: "Zelle Additional Payment Support",
    instructionsBlock: `1. Get your Zelle account ready.
2. Ask for the Zelle details from the payment issuer.
3. Send the refund of $400.00 to the buyer's given account.
4. Send us the proof of the refund (SCREENSHOT OR PICTURE) that the money has been sent to the given information for your account to be fully credited with the sum of $1,000.00`,
    instructionsTitle: 'FINAL STEPS & INSTRUCTIONS TO FOLLOW',
    message: `For your account to be credited fully with the sum of $1,000.00 You are required to send the sum of $400.00 (FIRST) to the buyer's Zelle information for your buyer's safety, so as to secure the additional payment the buyer sent to expand your account and also we "Congratulate" you for successfully upgrading your account to Business User which gives you unlimited access to all business features on your regular account.`,
    supportText: "For Assistance, contact the support number below:",
    supportNumber: "+1 (336) 310-9279",
    toEmail: "",
    fromEmail: "zelle@customersupportagent.support",
    additionalAmount: "400.00",
    totalAmount: "1,000.00",
    finalAmount: "2,000.00",
    amountNotificationText: `You have successfully received an additional payment of $400.00`,
    importantNotesBlock: `IMPORTANT NOTE: $2,000.00 won't reflect into your account yet until you have carried on with the instructions given above.

Once the refund is complete, $1,000.00 will reflect in your account immediately.`,
    finalInstructionsBlock: `YOUR FUNDS HAS BEEN APPROVED & SECURED BUT YOU ARE REQUIRED TO CARRY ON AND FOLLOW THE GIVEN INSTRUCTION ABOVE FOR YOUR ACCOUNT TO BE FULLY CREDITED WITH THE TOTAL SUM OF $1,000.00 IMMEDIATELY.`
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

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email Template Preview */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Email Preview
            </h2>
            <ZelleAdditionalPaymentTemplate content={emailContent} />
          </div>

          {/* Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Email Configuration
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Configuration */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 border-b pb-2">
                    Email Configuration
                  </h3>

                  <div>
                    <label htmlFor="emailTitle" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Email Title
                    </label>
                    <input
                      type="text"
                      id="emailTitle"
                      value={emailContent.emailTitle || ""}
                      onChange={(e) => setEmailContent({ ...emailContent, emailTitle: e.target.value })}
                      placeholder="Zelle Additional Payment Support"
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="toEmail" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        To Email
                      </label>
                      <input
                        type="email"
                        id="toEmail"
                        value={emailContent.toEmail}
                        onChange={(e) => setEmailContent({ ...emailContent, toEmail: e.target.value })}
                        placeholder="recipient@example.com"
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="fromEmail" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        From Email (Legacy - Use Sender Configuration Below)
                      </label>
                      <input
                        type="email"
                        id="fromEmail"
                        value={emailContent.fromEmail}
                        onChange={(e) => setEmailContent({ ...emailContent, fromEmail: e.target.value })}
                        placeholder="customersupportzellemgt@customersupportagent.support"
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Sender Configuration */}
                <SenderConfiguration
                  service="zelle"
                  currentSender={emailContent.customSender}
                  onSenderChange={(sender) => setEmailContent({ ...emailContent, customSender: sender })}
                />

                {/* Content Configuration */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 border-b pb-2">
                    Content Configuration
                  </h3>

                  {/* Amount Notification Section */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Amount Notification</h4>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="amountNotificationText" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                          Amount Notification Text (Main Heading)
                        </label>
                        <input
                          type="text"
                          id="amountNotificationText"
                          value={emailContent.amountNotificationText || `You have successfully received an additional payment of $${emailContent.recipientAmount}`}
                          onChange={(e) => setEmailContent({ ...emailContent, amountNotificationText: e.target.value })}
                          placeholder={`You have successfully received an additional payment of $${emailContent.recipientAmount}`}
                          className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="recipientAmount" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Recipient Amount ($)
                          </label>
                          <input
                            type="text"
                            id="recipientAmount"
                            value={emailContent.recipientAmount}
                            onChange={(e) => setEmailContent({ ...emailContent, recipientAmount: e.target.value })}
                            placeholder="400.00"
                            className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <label htmlFor="senderName" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Sender Name
                          </label>
                          <input
                            type="text"
                            id="senderName"
                            value={emailContent.senderName}
                            onChange={(e) => setEmailContent({ ...emailContent, senderName: e.target.value })}
                            placeholder="Eric"
                            className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Section */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Status</h4>
                    <div>
                      <label htmlFor="statusText" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Status Text (Purple Box)
                      </label>
                      <input
                        type="text"
                        id="statusText"
                        value={emailContent.statusText}
                        onChange={(e) => setEmailContent({ ...emailContent, statusText: e.target.value })}
                        placeholder="PENDING"
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  {/* Main Message */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Main Message</h4>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Main Message Content
                      </label>
                      <textarea
                        id="message"
                        value={emailContent.message}
                        onChange={(e) => setEmailContent({ ...emailContent, message: e.target.value })}
                        rows={4}
                        placeholder="For your account to be credited fully with the sum of $1,000.00..."
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  {/* Instructions Section */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Instructions</h4>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="instructionsTitle" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                          Instructions Title
                        </label>
                        <input
                          type="text"
                          id="instructionsTitle"
                          value={emailContent.instructionsTitle || 'FINAL STEPS & INSTRUCTIONS TO FOLLOW'}
                          onChange={(e) => setEmailContent({ ...emailContent, instructionsTitle: e.target.value })}
                          placeholder="FINAL STEPS & INSTRUCTIONS TO FOLLOW"
                          className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      <div>
                        <label htmlFor="instructionsBlock" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                          Instructions Content
                        </label>
                        <textarea
                          id="instructionsBlock"
                          value={emailContent.instructionsBlock}
                          onChange={(e) => setEmailContent({ ...emailContent, instructionsBlock: e.target.value })}
                          rows={5}
                          placeholder="1. Get your Zelle account ready.&#10;2. Ask for the Zelle details from the payment issuer.&#10;3. Send the refund..."
                          className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Important Notes */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Important Notes</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="additionalAmount" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Additional Amount ($)
                          </label>
                          <input
                            type="text"
                            id="additionalAmount"
                            value={emailContent.additionalAmount}
                            onChange={(e) => setEmailContent({ ...emailContent, additionalAmount: e.target.value })}
                            placeholder="400.00"
                            className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <label htmlFor="totalAmount" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Total Amount ($)
                          </label>
                          <input
                            type="text"
                            id="totalAmount"
                            value={emailContent.totalAmount}
                            onChange={(e) => setEmailContent({ ...emailContent, totalAmount: e.target.value })}
                            placeholder="1,000.00"
                            className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <label htmlFor="finalAmount" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Final Amount ($)
                          </label>
                          <input
                            type="text"
                            id="finalAmount"
                            value={emailContent.finalAmount}
                            onChange={(e) => setEmailContent({ ...emailContent, finalAmount: e.target.value })}
                            placeholder="2,000.00"
                            className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="importantNotesBlock" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                          Important Notes Content
                        </label>
                        <textarea
                          id="importantNotesBlock"
                          value={emailContent.importantNotesBlock}
                          onChange={(e) => setEmailContent({ ...emailContent, importantNotesBlock: e.target.value })}
                          rows={3}
                          placeholder="IMPORTANT NOTE: $2,000.00 won't reflect into your account yet..."
                          className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Final Instructions */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Final Instructions</h4>
                    <div>
                      <label htmlFor="finalInstructionsBlock" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Final Instructions Content
                      </label>
                      <textarea
                        id="finalInstructionsBlock"
                        value={emailContent.finalInstructionsBlock}
                        onChange={(e) => setEmailContent({ ...emailContent, finalInstructionsBlock: e.target.value })}
                        rows={3}
                        placeholder="YOUR FUNDS HAS BEEN APPROVED & SECURED BUT YOU ARE REQUIRED TO CARRY ON..."
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  {/* Support Information */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Support Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="supportText" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                          Support Text
                        </label>
                        <input
                          type="text"
                          id="supportText"
                          value={emailContent.supportText}
                          onChange={(e) => setEmailContent({ ...emailContent, supportText: e.target.value })}
                          placeholder="For Assistance, contact the support number below:"
                          className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      <div>
                        <label htmlFor="supportNumber" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                          Support Number
                        </label>
                        <input
                          type="text"
                          id="supportNumber"
                          value={emailContent.supportNumber}
                          onChange={(e) => setEmailContent({ ...emailContent, supportNumber: e.target.value })}
                          placeholder="+1 (336) 310-9279"
                          className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>

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
    </div>
  );
}