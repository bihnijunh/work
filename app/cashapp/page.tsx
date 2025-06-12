                                                                                                                                                           "use client";

import { useState, useEffect } from "react";
import { sendEmail } from "../actions";
import { SenderConfiguration } from "@/components/SenderConfiguration";
import { CashAppEmailTemplate } from "@/components/CashAppEmailTemplate";
import { ProfileManager } from "@/components/ProfileManager";
import { ProfileImageSelector } from "@/components/ProfileImageSelector";
import { CashAppPaymentEmailContent } from "@/types/email";
import { saveCurrentProfile, loadCurrentProfile } from "@/lib/utils/profile-storage";
import { IMAGE_URLS } from "@/lib/config/images";

export default function CashAppPage() {
  // Use GitHub-hosted image as primary, with CDN as fallback
  const defaultCashAppImage = IMAGE_URLS.profiles.mariaElena;

  const [emailContent, setEmailContent] = useState<CashAppPaymentEmailContent>({
    toEmail: "",
    fromEmail: "cashapp@customersupportagent.support",
    subject: "",
    customSender: "",
    senderName: "María Elena Rodriguez",
    senderHandle: "$cheny1954",
    amount: "10.00",
    paymentDescription: "miscellaneous",
    supportPhone: "1 (336) 310-9279",
    supportHours: "9 AM to 7 PM ET",
    senderProfileImage: defaultCashAppImage, // Initialize with default Cash App image
    visibleBlocks: {
      header: true,
      senderInfo: true,
      amount: true,
      supportInfo: true,
      socialLinks: true,
      footer: true
    }
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Load saved profile on component mount
  useEffect(() => {
    const savedProfile = loadCurrentProfile();
    if (savedProfile) {
      setEmailContent(savedProfile);
    }
  }, []);

  // Auto-save functionality with debouncing
  useEffect(() => {
    if (!autoSaveEnabled) return;

    const timeoutId = setTimeout(() => {
      saveCurrentProfile(emailContent);
    }, 1000); // Save after 1 second of inactivity

    return () => clearTimeout(timeoutId);
  }, [emailContent, autoSaveEnabled]);

  // Handle profile loading
  const handleLoadProfile = (content: CashAppPaymentEmailContent) => {
    setEmailContent(content);
    setStatus("idle"); // Reset status when loading a profile
  };

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
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Email Preview
            </h2>
            <CashAppEmailTemplate content={emailContent} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Email Configuration
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 border-b pb-2">
                    Email Configuration
                  </h3>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={emailContent.subject}
                      onChange={(e) => setEmailContent({ ...emailContent, subject: e.target.value })}
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      required
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
                      placeholder="cashapp@customersupportagent.support"
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                </div>

                <SenderConfiguration
                  service="cashapp"
                  currentSender={emailContent.customSender}
                  onSenderChange={(sender) => setEmailContent({ ...emailContent, customSender: sender })}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 border-b pb-2">
                    Content Configuration
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="senderName" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Sender Name
                      </label>
                      <input
                        type="text"
                        id="senderName"
                        value={emailContent.senderName}
                        onChange={(e) => setEmailContent({ ...emailContent, senderName: e.target.value })}
                        placeholder="María Elena Rodriguez"
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="senderHandle" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Sender Handle
                      </label>
                      <input
                        type="text"
                        id="senderHandle"
                        value={emailContent.senderHandle}
                        onChange={(e) => setEmailContent({ ...emailContent, senderHandle: e.target.value })}
                        placeholder="$cheny1954"
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Amount (without $)
                      </label>
                      <input
                        type="text"
                        id="amount"
                        value={emailContent.amount}
                        onChange={(e) => setEmailContent({ ...emailContent, amount: e.target.value })}
                        placeholder="10.00"
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="paymentDescription" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Payment Description
                      </label>
                      <input
                        type="text"
                        id="paymentDescription"
                        value={emailContent.paymentDescription || ''}
                        onChange={(e) => setEmailContent({ ...emailContent, paymentDescription: e.target.value })}
                        placeholder="miscellaneous"
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div>
                      <label htmlFor="supportPhone" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Support Phone
                      </label>
                      <input
                        type="text"
                        id="supportPhone"
                        value={emailContent.supportPhone || ''}
                        onChange={(e) => setEmailContent({ ...emailContent, supportPhone: e.target.value })}
                        placeholder="1 (336) 310-9279"
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    <div>
                      <label htmlFor="supportHours" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Support Hours
                      </label>
                      <input
                        type="text"
                        id="supportHours"
                        value={emailContent.supportHours || ''}
                        onChange={(e) => setEmailContent({ ...emailContent, supportHours: e.target.value })}
                        placeholder="9 AM to 7 PM ET"
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="supportText" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Support Text (Optional)
                    </label>
                    <textarea
                      id="supportText"
                      value={emailContent.supportText || ''}
                      onChange={(e) => setEmailContent({ ...emailContent, supportText: e.target.value })}
                      placeholder="For any issues, including the recipient not receiving funds, please contact us at"
                      rows={3}
                      className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  {/* Profile Image Selector */}
                  <ProfileImageSelector
                    currentImage={emailContent.senderProfileImage}
                    onImageChange={(imageUrl) => setEmailContent({
                      ...emailContent,
                      senderProfileImage: imageUrl
                    })}
                  />

                  <div>
                    <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Visible Sections
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {Object.entries(emailContent.visibleBlocks || {}).map(([key, value]) => (
                        <label key={key} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setEmailContent({
                              ...emailContent,
                              visibleBlocks: {
                                ...emailContent.visibleBlocks,
                                [key]: e.target.checked
                              }
                            })}
                            className="mr-2 text-blue-600"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Auto-save toggle */}
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-save</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Automatically save your changes</p>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={autoSaveEnabled}
                      onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {autoSaveEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
                </div>

                {/* Profile Manager */}
                <ProfileManager
                  currentContent={emailContent}
                  onLoadProfile={handleLoadProfile}
                />

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