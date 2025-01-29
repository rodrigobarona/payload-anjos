import nodemailer from "nodemailer";

import { getCachedGlobal } from "./getGlobals";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

type EmailResponse = {
  success: boolean;
  messageId: string;
};

const createEmailTransporter = async () => {
  const { smtp } = await getCachedGlobal("emailMessages", "en", 1)();

  if (!smtp) {
    throw new Error("SMTP configuration is missing");
  }

  const { host, fromEmail, password, port, secure, user } = smtp;

  return {
    transporter: nodemailer.createTransport({
      host,
      port: Number(port),
      secure,
      auth: { user, pass: password },
    }),
    fromEmail,
  };
};

export const sendEmail = async ({ to, subject, html }: EmailPayload): Promise<EmailResponse> => {
  const { transporter, fromEmail } = await createEmailTransporter();

  try {
    const { messageId } = await transporter.sendMail({
      from: fromEmail,
      to,
      subject,
      html,
    });

    return { success: true, messageId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown email error";
    throw new Error(`Failed to send email: ${errorMessage}`);
  }
};
