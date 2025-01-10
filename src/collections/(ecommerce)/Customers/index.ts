import { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
  slug: "customers",
  access: {},
  labels: {
    singular: {
      en: "Customer",
      pl: "Klient",
    },
    plural: {
      en: "Customers",
      pl: "Klienci",
    },
  },
  auth: true,
  fields: [
    {
      name: "firstName",
      label: {
        en: "First Name",
        pl: "Imię",
      },
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      label: {
        en: "Last Name",
        pl: "Nazwisko",
      },
      type: "text",
      required: true,
    },
  ],
};
