import { revalidateGlobal } from "@/hooks/revalidateGlobal";
import type { GlobalConfig } from "payload";

export const ProductDetails: GlobalConfig = {
  slug: "productDetails",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "text",
      type: "text",
      label: "Text",
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
