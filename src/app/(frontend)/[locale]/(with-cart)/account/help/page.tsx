import { ClientHelp } from "@/globals/(ecommerce)/Layout/ClientPanel/Help/Component";
import { Locale } from "@/i18n/config";
import { setRequestLocale } from "next-intl/server";

const HelpPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ClientHelp />;
};
export default HelpPage;
