import { Locale } from "@/i18n/config";
import { Button, Html, Text } from "@react-email/components";
import { getTranslations } from "next-intl/server";
import * as React from "react";

export const OrderPlacedEmail = async ({
  url,
  locale,
  name,
}: {
  url: string;
  locale: Locale;
  name: string;
}) => {
  const t = await getTranslations({ locale, namespace: "Emails.reset-password" });
  return (
    <Html>
      <Text
        style={{
          marginBottom: "24px",
          color: "#000",
          display: "block",
          textAlign: "center",
          fontSize: "16px",
        }}
      >
        {t("greeting", { name })},
      </Text>
      <Text
        style={{
          marginBottom: "24px",
          color: "#000",
          display: "block",
          textAlign: "center",
          fontSize: "16px",
        }}
      >
        {t("message")}
      </Text>
      <Button href={url} style={{ background: "#000", color: "#fff", padding: "12px 20px" }}>
        {t("button")}
      </Button>
    </Html>
  );
};
