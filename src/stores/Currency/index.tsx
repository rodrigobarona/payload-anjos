"use client";
import { create } from "zustand";
import canUseDOM from "@/utilities/canUseDOM";
import { Currency } from "./types";
import { useEffect } from "react";

interface CurrencyState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const useCurrencyStore = create<CurrencyState>((set) => ({
  currency: "PLN",
  setCurrency: (currencyToSet: Currency) => {
    if (canUseDOM) {
      window.localStorage.setItem("currency", currencyToSet);
    }
    set({ currency: currencyToSet });
  },
}));

export const useCurrency = (defaultCurrency?: Currency) => {
  const { currency, setCurrency } = useCurrencyStore();

  useEffect(() => {
    if (canUseDOM) {
      const storedCurrency = window.localStorage.getItem("currency") as Currency | null;
      setCurrency(storedCurrency ?? defaultCurrency ?? "PLN");
    }
  }, [defaultCurrency, setCurrency]);

  return { currency, setCurrency };
};
