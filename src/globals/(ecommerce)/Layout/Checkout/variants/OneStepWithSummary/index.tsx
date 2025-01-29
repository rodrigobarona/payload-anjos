import { getTranslations } from "next-intl/server";

import { type Locale } from "@/i18n/config";
import { getCustomer } from "@/utilities/getCustomer";
import { getCachedGlobal } from "@/utilities/getGlobals";

import { CheckoutForm } from "./components/CheckoutForm";

export const OneStepWithSummary = async ({ locale }: { locale: Locale }) => {
  const user = await getCustomer();

  const { geowidgetToken } = await getCachedGlobal("inpost-pickup", locale, 1)();

  const t = await getTranslations("CheckoutFormServer");

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">{t("checkout")}</h2>
        <CheckoutForm geowidgetToken={geowidgetToken ?? undefined} user={user} />
      </div>
    </div>
  );
};
