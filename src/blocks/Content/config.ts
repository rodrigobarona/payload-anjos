import type { Block, Field } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { link } from "@/fields/link";
import { marginFields, paddingFields } from "@/fields/spacingFields";
import { AlignmentField } from "@/fields/alignmentField";
import { backgroundPicker } from "@/fields/backgroundPicker";

const columnFields: Field[] = [
  {
    name: "size",
    type: "select",
    defaultValue: "oneThird",
    options: [
      {
        label: "One Sixth",
        value: "oneSixth",
      },
      {
        label: "One Third",
        value: "oneThird",
      },
      {
        label: "Half",
        value: "half",
      },
      {
        label: "Two Thirds",
        value: "twoThirds",
      },
      {
        label: "Five Sixth",
        value: "fiveSixth",
      },
      {
        label: "Full",
        value: "full",
      },
    ],
  },
  {
    name: "richText",
    type: "richText",
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ];
      },
    }),
    label: false,
  },
  {
    name: "enableLink",
    type: "checkbox",
  },
  {
    name: "enableProse",
    type: "checkbox",
    defaultValue: true,
  },
  paddingFields,
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
  backgroundPicker,
];

export const Content: Block = {
  slug: "content",
  interfaceName: "ContentBlock",
  fields: [
    {
      name: "columns",
      type: "array",
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
    AlignmentField,
    marginFields,
    paddingFields,
    backgroundPicker,
  ],
};
