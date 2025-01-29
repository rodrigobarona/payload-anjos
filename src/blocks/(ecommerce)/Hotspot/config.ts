import type { Block } from "payload";

import { marginFields, paddingFields } from "@/fields/spacingFields";
import { noBlocksLexical } from "@/fields/noBlocksLexical";

export const Hotspot: Block = {
  slug: "hotspotZone",
  interfaceName: "hotspotBlock",
  labels: {
    singular: {
      pl: "Strefa hotspot",
      en: "Hotspot",
    },
    plural: {
      pl: "Strefy hotspot",
      en: "Hotspots",
    },
  },
  //   imageURL: "/blocksThumbnails/accordion.png",
  //   imageAltText: "Hotspot",
  fields: [
    {
      name: "title",
      type: "richText",
      localized: true,
      editor: noBlocksLexical,
    },
    {
      name: "type",
      type: "select",
      label: {
        pl: "Typ",
        en: "Type",
      },
      // required: true,
      options: [
        { label: { pl: "Z danej kategorii", en: "From category" }, value: "category" },
        { label: { pl: "Z danej podkategorii", en: "From subcategory" }, value: "subcategory" },
        { label: { pl: "Ręcznie wybrane produkty", en: "Manual picked products" }, value: "manual" },
      ],
    },
    {
      name: "appearance",
      type: "select",
      label: {
        pl: "Wygląd",
        en: "Appearance",
      },
      // required: true,
      options: [{ label: { pl: "Domyślny", en: "Default" }, value: "default" }],
    },
    {
      name: "sort",
      type: "select",
      label: {
        pl: "Sortuj według",
        en: "Sort by",
      },
      options: [
        { label: { pl: "Ilość sprzedanych", en: "Quantity sold" }, value: "quantity-sold" },
        { label: { pl: "Najnowsze", en: "Newest" }, value: "newest" },
        { label: { pl: "Najstarsze", en: "Oldest" }, value: "oldest" },
        { label: { pl: "Najtańsze", en: "Cheapest" }, value: "cheapest" },
        { label: { pl: "Najdroższe", en: "Most expensive" }, value: "most-expensive" },
      ],
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.type === "manual",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "productCategories",
      admin: {
        condition: (_, siblingData) => siblingData.type === "category",
      },
    },
    {
      name: "subcategory",
      type: "relationship",
      relationTo: "productSubCategories",
      admin: {
        condition: (_, siblingData) => siblingData.type === "subcategory",
      },
    },
    {
      name: "limit",
      type: "number",
      label: {
        pl: "Limit produktów",
        en: "Products limit",
      },
      admin: {
        condition: (_, siblingData) => siblingData.type !== "manual",
      },
      // required: true,
    },
    marginFields,
    paddingFields,
  ],
};
