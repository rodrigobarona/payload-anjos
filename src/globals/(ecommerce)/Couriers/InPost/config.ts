import { authenticated } from "@/access/authenticated";
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
      type: "tabs",
      tabs: [
        {
          label: {
            en: "General",
            pl: "Ogólne",
          },
          fields: [
            {
              name: "enabled",
              type: "checkbox",
              label: {
                en: "Enable InPost",
                pl: "Włącz InPost",
              },
            },
            {
              name: "parcelLockers",
              type: "checkbox",
              label: {
                en: "Parcel lockers",
                pl: "Paczkomaty",
              },
              admin: {
                condition: (data) => data.enabled,
              },
            },
            {
              name: "courier",
              type: "checkbox",
              label: {
                en: "Courier",
                pl: "Kurier",
              },
              admin: {
                condition: (data) => data.enabled,
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
                condition: (data) => data.enabled,
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
                condition: (data) => data.enabled,
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
                condition: (data) => data.enabled,
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
                condition: (data) => data.enabled,
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
