import { Checkout } from "@/globals/(ecommerce)/Layout/Checkout/Component";
import { type Locale } from "@/i18n/config";

const CheckoutPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params;
  return <Checkout locale={locale} />;
};
export default CheckoutPage;
