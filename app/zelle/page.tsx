"use client";

import { useState } from "react";
import { sendEmail } from "../actions";
import { ZelleEmailTemplate } from "@/components/ZelleEmailTemplate";
import { ZelleEmailContent } from "@/types/email";

export default function ZellePage() {
  const [emailContent, setEmailContent] = useState<ZelleEmailContent>({
    recipientAmount: "170.00",
    senderName: "Eric",
    statusText: "PENDING",
    emailTitle: "Zelle Payment Support",
    message: `We have a problem crediting your payment because the status of your account is not a business user which makes your account have limits.

How to create a Zelle business account:

To expand into a business account, contact your buyer to send an additional payment of ($400.00) into your account to expand your limit. Soon as this is done, we will fully credit the total of $570.00`,
    supportText: "For Assistance, contact the support number below:",
    supportNumber: "+1 (586) 347-1749",
    toEmail: "",
    fromEmail: "no-replyzellecustomersupport@milanosailexpress.com"
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
            <ZelleEmailTemplate content={emailContent} />
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
                  
                  <div className="grid grid-cols-2 gap-4">
                    {/* Email Title */}
                    <div className="col-span-2">
                      <label htmlFor="emailTitle" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Email Title
                      </label>
                      <input
                        type="text"
                        id="emailTitle"
                        value={emailContent.emailTitle || ""}
                        onChange={(e) => setEmailContent({ ...emailContent, emailTitle: e.target.value })}
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Enter email title"
                      />
                    </div>

                    <div>
                      <label htmlFor="toEmail" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        To Email
                      </label>
                      <input
                        type="email"
                        id="toEmail"
                        value={emailContent.toEmail}
                        onChange={(e) => setEmailContent({ ...emailContent, toEmail: e.target.value })}
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="fromEmail" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        From Email
                      </label>
                      <input
                        type="email"
                        id="fromEmail"
                        value={emailContent.fromEmail}
                        onChange={(e) => setEmailContent({ ...emailContent, fromEmail: e.target.value })}
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Basic Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 border-b pb-2">
                    Basic Information
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="recipientAmount" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Amount
                      </label>
                      <input
                        type="text"
                        id="recipientAmount"
                        value={emailContent.recipientAmount}
                        onChange={(e) => setEmailContent({ ...emailContent, recipientAmount: e.target.value })}
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        required
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
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Message Content Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 border-b pb-2">
                    Message Content
                  </h3>

                  <div>
                    <label htmlFor="statusText" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Status
                    </label>
                    <input
                      type="text"
                      id="statusText"
                      value={emailContent.statusText}
                      onChange={(e) => setEmailContent({ ...emailContent, statusText: e.target.value })}
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Message Content
                    </label>
                    <textarea
                      id="message"
                      value={emailContent.message}
                      onChange={(e) => setEmailContent({ ...emailContent, message: e.target.value })}
                      rows={8}
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
                    />
                  </div>
                </div>

                {/* Support Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 border-b pb-2">
                    Support Information
                  </h3>

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
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        required
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
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        required
                      />
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