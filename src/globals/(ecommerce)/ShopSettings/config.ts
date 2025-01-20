import { revalidateGlobal } from "@/hooks/revalidateGlobal";
import type { GlobalConfig } from "payload";

export const ShopSettings: GlobalConfig = {
  slug: "shopSettings",
  label: {
    en: "Shop settings",
    pl: "Ustawienia sklepu",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: "E-commerce",
  },
  fields: [
    {
      name: "availableCurrencies",
      type: "select",
      label: {
        en: "Available currencies",
        pl: "Dostępne waluty",
      },
      options: [
        { value: "USD", label: "USD" },
        { value: "EUR", label: "EUR" },
        { value: "GBP", label: "GBP" },
        { value: "PLN", label: "PLN" },
      ],
      admin: {
        description: {
          en: "First currency is the default one",
          pl: "Pierwsza waluta jest walutą domyślną",
        },
      },
      hasMany: true,
      required: true,
    },
    {
      name: "enableOAuth",
      type: "checkbox",
      label: { en: "Enable OAuth", pl: "Włącz OAuth" },
      defaultValue: false,
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
