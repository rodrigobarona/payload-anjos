import { OrdersData } from "@/globals/(ecommerce)/Layout/ClientPanel/OrdersData/Component";
import { Locale } from "@/i18n/config";
import { redirect } from "@/i18n/routing";
import { getCustomer } from "@/utilities/getCustomer";

const OrdersDataPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const user = await getCustomer();
  const { locale } = await params;
  if (!user) return redirect({ href: "/login", locale });
  return <OrdersData user={user} />;
};
export default OrdersDataPage;
