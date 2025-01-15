"use server";

import { sendZelle, sendPaypal } from "@/lib/mail";
import { ZelleEmailContent, PaypalEmailContent } from "@/types/email";

export async function sendEmail(email: string, emailContent: ZelleEmailContent | PaypalEmailContent) {
  console.log("Server action called with:", { email, emailContent });
  
  try {
    console.log("Attempting to send email...");
    if ('statusText' in emailContent) {
      // This is a Zelle email
      await sendZelle(email, emailContent);
    } else {
      // This is a PayPal email
      await sendPaypal(email, emailContent);
    }

    console.log("Email sent successfully");
    return { success: true };
  } catch (error) {
    console.error("Error in server action:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return { success: false, error: error instanceof Error ? error.message : "Failed to send email" };
  }
} 