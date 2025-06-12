export interface ZelleEmailContent {
  recipientAmount: string;
  senderName: string;
  statusText: string;
  message: string;
  supportText: string;
  supportNumber: string;
  toEmail: string;
  fromEmail: string;
  emailTitle?: string;  // Optional email title
  customSender?: string; // Optional custom sender override
}

export interface ZelleAdditionalPaymentContent {
  // Email settings
  toEmail: string;
  fromEmail: string;
  emailTitle?: string;  // Optional email title
  customSender?: string; // Optional custom sender override

  // Content fields
  recipientAmount: string;
  senderName: string;
  statusText: string;
  message: string;
  supportText: string;
  supportNumber: string;
  additionalAmount: string;
  totalAmount: string;
  finalAmount: string;
  amountNotificationText?: string;  // New field for customizable amount notification
  instructionsTitle?: string;       // New field for customizable instructions title

  // Block content
  instructionsBlock: string;
  importantNotesBlock: string;
  finalInstructionsBlock: string;
}

export interface PaypalEmailContent {
  recipientName: string;
  title: string;
  message: string;
  amount: string;
  senderName: string;
  supportText: string;
  supportNumber: string;
  status: string;
  statusHeading: string;
  toEmail: string;
  fromEmail: string;
  customSender?: string; // Optional custom sender override
}

export interface ChimeEmailContent {
  // Email settings
  toEmail: string;
  fromEmail: string;
  emailTitle?: string;
  customSender?: string; // Optional custom sender override

  // Content
  message: string;
  supportText: string;
  supportNumber: string;

  // Block visibility
  visibleBlocks: {
    header: boolean;
    preview: boolean;
    title: boolean;
    message: boolean;
    verifyButton: boolean;
    support: boolean;
    footer: boolean;
  };
}

export interface CashAppEmailContent {
  // Email settings
  toEmail: string;
  fromEmail: string;
  emailTitle?: string;
  customSender?: string; // Optional custom sender override

  // Content
  message: string;
  supportText: string;
  supportNumber: string;

  // Block visibility
  visibleBlocks: {
    header: boolean;
    preview: boolean;
    title: boolean;
    message: boolean;
    verifyButton: boolean;
    support: boolean;
    footer: boolean;
  };
}

export interface CashAppPaymentEmailContent {
  // Email settings
  toEmail: string;
  fromEmail: string;
  subject: string;
  customSender?: string; // Optional custom sender override
  emailTitle?: string; // Optional email title

  // Sender information
  senderName: string;
  senderHandle: string; // e.g., $cheny1954
  senderProfileImage?: string; // Optional profile image URL

  // Payment details
  amount: string; // e.g., "10.00"
  paymentDescription?: string; // e.g., "for miscellaneous"

  // Support information
  supportText?: string;
  supportPhone?: string; // e.g., "+1 (336) 310-9279"
  supportHours?: string; // e.g., "9 AM to 7 PM ET"

  // Block visibility controls
  visibleBlocks?: {
    header?: boolean;
    senderInfo?: boolean;
    amount?: boolean;
    supportInfo?: boolean;
    socialLinks?: boolean;
    footer?: boolean;
  };
}

