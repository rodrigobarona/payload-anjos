import { revalidateGlobal } from "@/hooks/revalidateGlobal";
import type { GlobalConfig } from "payload";

export const ProductList: GlobalConfig = {
  slug: "productList",
  label: {
    en: "Product List Page",
    pl: "Lista produktów",
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
      name: "filters",
      type: "select",
      label: {
        en: "Filters",
        pl: "Filtry",
      },
      options: [
        {
          label: {
            en: "None",
            pl: "Brak",
          },
          value: "none",
        },
        {
          label: {
            en: "With sidebar",
            pl: "Z bocznym panelem",
          },
          value: "withSidebar",
        },
        {
          label: {
            en: "Sort only",
            pl: "Tylko sortowanie",
          },
          value: "sortOnly",
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
