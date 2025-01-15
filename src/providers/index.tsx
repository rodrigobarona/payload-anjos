import { ReactNode } from "react";

// import { HeaderThemeProvider } from "./HeaderTheme";
// import { ThemeProvider } from "./Theme";

import { getCachedGlobal } from "@/utilities/getGlobals";
import { ShopSetting } from "@/payload-types";
import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n/config";

export const Providers = async ({ children }: { children: ReactNode }) => {
  const locale = (await getLocale()) as Locale;
  const shopSettings: ShopSetting = await getCachedGlobal("shopSettings", locale, 1)();
  return children;
};
