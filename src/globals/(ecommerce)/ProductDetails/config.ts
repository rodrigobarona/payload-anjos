import { revalidateGlobal } from "@/hooks/revalidateGlobal";
import type { GlobalConfig } from "payload";

export const ProductDetails: GlobalConfig = {
  slug: "productDetails",
  label: {
    en: "Product Details Page",
    pl: "Karta produktu",
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
            en: "With image gallery and expandable details",
            pl: "Z galerią zdjęć i rozszerzalnymi szczegółami",
          },
          value: "WithImageGalleryExpandableDetails",
        },
      ],
      label: {
        en: "Type of product card",
        pl: "Rodzaj karty produktu",
      },
      required: true,
      defaultValue: "WithImageGalleryExpandableDetails",
    },
    {
      name: "reviewsEnabled",
      type: "checkbox",
      label: {
        en: "Enable product reviews",
        pl: "Włącz opinie o produkcie",
      },
      defaultValue: true,
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
