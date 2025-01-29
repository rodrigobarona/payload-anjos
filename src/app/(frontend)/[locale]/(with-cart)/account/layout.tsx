import { setRequestLocale } from "next-intl/server";
import { type ReactNode } from "react";

import { ClientPanel } from "@/globals/(ecommerce)/Layout/ClientPanel/Component";
import { type Locale } from "@/i18n/config";
import { redirect } from "@/i18n/routing";
import { getCustomer } from "@/utilities/getCustomer";

export const dynamic = "force-dynamic";

const AccountPage = async ({
  params,
  children,
}: {
  params: Promise<{ locale: Locale }>;
  children: ReactNode;
}) => {
  const user = await getCustomer();
  const { locale } = await params;
  setRequestLocale(locale);

  if (!user) {
    return redirect({ locale, href: "/login" });
  }

  return <ClientPanel user={user}>{children}</ClientPanel>;
};
export default AccountPage;
