import type { NestedKeysStripped } from "@payloadcms/translations";

export const customTranslationsObject = {
  en: {
    custom: {
      resetPassword: "Reset password (enter email in form)",
      resetPasswordSuccess: "Password reset link sent to email",
      resetPasswordError: "Error resetting password",
    },
  },
  pl: {
    custom: {
      resetPassword: "Resetuj hasło (wpisz e-mail w formularzu)",
      resetPasswordSuccess: "Link do resetowania hasła został wysłany na podany adres e-mail",
      resetPasswordError: "Błąd resetowania hasła",
    },
  },
};

export type CustomTranslationsObject = typeof customTranslationsObject.en;
export type CustomTranslationsKeys = NestedKeysStripped<CustomTranslationsObject>;
