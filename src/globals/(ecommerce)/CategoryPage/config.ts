import { revalidateGlobal } from "@/hooks/revalidateGlobal";
import type { GlobalConfig } from "payload";

export const ProductDetails: GlobalConfig = {
  slug: "categoryPage",
  label: {
    en: "Category Page",
    pl: "Strona kategorii",
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
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
