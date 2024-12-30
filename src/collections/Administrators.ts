import type { CollectionConfig } from "payload";

export const Administrators: CollectionConfig = {
  slug: "administrators",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [],
};
