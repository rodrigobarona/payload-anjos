import { Locale } from "@/i18n/config";
import { redirect } from "@/i18n/routing";

const Page = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params;

  return redirect({ locale, href: "/account/orders" });
};

export default Page;
