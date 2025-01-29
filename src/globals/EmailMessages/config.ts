import { authenticated } from "@/access/authenticated";
import { revalidateGlobal } from "@/hooks/revalidateGlobal";
import { GlobalConfig } from "payload";

export const EmailMessages: GlobalConfig = {
  slug: "emailMessages",
  label: {
    en: "Email Messages",
    pl: "Wiadomości e-mail",
  },
  access: {
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: "host",
      type: "text",
      required: true,
      label: {
        en: "Host",
        pl: "Host",
      },
    },
    {
      name: "port",
      type: "number",
      required: true,
      label: {
        en: "SMTP Port",
        pl: "Port SMTP",
      },
    },
    {
      name: "secure",
      type: "checkbox",
      label: {
        en: "Secure",
        pl: "Bezpieczne",
      },
      required: true,
      defaultValue: false,
    },
    {
      name: "user",
      type: "text",
      required: true,
      label: {
        en: "User",
        pl: "Użytkownik",
      },
    },
    {
      name: "password",
      type: "text",
      required: true,
      label: {
        en: "Password",
        pl: "Hasło",
      },
    },
    {
      name: "fromEmail",
      type: "text",
      required: true,
      label: {
        en: "From Email",
        pl: "Z adresu e-mail",
      },
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal],
  },
};
