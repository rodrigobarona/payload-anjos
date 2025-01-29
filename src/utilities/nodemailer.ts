import nodemailer from "nodemailer";
import { getCachedGlobal } from "./getGlobals";

const { smtp, messages } = await getCachedGlobal("emailMessages", "en", 1)();

const { host, fromEmail, password, port, secure, user } = smtp;

const transporter = nodemailer.createTransport({
  host,
  port: Number(port),
  secure,
  auth: {
    user,
    pass: password,
  },
});

export const sendEmail = async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
  try {
    const info = await transporter.sendMail({
      from: fromEmail,
      to,
      subject,
      html,
    });
    console.log(info);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.log(error);
    throw new Error(`Error sending email: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};
