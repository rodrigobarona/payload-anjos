import { setRequestLocale } from "next-intl/server";
import { type ReactNode } from "react";

import { ClientPanel } from "@/globals/(ecommerce)/Layout/ClientPanel/Component";
import { type Locale } from "@/i18n/config";
import { getMeUser } from "@/utilities/getMeUser";

export const dynamic = "force-dynamic";

const AccountPage = async ({
  params,
  children,
}: {
  params: Promise<{ locale: Locale }>;
  children: ReactNode;
}) => {
  const { locale } = await params;
  setRequestLocale(locale);
  await getMeUser({ nullUserRedirect: "/login", locale });

  return <ClientPanel>{children}</ClientPanel>;
};
export default AccountPage;
