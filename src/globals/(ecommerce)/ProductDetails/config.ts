import type { GlobalConfig } from "payload";

export const ProductDetails: GlobalConfig = {
  slug: "productDetails",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "attribution",
      type: "richText",
      label: "Attribution",
    },
  ],
  hooks: {
    // afterChange: [revalidateProductDetails],
  },
};
