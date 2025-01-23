import type { DefaultTranslationKeys, NestedKeysStripped, TFunction } from "@payloadcms/translations";

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
    },
  },
};

export type CustomTranslationsObject = typeof customTranslationsObject.en;
export type CustomTranslationsKeys = NestedKeysStripped<CustomTranslationsObject>;
