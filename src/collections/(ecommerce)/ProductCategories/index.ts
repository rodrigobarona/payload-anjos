import { slugField } from "@/fields/slug";
import { CollectionConfig } from "payload";

export const ProductCategories: CollectionConfig = {
  slug: "productCategories",
  access: {},
  labels: {
    singular: {
      en: "Product Category",
      pl: "Kateogria produktu",
    },
    plural: {
      en: "Product Categories",
      pl: "Kategorie produktów",
    },
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Category name",
        pl: "Nazwa kategorii",
      },
      type: "text",
      required: true,
      localized: true,
    },
    ...slugField(),
  ],
};
