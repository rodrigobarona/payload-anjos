import { revalidateGlobal } from "@/hooks/revalidateGlobal";
import type { GlobalConfig } from "payload";

export const Checkout: GlobalConfig = {
  slug: "checkout",
  label: {
    en: "Checkout Page",
    pl: "Strona checkout",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: "Shop settings",
      pl: "Ustawienia sklepu",
    },
  },
  fields: [
    {
      name: "type",
      type: "select",
      options: [
        {
          label: {
            en: "One Step With Summary",
            pl: "Jeden krok z podsumowaniem",
          },
          value: "OneStepWithSummary",
        },
      ],
      label: {
        en: "Type of checkout page",
        pl: "Rodzaj strony checkout",
      },
      required: true,
      defaultValue: "OneStepWithSummary",
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
