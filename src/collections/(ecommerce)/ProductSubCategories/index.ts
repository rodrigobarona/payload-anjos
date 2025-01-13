import { slugField } from "@/fields/slug";
import { CollectionConfig } from "payload";

export const ProductSubCategories: CollectionConfig = {
  slug: "productSubCategories",
  admin: {
    useAsTitle: "title",
  },
  labels: {
    singular: {
      en: "Product Subcategory",
      pl: "Podkateogria produktu",
    },
    plural: {
      en: "Product Subcategories",
      pl: "Podkategorie produktów",
    },
  },
  fields: [
    {
      name: "category",
      type: "relationship",
      relationTo: "productCategories",
      label: {
        en: "Parent category",
        pl: "Kategoria nadrzędna",
      },
      required: true,
    },
    {
      name: "title",
      label: {
        en: "Subcategory name",
        pl: "Nazwa podkategorii",
      },
      type: "text",
      required: true,
      localized: true,
    },
    ...slugField(),
  ],
};
