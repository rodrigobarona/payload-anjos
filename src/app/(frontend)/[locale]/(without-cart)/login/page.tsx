import { LoginPageWithoutOAuth } from "@/components/(ecommerce)/LoginPage/WithoutOAuth";
import { Locale } from "@/i18n/config";
import { redirect } from "@/i18n/routing";
import { getCustomer } from "@/utilities/getCustomer";
import { getCachedGlobal } from "@/utilities/getGlobals";

const LoginPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const user = await getCustomer();
  const { locale } = await params;
  if (user) {
    return redirect({ locale: locale, href: "/account" });
  }
  const shopSettings = await getCachedGlobal("shopSettings", locale, 1)();

  return shopSettings.enableOAuth ? <></> : <LoginPageWithoutOAuth />;
};
export default LoginPage;
