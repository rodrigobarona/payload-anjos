import { Locale } from "@/i18n/config";
import { Product } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { getLocale } from "next-intl/server";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { SlideOver } from "./variants/SlideOver";

export const Cart = async () => {
  try {
    const locale = (await getLocale()) as Locale;
    const cartData = await getCachedGlobal("cart", locale, 1)();

    let CartComponent: ReactNode = null;
    switch (cartData.type) {
      case "slideOver":
        CartComponent = <SlideOver />;
        break;
    }

    return CartComponent;
  } catch (error) {
    console.log(error);
  }
};
