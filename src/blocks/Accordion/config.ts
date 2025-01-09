import type { Block, Field } from "payload";

import { marginFields, paddingFields } from "@/fields/spacingFields";
import { defaultLexical } from "@/fields/defaultLexical";

const faqFields: Field[] = [
  {
    name: "title",
    type: "text",
    localized: true,
    required: true,
  },
  {
    name: "content",
    type: "richText",
    localized: true,
    editor: defaultLexical,
    required: true,
  },
];

export const Accordion: Block = {
  slug: "accordion",
  interfaceName: "AccordionBlock",
  imageURL: "/accordion.png",
  imageAltText: "Accordion",
  fields: [
    {
      name: "title",
      type: "richText",
      localized: true,
      editor: defaultLexical,
    },
    {
      name: "items",
      type: "array",
      admin: {
        initCollapsed: true,
      },
      required: true,
      fields: faqFields,
    },
    marginFields,
    paddingFields,
  ],
};
