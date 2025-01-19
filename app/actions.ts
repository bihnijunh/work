"use server";

import { sendZelle, sendPaypal } from "@/lib/mail";
import { ZelleEmailContent, PaypalEmailContent, ZelleAdditionalPaymentContent } from "@/types/email";

export async function sendEmail(email: string, emailContent: ZelleEmailContent | PaypalEmailContent | ZelleAdditionalPaymentContent) {
  if (!email) {
    return { success: false, error: "Email address is required" };
  }

  if (!emailContent) {
    return { success: false, error: "Email content is required" };
  }

  try {
    let result;
    
    if ('statusText' in emailContent) {
      // This is a Zelle email (either standard or additional payment)
      result = await sendZelle(email, emailContent);
    } else {
      // This is a PayPal email
      result = await sendPaypal(email, emailContent);
    }

    if (!result.success) {
      return { success: false, error: result.error || "Failed to send email" };
    }

    return { success: true, data: result.data };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}