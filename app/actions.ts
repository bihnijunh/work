"use server";

import { sendZelleEmail } from "@/lib/emails/zelle/standard";
import { sendZelleAdditionalEmail } from "@/lib/emails/zelle/additional";
import { sendPaypalEmail } from "@/lib/emails/paypal/standard";
import { EmailResult } from "@/lib/emails/utils";
import { ZelleEmailContent, PaypalEmailContent, ZelleAdditionalPaymentContent } from "@/types/email";

export async function sendEmail(email: string, emailContent: ZelleEmailContent | PaypalEmailContent | ZelleAdditionalPaymentContent): Promise<EmailResult> {
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
      if ('visibleBlocks' in emailContent) {
        result = await sendZelleAdditionalEmail(email, emailContent);
      } else {
        result = await sendZelleEmail(email, emailContent);
      }
    } else {
      // This is a PayPal email
      result = await sendPaypalEmail(email, emailContent);
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