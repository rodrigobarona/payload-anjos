import type { CollectionConfig } from "payload";

import { authenticated } from "@/access/authenticated";
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished";
import { defaultLexical } from "@/fields/defaultLexical";
import { slugField } from "@/fields/slug";

const currencyOptions = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "PLN", label: "PLN" },
];

export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: {
      en: "Product",
      pl: "Produkt",
    },
    plural: {
      en: "Products",
      pl: "Produkty",
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: {
        en: "Product name",
        pl: "Nazwa produktu",
      },
      type: "text",
      localized: true,
      required: true,
    },
    ...slugField(),
    {
      type: "tabs",
      tabs: [
        {
          name: "content",
          label: {
            en: "Content",
            pl: "Zawartość",
          },
          fields: [
            {
              name: "description",
              label: {
                en: "Product description",
                pl: "Opis produktu",
              },
              localized: true,
              type: "richText",
              editor: defaultLexical,
            },
            {
              name: "images",
              label: {
                en: "Product images",
                pl: "Zdjęcia produktu",
              },
              type: "upload",
              relationTo: "media",
              hasMany: true,
              maxRows: 10,
              minRows: 1,
              required: true,
            },
            {
              name: "details",
              type: "array",
              label: {
                en: "Details",
                pl: "Szczegóły",
              },
              labels: {
                singular: {
                  en: "Detail",
                  pl: "Szczegół",
                },
                plural: {
                  en: "Details",
                  pl: "Szczegóły",
                },
              },
              fields: [
                {
                  name: "title",
                  label: {
                    en: "Title",
                    pl: "Tytuł",
                  },
                  type: "text",
                  required: true,
                },
                {
                  name: "content",
                  label: {
                    en: "Content",
                    pl: "Zawartość",
                  },
                  required: true,
                  type: "richText",
                  editor: defaultLexical,
                },
              ],
            },
          ],
        },
        {
          name: "variantsOptions",
          label: {
            en: "Variants options",
            pl: "Opcje wariantów",
          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "enableVariants",
                  label: {
                    en: "Enable variants",
                    pl: "Włącz warianty",
                  },
                  type: "checkbox",
                  admin: {
                    width: "fit-content",
                  },
                },
                {
                  name: "enableVariantPrices",
                  label: {
                    en: "Variants have different prices",
                    pl: "Warianty mają różne ceny",
                  },

                  type: "checkbox",
                  admin: {
                    description: {
                      en: "If false, price is in Product Details",
                      pl: "Jeśli fałsz, cena jest w Szczegółach produktu",
                    },
                    width: "fit-content",
                    style: {
                      marginLeft: "2rem",
                    },
                  },
                },
                {
                  name: "enableVariantWeights",
                  label: {
                    en: "Variants have different weights",
                    pl: "Warianty mają różne wagi",
                  },

                  type: "checkbox",
                  admin: {
                    description: {
                      en: "If false, weight is in Product Details",
                      pl: "Jeśli fałsz, waga jest w Szczegółach produktu",
                    },
                    width: "fit-content",
                    style: {
                      marginLeft: "2rem",
                    },
                  },
                },
              ],
            },
            {
              name: "variantsGroup",
              type: "group",
              label: false,
              admin: {
                condition: (_, siblingData) => siblingData.enableVariants,
                style: {
                  marginTop: "0",
                },
              },
              fields: [
                {
                  name: "options",
                  labels: {
                    singular: {
                      en: "Option",
                      pl: "Opcja",
                    },
                    plural: {
                      en: "Options",
                      pl: "Opcje",
                    },
                  },
                  type: "array",
                  admin: {
                    // components: {
                    // RowLabel: '@/collections/Products/ui/RowLabels/KeyLabel#KeyLabel',
                    // },
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "label",
                          label: {
                            en: "Option name",
                            pl: "Nazwa opcji",
                          },
                          type: "text",
                          localized: true,
                          required: true,
                        },
                        {
                          name: "slug",
                          type: "text",
                          required: true,
                        },
                      ],
                    },
                    {
                      name: "values",
                      label: {
                        en: "Values",
                        pl: "Wartości",
                      },
                      labels: {
                        singular: {
                          en: "Value",
                          pl: "Wartość",
                        },
                        plural: {
                          en: "Values",
                          pl: "Wartości",
                        },
                      },
                      type: "array",
                      admin: {
                        // components: {
                        //   RowLabel: '@/collections/Products/ui/RowLabels/OptionLabel#OptionLabel',
                        // },
                        initCollapsed: true,
                      },
                      fields: [
                        {
                          type: "row",
                          fields: [
                            {
                              name: "label",
                              type: "text",
                              label: {
                                en: "Option value",
                                pl: "Wartość opcji",
                              },
                              localized: true,
                              required: true,
                            },
                            {
                              name: "slug",
                              type: "text",
                              required: true,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  label: {
                    en: "Variant options",
                    pl: "Opcje wariantów",
                  },
                  minRows: 1,
                },
                {
                  name: "variants",
                  type: "array",
                  admin: {
                    // components: {
                    //   RowLabel: "@/collections/Products/ui/RowLabels/VariantLabel#VariantLabel",
                    // },
                    condition: (_, siblingData) => {
                      return Boolean(siblingData?.options?.length);
                    },
                  },
                  fields: [
                    {
                      name: "options",
                      type: "text",
                      admin: {
                        // components: {
                        //   Field: "@/collections/Products/ui/VariantSelect#VariantSelect",
                        // },
                      },
                      hasMany: true,
                      required: true,
                    },
                    {
                      name: "images",
                      type: "upload",
                      relationTo: "media",
                      hasMany: true,
                    },
                    {
                      name: "stock",
                      type: "number",
                      admin: {
                        description: {
                          en: "Define stock for this variant. A stock of 0 disables checkout for this variant.",
                          pl: "Zdefiniuj stan magazynowy dla tego wariantu. Stan magazynowy 0 wyłącza możliwość zakupu tego wariantu.",
                        },
                      },
                      defaultValue: 0,
                      required: true,
                    },
                    {
                      name: "weight",
                      label: {
                        en: "Weight (g)",
                        pl: "Waga (g)",
                      },
                      type: "number",
                      admin: {
                        condition: (data) => data.variantsOptions.enableVariantWeights,
                        description: {
                          en: "Define weight for this variant.",
                          pl: "Zdefiniuj wagę dla tego wariantu.",
                        },
                      },
                      defaultValue: 0,
                      required: true,
                    },
                    {
                      name: "pricing",
                      type: "array",
                      label: {
                        en: "Pricing",
                        pl: "Cennik",
                      },
                      minRows: 1,
                      required: true,
                      labels: {
                        singular: {
                          en: "Price",
                          pl: "Cena",
                        },
                        plural: {
                          en: "Prices",
                          pl: "Ceny",
                        },
                      },
                      admin: {
                        condition: (data) => data.variantsOptions.enableVariantPrices,
                      },
                      fields: [
                        {
                          type: "row",
                          fields: [
                            {
                              name: "value",
                              type: "number",
                              label: {
                                en: "Price",
                                pl: "Cena",
                              },
                              required: true,
                            },
                            {
                              name: "currency",
                              type: "select",
                              required: true,
                              options: currencyOptions,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  minRows: 1,
                },
              ],
            },
          ],
        },
        {
          name: "productDetails",
          label: {
            en: "Product details",
            pl: "Szczegóły produktu",
          },
          admin: {
            // todo: not working condition
            // condition: (data) => {
            //   return !data.variantsOptions.enableVariants && !data.variantsOptions.enableVariantPrices;
            // },
          },
          fields: [
            {
              name: "stock",
              label: {
                en: "Stock",
                pl: "Stan magazynowy",
              },
              type: "number",
              admin: {
                condition: (data) => !data.variantsOptions.enableVariants,
                description: {
                  en: "Define stock for whole product. A stock of 0 disables checkout for this product.",
                  pl: "Zdefiniuj stan magazynowy dla całego produktu. Stan magazynowy 0 wyłącza możliwość zakupu tego produktu.",
                },
              },
              defaultValue: 0,
              required: true,
            },
            {
              name: "weight",
              label: {
                en: "Weight (g)",
                pl: "Waga (g)",
              },
              type: "number",
              admin: {
                condition: (data) => !data.variantsOptions.enableVariantWeights,
                description: {
                  en: "Define weight for whole product.",
                  pl: "Zdefiniuj wagę dla całego produktu.",
                },
              },
              defaultValue: 0,
              required: true,
            },
            {
              name: "pricing",
              type: "array",
              label: {
                en: "Pricing",
                pl: "Cennik",
              },
              minRows: 1,
              required: true,
              labels: {
                singular: {
                  en: "Price",
                  pl: "Cena",
                },
                plural: {
                  en: "Prices",
                  pl: "Ceny",
                },
              },
              admin: {
                condition: (data) => !data.variantsOptions.enableVariantPrices,
              },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "value",
                      type: "number",
                      label: {
                        en: "Price",
                        pl: "Cena",
                      },
                      required: true,
                    },
                    {
                      name: "currency",
                      type: "select",
                      required: true,
                      options: currencyOptions,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
