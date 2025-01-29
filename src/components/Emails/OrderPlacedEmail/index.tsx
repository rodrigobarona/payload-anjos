import { Button, Html, Text } from "@react-email/components";
import { getTranslations } from "next-intl/server";
import * as React from "react";

import { type Locale } from "@/i18n/config";

export const OrderPlacedEmail = async ({ order, locale }: { order: Order; locale: Locale }) => {
  const { messages } = await getCachedGlobal("emailMessages", locale, 1)();

  let Email: ReactNode = <Html></Html>;

  switch (messages.template) {
    case "default":
      Email = <Default order={order} locale={locale} />;
  }
  return Email;
};
