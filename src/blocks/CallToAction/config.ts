import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { linkGroup } from "@/fields/linkGroup";
import { marginFields, paddingFields } from "@/fields/spacingFields";
import { defaultLexical } from "@/fields/defaultLexical";

export const CallToAction: Block = {
  slug: "cta",
  interfaceName: "CallToActionBlock",
  fields: [
    {
      name: "richText",
      type: "richText",
      editor: defaultLexical,
      label: false,
    },
    linkGroup({
      appearances: ["default", "outline"],
      overrides: {
        maxRows: 2,
      },
    }),
    marginFields,
    paddingFields,
  ],
  labels: {
    plural: "Calls to Action",
    singular: "Call to Action",
  },
};
