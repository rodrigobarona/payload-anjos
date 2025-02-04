import type { NestedKeysStripped } from "@payloadcms/translations";

export const customTranslationsObject = {
  en: {
    custom: {
      inPostMessage:
        "InPost charges fees for generating shipments. Check your balance, customer data and dimensions before creating a shipment.",
      generating: "Generating...",
      downloadLabel: "Download label",
      downloadingLabel: "Downloading...",
      createPackage: "Create package",
      resetPackage: "Reset package",
      resetPassword: "Reset password (enter email in form)",
      resetPasswordSuccess: "Password reset link sent to email",
      resetPasswordError: "Error resetting password",
    },
    adminDashboard: {
      linkTitle: "Dashboard",
      searchNoResults: "No results",
      search: "Search collections...",
      addProduct: "Add product",
    },
  },
  pl: {
    custom: {
      inPostMessage:
        "InPost nalicza opłaty za generowanie przesyłek. Sprawdź swoje saldo, dane klienta i gabaryt przed utworzeniem przesyłki.",
      generating: "Generowanie...",
      downloadLabel: "Pobierz etykietę",
      downloadingLabel: "Pobieranie...",
      createPackage: "Utwórz przesyłkę",
      resetPackage: "Resetuj przesyłkę",
      resetPassword: "Resetuj hasło (wpisz e-mail w formularzu)",
      resetPasswordSuccess: "Link do resetowania hasła został wysłany na podany adres e-mail",
      resetPasswordError: "Błąd resetowania hasła",
    },
    adminDashboard: {
      linkTitle: "Panel",
      searchNoResults: "Brak wyników",
      search: "Szukaj w kolekcjach...",
      addProduct: "Dodaj produkt",
    },
  },
};

export type CustomTranslationsObject = typeof customTranslationsObject.en;
export type CustomTranslationsKeys = NestedKeysStripped<CustomTranslationsObject>;
