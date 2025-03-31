import { authenticated } from "@/access/authenticated";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";

import type { GlobalConfig } from "payload";

export const Paywalls: GlobalConfig = {
  slug: "paywalls",
  label: {
    en: "Paywalls",
    pl: "Bramki płatności",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: "Payments settings",
      pl: "Ustawienia płatności",
    },
  },
  fields: [
    {
      name: "paywall",
      label: {
        en: "Paywall",
        pl: "Bramka płatności",
      },
      type: "select",
      options: [
        {
          label: {
            en: "Stripe",
            pl: "Stripe",
          },
          value: "stripe",
        },
        {
          label: {
            en: "Autopay",
            pl: "Autopay",
          },
          value: "autopay",
        },
      ],
      defaultValue: "stripe",
      required: true,
    },
    {
      name: "stripe",
      label: {
        en: "Stripe configuration",
        pl: "Konfiguracja Stripe",
      },
      type: "group",
      admin: {
        condition: (data) => {
          return data.paywall === "stripe";
        },
        description: {
          pl: "Jeśli chcesz korzystać ze środowiska testowego, podaj tu odpowiadające klucze.",
          en: "If you want to use test environment, you can also provide test keys here.",
        },
      },
      fields: [
        {
          name: "secret",
          type: "text",
          label: {
            en: "Secret API Key",
            pl: "Prywatny klucz API",
          },
          access: {
            read: authenticated,
            create: authenticated,
            update: authenticated,
          },
          required: true,
        },
        {
          name: "webhookSecret",
          type: "text",
          label: {
            en: "Webhook Secret API Key",
            pl: "Prywatny klucz API Webhook",
          },
          access: {
            read: authenticated,
            create: authenticated,
            update: authenticated,
          },
          required: true,
        },
        {
          name: "public",
          type: "text",
          label: {
            en: "Public API Key",
            pl: "Publiczny klucz API",
          },
          access: {
            read: authenticated,
            create: authenticated,
            update: authenticated,
          },
        },
      ],
    },
    {
      name: "autopay",
      label: {
        en: "Autopay configuration",
        pl: "Konfiguracja Autopay",
      },
      type: "group",
      admin: {
        condition: (data) => {
          return data.paywall === "autopay";
        },
        description: {
          pl: "Jeśli chcesz korzystać ze środowiska testowego, podaj tu odpowiadające klucze.",
          en: "If you want to use test environment, you can also provide test keys here.",
        },
      },
      fields: [
        {
          name: "serviceID",
          type: "text",
          label: {
            en: "Service ID",
            pl: "ServiceID (Identyfikator Serwisu Partnera)",
          },
          access: {
            read: authenticated,
            create: authenticated,
            update: authenticated,
          },
          required: true,
        },
        {
          name: "hashKey",
          type: "text",
          label: {
            en: "Hash Key",
            pl: "HashKey (Klucz do generowania hasha)",
          },
          access: {
            read: authenticated,
            create: authenticated,
            update: authenticated,
          },
          required: true,
        },
        {
          name: "endpoint",
          type: "text",
          label: {
            en: "Endpoint",
            pl: "Endpoint",
          },
          access: {
            read: authenticated,

            create: authenticated,
            update: authenticated,
          },
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
