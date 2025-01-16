import { LogoutButton } from "@/components/(ecommerce)/LogoutButton";
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
    <div className="container flex flex-col items-start gap-6 pt-24">
      Welcome {user.firstName} {user.lastName}!<LogoutButton>Log out</LogoutButton>
    </div>
  );
};
export default AccountPage;
