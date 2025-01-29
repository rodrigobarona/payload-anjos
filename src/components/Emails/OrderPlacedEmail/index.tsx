import { Locale } from "@/i18n/config";
import { Order } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { Html } from "@react-email/components";
import { ReactNode } from "react";
import { Default } from "./variants/Default";

export const OrderPlacedEmail = async ({ order, locale }: { order: Order; locale: Locale }) => {
  const { messages } = await getCachedGlobal("emailMessages", locale, 1)();

  let Email: ReactNode = <Html></Html>;

  switch (messages.template) {
    case "default":
      Email = <Default order={order} locale={locale} />;
  }
  return Email;
};
