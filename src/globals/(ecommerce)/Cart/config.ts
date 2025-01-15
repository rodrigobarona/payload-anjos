import { revalidateGlobal } from "@/hooks/revalidateGlobal";
import type { GlobalConfig } from "payload";

export const Cart: GlobalConfig = {
  slug: "cart",
  label: {
    en: "Cart",
    pl: "Koszyk",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "type",
      type: "select",
      options: [
        {
          label: {
            en: "Slide-over",
            pl: "Wysuwany",
          },
          value: "slideOver",
        },
      ],
      label: {
        en: "Basket type",
        pl: "Rodzaj koszyka",
      },
      defaultValue: "slideOver",
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
