import { CollectionConfig } from "payload";

export const Customers: CollectionConfig = {
  slug: "customers",
  access: {
    create: () => true,
  },
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
    },
    {
      name: "lastName",
      label: {
        en: "Last Name",
        pl: "Nazwisko",
      },
      type: "text",
    },
    {
      name: "birthDate",
      label: {
        en: "Birth Date",
        pl: "Data urodzenia",
      },
      type: "date",
    },
    {
      name: "lastBuyerType",
      label: {
        en: "Last Buyer Type",
        pl: "Ostatni typ kupującego",
      },
      type: "select",
      options: [
        { value: "individual", label: { en: "Individual", pl: "Osoba fizyczna" } },
        { value: "company", label: { en: "Company", pl: "Firma" } },
      ],
    },
    {
      name: "shippings",
      type: "array",
      label: {
        en: "Shipping adresses",
        pl: "Adresy dostaw",
      },
      labels: {
        singular: {
          en: "Shipping address",
          pl: "Adres dostawy",
        },
        plural: {
          en: "Shipping addresses",
          pl: "Adresy dostaw",
        },
      },
      fields: [
        {
          name: "address",
          type: "text",
          label: {
            en: "Address",
            pl: "Adres",
          },
          required: true,
        },
        {
          name: "city",
          type: "text",
          label: {
            en: "City",
            pl: "Miasto",
          },
          required: true,
        },
        {
          name: "country",
          type: "text",
          label: {
            en: "Country",
            pl: "Kraj",
          },
          required: true,
        },
        {
          name: "region",
          type: "text",
          label: {
            en: "Region",
            pl: "Region",
          },
          required: true,
        },
        {
          name: "postalCode",
          type: "text",
          label: {
            en: "Postal Code",
            pl: "Kod pocztowy",
          },
          required: true,
        },
        {
          name: "phone",
          type: "text",
          label: {
            en: "Phone",
            pl: "Telefon",
          },
          required: true,
        },
        {
          name: "email",
          type: "text",
          label: {
            en: "Email",
            pl: "Email",
          },
          required: true,
        },
        {
          name: "default",
          type: "checkbox",
          label: {
            en: "Default",
            pl: "Domyślny",
          },
          defaultValue: false,
        },
      ],
    },
    {
      name: "cart",
      type: "json",
      label: {
        en: "Cart",
        pl: "Koszyk",
      },
      admin: {
        // hidden: true,
      },
    },
  ],
};
