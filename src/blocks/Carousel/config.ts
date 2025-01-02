import type { Block, Field } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { link } from "@/fields/link";
import { spacingFields } from "@/fields/spacingFields";

const slideFields: Field[] = [
  {
    name: "image",
    type: "upload",
    relationTo: "media",
    required: true,
  },
  {
    name: "enableLink",
    type: "checkbox",
  },
  link({
    overrides: {
      admin: {
        condition: (_: any, { enableLink }: { enableLink: any }) => Boolean(enableLink),
      },
    },
  }),
];

export const Carousel: Block = {
  slug: "carousel",
  interfaceName: "CarouselBlock",
  fields: [
    {
      name: "slides",
      type: "array",
      admin: {
        initCollapsed: true,
      },
      fields: slideFields,
    },
    {
      name: "autoplay",
      type: "checkbox",
      required: true,
    },
    ...spacingFields,
  ],
};
