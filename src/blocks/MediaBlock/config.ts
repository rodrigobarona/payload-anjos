import type { Block } from "payload";

export const MediaBlock: Block = {
  slug: "mediaBlock",
  interfaceName: "MediaBlock",
  fields: [
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "spacingTop",
      label: "Spacing Top",
      type: "select",
      defaultValue: "medium",
      options: [
        {
          label: "None",
          value: "none",
        },
        {
          label: "Small",
          value: "small",
        },
        {
          label: "Medium",
          value: "medium",
        },
        {
          label: "Large",
          value: "large",
        },
      ],
    },
    {
      name: "spacingBottom",
      label: "Spacing Bottom",
      type: "select",
      defaultValue: "medium",
      options: [
        {
          label: "None",
          value: "none",
        },
        {
          label: "Small",
          value: "small",
        },
        {
          label: "Medium",
          value: "medium",
        },
        {
          label: "Large",
          value: "large",
        },
      ],
    },
  ],
};
