/* eslint-disable */
// For now disable eslint TODO: bring it back
import { Button, Html, Text } from "@react-email/components";
import { getTranslations } from "next-intl/server";

import { type Locale } from "@/i18n/config";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { ReactNode } from "react";
import { Default } from "./variants/Default";
import { Order } from "@/payload-types";

export const OrderPlacedEmail = async ({ order, locale }: { order: Order; locale: Locale }) => {
  const { messages } = await getCachedGlobal("emailMessages", locale, 1)();

  let Email: ReactNode = <Html></Html>;

  switch (messages.template) {
    case "default":
      Email = <Default order={order} locale={locale} />;
  }
  return Email;
};
