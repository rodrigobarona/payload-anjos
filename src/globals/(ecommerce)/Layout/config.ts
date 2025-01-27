import { revalidateGlobal } from "@/hooks/revalidateGlobal";
import type { GlobalConfig } from "payload";

export const ShopLayout: GlobalConfig = {
  slug: "shopLayout",
  label: {
    en: "Shop Layout",
    pl: "Wygląd sklepu",
  },
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: "Shop settings",
      pl: "Ustawienia sklepu",
    },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: {
            en: "Product Details",
            pl: "Karta produktu",
          },
          name: "productDetails",
          fields: [
            {
              name: "type",
              type: "select",
              options: [
                {
                  label: {
                    en: "With image gallery and expandable details",
                    pl: "Z galerią zdjęć i rozszerzalnymi szczegółami",
                  },
                  value: "WithImageGalleryExpandableDetails",
                },
              ],
              label: {
                en: "Type of product card",
                pl: "Rodzaj karty produktu",
              },
              required: true,
              defaultValue: "WithImageGalleryExpandableDetails",
            },
            {
              name: "reviewsEnabled",
              type: "checkbox",
              label: {
                en: "Enable product reviews",
                pl: "Włącz opinie o produkcie",
              },
              defaultValue: true,
              required: true,
            },
          ],
        },
        {
          label: {
            en: "Product List",
            pl: "Lista produktów",
          },
          name: "productList",
          fields: [
            {
              name: "filters",
              type: "select",
              label: {
                en: "Filters",
                pl: "Filtry",
              },
              required: true,
              options: [
                {
                  label: {
                    en: "None",
                    pl: "Brak",
                  },
                  value: "none",
                },
                {
                  label: {
                    en: "With sidebar",
                    pl: "Z bocznym panelem",
                  },
                  value: "withSidebar",
                },
                {
                  label: {
                    en: "Sort only",
                    pl: "Tylko sortowanie",
                  },
                  value: "sortOnly",
                },
              ],
            },
          ],
        },
        {
          label: {
            en: "Cart",
            pl: "Koszyk",
          },
          name: "cart",
          fields: [
            {
              name: "type",
              type: "select",
              options: [
                {
                  label: {
                    en: "Slide-over",
                    pl: "Wysuwany",
                  },
                  value: "slideOver",
                },
              ],
              label: {
                en: "Basket type",
                pl: "Rodzaj koszyka",
              },
              defaultValue: "slideOver",
              required: true,
            },
          ],
        },
        {
          label: {
            en: "Checkout page",
            pl: "Strona checkout",
          },
          name: "checkout",
          fields: [
            {
              name: "type",
              type: "select",
              options: [
                {
                  label: {
                    en: "One Step With Summary",
                    pl: "Jeden krok z podsumowaniem",
                  },
                  value: "OneStepWithSummary",
                },
              ],
              label: {
                en: "Type of checkout page",
                pl: "Rodzaj strony checkout",
              },
              required: true,
              defaultValue: "OneStepWithSummary",
            },
          ],
        },
        {
          label: {
            en: "Client panel",
            pl: "Panel klienta",
          },
          name: "clientPanel",
          fields: [
            {
              name: "type",
              type: "select",
              options: [
                {
                  label: {
                    en: "With sidebar",
                    pl: "Z bocznym panelem",
                  },
                  value: "withSidebar",
                },
              ],
              label: {
                en: "Type of client panel",
                pl: "Rodzaj panelu klienta",
              },
              required: true,
              defaultValue: "withSidebar",
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
