"use server";

import { sendZelleEmail } from "@/lib/emails/zelle/standard";
import { sendZelleAdditionalEmail } from "@/lib/emails/zelle/additional";
import { sendPaypalEmail } from "@/lib/emails/paypal/standard";
import { sendChimeEmail } from "@/lib/emails/chime/standard";
import { sendCashAppPaymentEmail } from "@/lib/emails/cashapp-payment/standard";
import { EmailResult } from "@/lib/emails/utils";
import {
  ZelleEmailContent,
  PaypalEmailContent,
  ZelleAdditionalPaymentContent,
  ChimeEmailContent,
  CashAppPaymentEmailContent
} from "@/types/email";

type EmailContent =
  | ZelleEmailContent
  | PaypalEmailContent
  | ZelleAdditionalPaymentContent
  | ChimeEmailContent
  | CashAppPaymentEmailContent;

export async function sendEmail(
  email: string, 
  emailContent: EmailContent
): Promise<EmailResult> {
  if (!email) {
    return { success: false, error: "Email address is required" };
  }

  if (!emailContent) {
    return { success: false, error: "Email content is required" };
  }

  try {
    let result: EmailResult;
    
    // Type guard functions
    const isChimeEmail = (content: EmailContent): content is ChimeEmailContent =>
      'visibleBlocks' in content &&
      content.visibleBlocks !== undefined &&
      typeof content.visibleBlocks === 'object' &&
      content.visibleBlocks !== null &&
      'verifyButton' in content.visibleBlocks;

    const isCashAppPaymentEmail = (content: EmailContent): content is CashAppPaymentEmailContent =>
      'senderName' in content && 'senderHandle' in content && 'amount' in content;

    const isZelleAdditionalEmail = (content: EmailContent): content is ZelleAdditionalPaymentContent =>
      'instructionsBlock' in content && 'importantNotesBlock' in content;

    const isZelleEmail = (content: EmailContent): content is ZelleEmailContent =>
      'statusText' in content && !('instructionsBlock' in content) && !('visibleBlocks' in content);

    const isPaypalEmail = (content: EmailContent): content is PaypalEmailContent =>
      'recipientName' in content && 'title' in content;

    if (isChimeEmail(emailContent)) {
      result = await sendChimeEmail(email, emailContent);
    } else if (isCashAppPaymentEmail(emailContent)) {
      result = await sendCashAppPaymentEmail(email, emailContent);
    } else if (isZelleAdditionalEmail(emailContent)) {
      result = await sendZelleAdditionalEmail(email, emailContent);
    } else if (isZelleEmail(emailContent)) {
      result = await sendZelleEmail(email, emailContent);
    } else if (isPaypalEmail(emailContent)) {
      result = await sendPaypalEmail(email, emailContent);
    } else {
      return { success: false, error: "Invalid email content type" };
    }

    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to send email" 
    };
  }
}