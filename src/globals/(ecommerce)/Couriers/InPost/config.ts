import { revalidateGlobal } from "@/hooks/revalidateGlobal";
import type { GlobalConfig } from "payload";

export const InPost: GlobalConfig = {
  slug: "inpost",
  label: {
    en: "InPost",
    pl: "InPost",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: "Courier integrations",
      pl: "Integracje kurierskie",
    },
  },
  fields: [
    {
      name: "apiUrl",
      type: "text",
      label: {
        en: "API URL",
        pl: "URL API",
      },
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
