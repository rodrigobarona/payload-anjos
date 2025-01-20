import { Locale } from "@/i18n/config";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { getLocale } from "next-intl/server";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { OneStepWithSummary } from "./variants/OneStepWithSummary";

export const Checkout = async ({ locale }: { locale: Locale }) => {
  try {
    const checkoutData = await getCachedGlobal("checkout", locale, 1)();

    let CheckoutComponent: ReactNode = null;
    switch (checkoutData.type) {
      case "OneStepWithSummary":
        CheckoutComponent = <OneStepWithSummary locale={locale} />;
        break;
    }

    if (!CheckoutComponent) {
      notFound();
    }

    return CheckoutComponent;
  } catch (error) {
    console.log(error);
    notFound();
  }
};
