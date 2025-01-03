import type { Block, Field } from "payload";

import { spacingFields } from "@/fields/spacingFields";
import { defaultLexical } from "@/fields/defaultLexical";

const faqFields: Field[] = [
  {
    name: "title",
    type: "text",
    required: true,
  },
  {
    name: "content",
    type: "richText",
    editor: defaultLexical,
    required: true,
  },
];

export const Accordion: Block = {
  slug: "accordion",
  interfaceName: "AccordionBlock",
  imageURL: '/accordion.png',
  imageAltText: 'Accordion',
  fields: [
    {
      name: "title",
      type: "richText",
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
    ...spacingFields,
  ],
};
