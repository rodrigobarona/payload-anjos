import type { GlobalConfig } from "payload";

import { link } from "@/fields/link";
import { revalidateHeader } from "./hooks/revalidateHeader";
import { backgroundPicker } from "@/fields/backgroundPicker";

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "navItems",
      type: "array",
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/globals/Header/RowLabel#RowLabel",
        },
      },
    },
    {
      name: "type",
      type: "select",
      options: [
        {
          label: "Default",
          value: "default",
        },
        {
          label: "Floating",
          value: "floating",
        },
      ],
      required: true,
      defaultValue: "default",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "hideOnScroll",
      label: "Hide on Scroll",
      type: "checkbox",
      defaultValue: false,
    },
    backgroundPicker,
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
