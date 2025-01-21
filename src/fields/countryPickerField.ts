import { countryList } from "@/globals/(ecommerce)/Couriers/utils/countryList";
import { Field } from "payload";

export const countryPickerField: Field = {
  name: "countries",
  type: "select",
  label: {
    en: "Countries",
    pl: "Kraje",
  },
  hasMany: true,
  options: [...countryList],
  required: true,
};
