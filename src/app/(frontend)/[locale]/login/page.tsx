import { LoginPageWithoutOAuth } from "@/components/(ecommerce)/LoginPage/WithoutOAuth";
import { Locale } from "@/i18n/config";
import { getCachedGlobal } from "@/utilities/getGlobals";

const LoginPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params;
  const shopSettings = await getCachedGlobal("shopSettings", locale, 1)();

  return shopSettings.enableOAuth ? <></> : <LoginPageWithoutOAuth />;
};
export default LoginPage;
