import { headers } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { getPayload } from "payload";
import { type ReactNode } from "react";

import { ClientPanel } from "@/globals/(ecommerce)/Layout/ClientPanel/Component";
import { type Locale } from "@/i18n/config";
import { redirect } from "@/i18n/routing";
// import { getCustomer } from "@/utilities/getCustomer";
import config from "@payload-config";

export const dynamic = "force-dynamic";

const AccountPage = async ({
  params,
  children,
}: {
  params: Promise<{ locale: Locale }>;
  children: ReactNode;
}) => {
  // const user = await getCustomer();
  const { locale } = await params;
  setRequestLocale(locale);
  const authHeaders = await headers();
  const payload = await getPayload({ config });

  const { user } = await payload.auth({ headers: authHeaders });

  if (!user) {
    return redirect({ locale, href: "/login" });
  }

  return <ClientPanel>{children}</ClientPanel>;
};
export default AccountPage;
