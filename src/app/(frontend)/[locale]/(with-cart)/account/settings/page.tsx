import { Settings } from "@/globals/(ecommerce)/Layout/ClientPanel/Settings";
import { Locale } from "@/i18n/config";
import { redirect } from "@/i18n/routing";
import { getCustomer } from "@/utilities/getCustomer";
import { setRequestLocale } from "next-intl/server";

const SettingsPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const user = await getCustomer();
  const { locale } = await params;
  setRequestLocale(locale);
  if (!user) return redirect({ href: "/login", locale });
  return <Settings user={user} />;
};
export default SettingsPage;
