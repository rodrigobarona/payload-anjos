/* eslint-disable */
// For now disable eslint TODO: bring it back
import { Html } from "@react-email/components";

import { type Locale } from "@/i18n/config";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { ReactNode } from "react";
import { Default } from "./variants/Default";
import { Order } from "@/payload-types";

export const OrderStatusEmail = async ({ order, locale }: { order: Order; locale: Locale }) => {
  const { messages } = await getCachedGlobal("emailMessages", locale, 1)();

  let Email: ReactNode = <Html></Html>;

  switch (messages.template) {
    case "default":
      Email = <Default order={order} locale={locale} />;
  }
  return Email;
};
