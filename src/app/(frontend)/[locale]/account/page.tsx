import { Locale } from "@/i18n/config";
import { redirect } from "@/i18n/routing";
import { getCustomer } from "@/utilities/getCustomer";

const AccountPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const user = await getCustomer();
  const { locale } = await params;

  if (!user) {
    return redirect({ locale, href: "/login" });
  }

  return (
    <div className="container pt-24">
      Welcome, {user.firstName} {user.lastName}!
    </div>
  );
};
export default AccountPage;
