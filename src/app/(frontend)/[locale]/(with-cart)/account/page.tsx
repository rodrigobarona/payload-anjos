import { Locale } from "@/i18n/config";
import { redirect } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

const Page = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return redirect({ locale, href: "/account/orders" });
};

export default Page;
