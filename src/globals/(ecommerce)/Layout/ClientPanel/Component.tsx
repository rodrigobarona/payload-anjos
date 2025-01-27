import { Locale } from "@/i18n/config";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { getLocale } from "next-intl/server";
import { ReactNode } from "react";
import { notFound } from "next/navigation";

import { WithSidebar } from "./variants/WithSidebar";
import { Customer } from "@/payload-types";

export const ClientPanel = async ({ user, children }: { user: Customer; children: ReactNode }) => {
  try {
    const locale = (await getLocale()) as Locale;
    const { clientPanel } = await getCachedGlobal("shopLayout", locale, 1)();

    let ClientPanelComponent: ReactNode = null;
    switch (clientPanel.type) {
      case "withSidebar":
        ClientPanelComponent = <WithSidebar>{children}</WithSidebar>;
        break;
    }

    if (!ClientPanelComponent) {
      notFound();
    }

    return ClientPanelComponent;
  } catch (error) {
    console.log(error);
    notFound();
  }
};
