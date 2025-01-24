import { Locale } from "@/i18n/config";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { getLocale } from "next-intl/server";
import { ReactNode } from "react";
import { SlideOver } from "./variants/SlideOver";

export const Cart = async () => {
  try {
    const locale = (await getLocale()) as Locale;
    const { cart } = await getCachedGlobal("shopLayout", locale, 1)();

    let CartComponent: ReactNode = null;
    switch (cart.type) {
      case "slideOver":
        CartComponent = <SlideOver />;
        break;
    }

    return CartComponent;
  } catch (error) {
    console.log(error);
  }
};
