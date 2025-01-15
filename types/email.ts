export interface ZelleEmailContent {
  recipientAmount: string;
  senderName: string;
  statusText: string;
  message: string;
  supportText: string;
  supportNumber: string;
  toEmail: string;
  fromEmail: string;
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
} 