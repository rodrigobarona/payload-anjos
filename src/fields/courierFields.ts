import { Field } from "payload";
import { courierSettingsFields } from "./courierSettingsFields";
import { countryPickerField } from "./countryPickerField";
import { freeShippingField } from "./freeShippingField";
import { weightRangesField } from "./weightRangesField";

export const courierFields: Field[] = [
  {
    name: "enabled",
    type: "checkbox",
    label: {
      en: "Enable this courier",
      pl: "Włącz tego kuriera",
    },
  },
  {
    name: "settings",
    label: {
      en: "Settings",
      pl: "Ustawienia",
    },
    type: "group",

    fields: courierSettingsFields,
  },
  {
    name: "deliveryZones",
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

    fields: [countryPickerField, freeShippingField, weightRangesField],
    admin: {
      components: {
        RowLabel: "@/components/(ecommerce)/RowLabels/DeliveryZonesRowLabel#DeliveryZonesRowLabel",
      },
    },
  },
  {
    name: "icon",
    type: "upload",
    label: {
      en: "Icon",
      pl: "Ikona",
    },
    relationTo: "media",
    admin: {
      condition: (data) => data.enabled,
    },
  },
];
