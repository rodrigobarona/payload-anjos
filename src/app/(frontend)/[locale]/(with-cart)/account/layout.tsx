import { LogoutButton } from "@/components/(ecommerce)/LogoutButton";
import { ClientPanel } from "@/globals/(ecommerce)/Layout/ClientPanel/Component";
import { Locale } from "@/i18n/config";
import { redirect } from "@/i18n/routing";
import { getCustomer } from "@/utilities/getCustomer";
import { ReactNode } from "react";

const AccountPage = async ({
  params,
  children,
}: {
  params: Promise<{ locale: Locale }>;
  children: ReactNode;
}) => {
  const user = await getCustomer();
  const { locale } = await params;

  if (!user) {
    return redirect({ locale, href: "/login" });
  }

  return <ClientPanel user={user}>{children}</ClientPanel>;
};
export default AccountPage;
