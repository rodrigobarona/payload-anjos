import { authenticated } from "@/access/authenticated";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";
import type { GlobalConfig } from "payload";
import { countryList } from "../utils/countryList";

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
      type: "tabs",
      tabs: [
        {
          label: {
            en: "Parcel lockers 24/7",
            pl: "Paczkomaty 24/7",
          },
          fields: [
            {
              name: "parcelLockers",
              type: "checkbox",
              label: {
                en: "Enable Parcel lockers",
                pl: "Włącz Paczkomaty 24/7",
              },
            },
            {
              name: "parcelLockerZones",
              type: "array",
              label: {
                en: "Delivery zones",
                pl: "Strefy dostaw",
              },
              labels: {
                plural: {
                  en: "Delivery zones",
                  pl: "Strefy dostaw",
                },
                singular: {
                  en: "Delivery zone",
                  pl: "Strefa dostaw",
                },
              },
              fields: [
                {
                  name: "countries",
                  type: "select",
                  label: {
                    en: "Countries",
                    pl: "Kraje",
                  },
                  hasMany: true,
                  options: countryList,
                  required: true,
                },
                {
                  name: "pricing",
                  type: "array",
                  label: {
                    en: "Pricing",
                    pl: "Cennik",
                  },
                  labels: {
                    plural: {
                      en: "Pricing",
                      pl: "Cennik",
                    },
                    singular: {
                      en: "Price",
                      pl: "Cena",
                    },
                  },
                  fields: [
                    {
                      name: "weightFrom",
                      type: "number",
                    },
                    {
                      name: "weightTo",
                      type: "number",
                    },
                  ],
                },
              ],
              admin: {
                condition: (data) => data.parcelLockers,
              },
            },
          ],
        },
        {
          label: {
            en: "InPost Courier",
            pl: "Kurier InPost",
          },
          fields: [
            {
              name: "courier",
              type: "checkbox",
              label: {
                en: "Enable InPost Courier",
                pl: "Włącz Kuriera InPost",
              },
            },
          ],
        },
        {
          label: {
            en: "API Keys",
            pl: "Klucze API",
          },
          fields: [
            {
              name: "clientId",
              type: "text",
              label: {
                en: "Client ID",
                pl: "ID Klienta",
              },
              access: {
                read: authenticated,
                create: authenticated,
                update: authenticated,
              },
              required: true,
              admin: {
                condition: (data) => data.parcelLockers || data.courier,
              },
            },
            {
              name: "APIUrl",
              type: "select",
              label: {
                en: "Environment",
                pl: "Środowisko",
              },
              access: {
                read: authenticated,
                create: authenticated,
                update: authenticated,
              },
              required: true,
              defaultValue: "https://api-shipx-pl.easypack24.net",
              options: [
                {
                  label: {
                    en: "Production",
                    pl: "Produkcja",
                  },
                  value: "https://api-shipx-pl.easypack24.net",
                },
                {
                  label: {
                    en: "Sandbox",
                    pl: "Sandbox",
                  },
                  value: "https://sandbox-api-shipx-pl.easypack24.net",
                },
              ],
              admin: {
                condition: (data) => data.parcelLockers || data.courier,
                description: {
                  en: "Remember to pass matching keys for choosen environment",
                  pl: "Pamiętaj o przekazaniu odpowiednich kluczy dla wybranego środowiska",
                },
              },
            },
            {
              name: "shipXAPIKey",
              type: "text",
              label: {
                en: "API ShipX key",
                pl: "Klucz API ShipX",
              },
              access: {
                read: authenticated,
                create: authenticated,
                update: authenticated,
              },
              required: true,
              admin: {
                condition: (data) => data.parcelLockers || data.courier,
              },
            },
            {
              name: "geowidgetToken",
              type: "text",
              label: {
                en: "Geowidget Token",
                pl: "Token Geowidget",
              },
              access: {
                read: () => true,
                create: authenticated,
                update: authenticated,
              },
              required: true,
              admin: {
                condition: (data) => data.parcelLockers || data.courier,
              },
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
