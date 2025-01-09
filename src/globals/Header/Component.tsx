import { HeaderClient } from "./Component.client";
import { getCachedGlobal } from "@/utilities/getGlobals";

import type { Header } from "@/payload-types";
import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n/config";

export async function Header() {
  const locale = (await getLocale()) as Locale;
  const headerData: Header = await getCachedGlobal("header", locale, 1)();

  return <HeaderClient data={headerData} />;
}
