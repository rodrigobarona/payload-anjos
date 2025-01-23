import { countryList } from "@/globals/(ecommerce)/Couriers/utils/countryList";
import { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "id",
    group: {
      en: "Orders",
      pl: "Zamówienia",
    },
  },
  labels: {
    singular: {
      en: "Order",
      pl: "Zamówienie",
    },
    plural: {
      en: "Orders",
      pl: "Zamówienia",
    },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "General",
            pl: "Ogólne",
          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "customer",
                  type: "relationship",
                  relationTo: "customers",
                  label: {
                    en: "Customer",
                    pl: "Klient",
                  },
                },
                {
                  name: "date",
                  label: {
                    en: "Order Date",
                    pl: "Data zamówienia",
                  },
                  type: "date",
                  admin: {
                    date: {
                      pickerAppearance: "dayAndTime",
                    },
                    readOnly: true,
                  },
                },
              ],
            },
            {
              name: "extractedFromStock",
              type: "checkbox",
              admin: {
                hidden: true,
                readOnly: true,
              },
            },
            {
              name: "products",
              type: "array",
              label: { en: "Products", pl: "Produkty" },
              admin: {
                components: {
                  RowLabel: "@/components/(ecommerce)/RowLabels/OrderProductsRowLabel#OrderProductsRowLabel",
                },
              },
              fields: [
                {
                  name: "product",
                  type: "relationship",
                  relationTo: "products",
                },
                {
                  name: "productName",
                  type: "text",
                  admin: {
                    hidden: true,
                  },
                },
                {
                  name: "hasVariant",
                  type: "checkbox",
                  admin: {
                    hidden: true,
                  },
                },
                {
                  type: "row",
                  admin: {
                    condition: (_, siblingData) => siblingData.hasVariant,
                  },
                  fields: [
                    {
                      name: "color",
                      type: "text",
                      label: {
                        en: "Color",
                        pl: "Kolor",
                      },
                      admin: {
                        readOnly: true,
                      },
                    },
                    {
                      name: "size",
                      type: "text",
                      label: {
                        en: "Size",
                        pl: "Rozmiar",
                      },
                      admin: {
                        readOnly: true,
                      },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "variantSlug",
                      type: "text",
                      label: {
                        en: "Variant Slug",
                        pl: "Wariant",
                      },
                      admin: {
                        readOnly: true,
                        condition: (_, siblingData) => siblingData.hasVariant,
                      },
                    },
                    {
                      name: "quantity",
                      type: "number",
                      label: {
                        en: "Quantity",
                        pl: "Ilość",
                      },
                      admin: {
                        readOnly: true,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: {
            en: "Invoice",
            pl: "Dokument sprzedaży",
          },
          fields: [
            {
              name: "invoice",
              label: { en: "Invoice data", pl: "Dane do faktury" },
              type: "group",
              fields: [
                {
                  name: "isCompany",
                  type: "checkbox",
                  label: {
                    en: "Company",
                    pl: "Firma",
                  },
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  name: "name",
                  type: "text",
                  label: {
                    en: "Name",
                    pl: "Nazwa",
                  },
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  name: "tin",
                  type: "text",
                  label: {
                    en: "TIN",
                    pl: "NIP",
                  },
                  admin: {
                    readOnly: true,
                    condition: (_, siblingData) => siblingData.isCompany,
                  },
                },
                {
                  name: "address",
                  type: "text",
                  label: {
                    en: "Address",
                    pl: "Adres",
                  },
                  admin: {
                    readOnly: true,
                  },
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "city",
                      type: "text",
                      label: {
                        en: "City",
                        pl: "Miasto",
                      },
                      admin: {
                        width: "50%",
                        readOnly: true,
                      },
                    },
                    {
                      name: "country",
                      type: "select",
                      label: {
                        en: "Country",
                        pl: "Kraj",
                      },
                      options: [...countryList],
                      admin: {
                        width: "50%",
                        readOnly: true,
                      },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "region",
                      type: "text",
                      label: {
                        en: "Region",
                        pl: "Region",
                      },
                      admin: {
                        width: "50%",
                        readOnly: true,
                      },
                    },
                    {
                      name: "postalCode",
                      type: "text",
                      label: {
                        en: "Postal Code",
                        pl: "Kod pocztowy",
                      },
                      admin: {
                        width: "50%",
                        readOnly: true,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: {
            en: "Shipping",
            pl: "Dostawa",
          },
          fields: [
            {
              name: "printLabel",
              label: { en: "Printing Labels", pl: "Drukowanie etykiet" },
              type: "group",
              fields: [
                {
                  name: "packageNumber",
                  type: "text",
                  admin: {
                    readOnly: true,
                    hidden: true,
                  },
                },
                {
                  name: "printLabelButton",
                  type: "ui",
                  admin: {
                    components: {
                      Field: "@/collections/(ecommerce)/Orders/components/PrintLabelButton#PrintLabelButton",
                    },
                  },
                },
              ],
            },
            {
              name: "shippingAddress",
              type: "group",
              label: {
                en: "Shipping Address",
                pl: "Adres dostawy",
              },
              fields: [
                {
                  name: "name",
                  type: "text",
                  label: {
                    en: "Name",
                    pl: "Nazwa",
                  },
                  admin: {
                    readOnly: true,
                  },
                  required: true,
                },
                {
                  name: "address",
                  type: "text",
                  label: {
                    en: "Address",
                    pl: "Adres",
                  },
                  admin: {
                    readOnly: true,
                  },
                  required: true,
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "pickupPointID",
                      type: "text",
                      label: {
                        en: "Pickup point ID",
                        pl: "ID punktu odbioru",
                      },
                      admin: {
                        width: "50%",
                        readOnly: true,
                        condition: (data) => data.orderDetails.shipping === "inpost-pickup",
                      },
                    },
                    {
                      name: "pickupPointAddress",
                      type: "text",
                      label: {
                        en: "Pickup point address",
                        pl: "Adres punktu odbioru",
                      },
                      admin: {
                        width: "50%",
                        readOnly: true,
                        condition: (data) => data.orderDetails.shipping === "inpost-pickup",
                      },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "city",
                      type: "text",
                      label: {
                        en: "City",
                        pl: "Miasto",
                      },
                      admin: {
                        width: "50%",
                        readOnly: true,
                      },
                      required: true,
                    },
                    {
                      name: "country",
                      type: "select",
                      label: {
                        en: "Country",
                        pl: "Kraj",
                      },
                      options: [...countryList],
                      admin: {
                        width: "50%",
                        readOnly: true,
                      },
                      required: true,
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "region",
                      type: "text",
                      label: {
                        en: "Region",
                        pl: "Region",
                      },
                      admin: {
                        width: "50%",
                        readOnly: true,
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
                      admin: {
                        width: "50%",
                        readOnly: true,
                      },
                      required: true,
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "email",
                      type: "text",
                      label: {
                        en: "Email",
                        pl: "Email",
                      },
                      admin: {
                        width: "50%",
                        readOnly: true,
                      },
                      required: true,
                    },
                    {
                      name: "phone",
                      type: "text",
                      label: {
                        en: "Phone number",
                        pl: "Numer telefonu",
                      },
                      admin: {
                        width: "50%",
                        readOnly: true,
                      },
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "orderDetails",
      label: {
        en: "Order Details",
        pl: "Szczegóły zamówienia",
      },
      type: "group",
      admin: {
        position: "sidebar",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "total",
              type: "number",
              label: {
                en: "Total (without shipping)",
                pl: "Suma (bez kosztów dostawy)",
              },
              admin: {
                readOnly: true,
              },
            },
            {
              name: "currency",
              label: {
                en: "Currency",
                pl: "Waluta",
              },
              type: "text",
              admin: {
                readOnly: true,
              },
            },
          ],
        },
        {
          name: "shippingCost",
          type: "number",
          label: {
            en: "Shipping Cost",
            pl: "Koszt dostawy",
          },
          admin: {
            readOnly: true,
          },
        },
        {
          name: "shipping",
          type: "text",
          label: {
            en: "Choosen Shipping Method",
            pl: "Wybrana metoda dostawy",
          },
          admin: {
            readOnly: true,
          },
        },
        {
          name: "transactionID",
          type: "text",
          label: {
            en: "Transaction ID",
            pl: "ID transakcji",
          },
          admin: {
            readOnly: true,
          },
        },
        {
          name: "status",
          type: "select",
          label: {
            en: "Status",
            pl: "Status",
          },
          options: [
            {
              label: {
                en: "Pending",
                pl: "Oczekujące",
              },
              value: "pending",
            },
            {
              label: {
                en: "Paid",
                pl: "Opłacone",
              },
              value: "paid",
            },
            {
              label: {
                en: "Processing",
                pl: "W trakcie realizacji",
              },
              value: "processing",
            },
            {
              label: {
                en: "Shipped",
                pl: "Wysłane",
              },
              value: "shipped",
            },
            {
              label: {
                en: "Completed",
                pl: "Zakończone",
              },
              value: "completed",
            },
            {
              label: {
                en: "Cancelled",
                pl: "Anulowane",
              },
              value: "cancelled",
            },
            {
              label: {
                en: "Returned",
                pl: "Zwrócone",
              },
              value: "returned",
            },
          ],
        },
        {
          name: "shippingDate",
          label: {
            en: "Shipping Date",
            pl: "Data wysyłki",
          },
          type: "date",
        },
        {
          name: "trackingNumber",
          label: {
            en: "Tracking Number",
            pl: "Numer przesyłki",
          },
          admin: {
            readOnly: true,
          },
          type: "text",
        },
        {
          name: "orderNote",
          label: {
            en: "Order Note",
            pl: "Notatka do zamówienia",
          },
          type: "textarea",
        },
      ],
    },
  ],
};
