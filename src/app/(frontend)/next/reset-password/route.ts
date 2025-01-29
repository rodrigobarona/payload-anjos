import { randomBytes } from "crypto";
import { getPayload } from "payload";
import config from "@payload-config";
import { sendEmail } from "@/utilities/nodemailer";
import { render } from "@react-email/components";
import { ResetPasswordEmail } from "@/components/Emails/ResetPasswordEmail";
import { getLocale, getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/config";
import { Administrator } from "@/payload-types";

export async function POST(req: Request) {
  const payload = await getPayload({ config });
  try {
    const body = await req.json();
    const email = body.email;
    const collection: "administrators" = "administrators";
    const token: string = randomBytes(20).toString("hex");

    const { docs } = await payload.find({
      collection: collection,
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (!docs || docs.length === 0) {
      return Response.json({ message: "Success" }, { status: 200 });
    }

    let user: Administrator = docs[0];

    user.resetPasswordToken = token;
    user.resetPasswordExpiration = new Date(Date.now() + 3600000).toISOString();

    user = await payload.update({
      collection: collection,
      id: user.id,
      data: user,
    });

    const locale = (await getLocale()) as Locale;

    const html = await render(
      await ResetPasswordEmail({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${locale}/reset-password?token=${token}&collection=${collection}`,
        locale,
        name: user.name || "User",
      }),
    );

    const t = await getTranslations({ locale, namespace: "Emails.reset-password" });

    const res = await sendEmail({ to: email, subject: t("subject"), html });
    console.log(res);
  } catch (error) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
  return Response.json({ message: "Success" }, { status: 200 });
}
