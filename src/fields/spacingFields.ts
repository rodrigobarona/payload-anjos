import { Field } from "payload";

export const spacingFields: Field[] = [
  {
    name: "spacingBottom",
    label: "Spacing Bottom",
    type: "select",
    defaultValue: "medium",
    options: [
      {
        label: "None",
        value: "none",
      },
      {
        label: "Small",
        value: "small",
      },
      {
        label: "Medium",
        value: "medium",
      },
      {
        label: "Large",
        value: "large",
      },
    ],
  },
  {
    name: "spacingTop",
    label: "Spacing Top",
    type: "select",
    defaultValue: "medium",
    options: [
      {
        label: "None",
        value: "none",
      },
      {
        label: "Small",
        value: "small",
      },
      {
        label: "Medium",
        value: "medium",
      },
      {
        label: "Large",
        value: "large",
      },
    ],
  },
];
