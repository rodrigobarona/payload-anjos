"use client";
import { create } from "zustand";
import canUseDOM from "@/utilities/canUseDOM";
import { Currency } from "./types";
import { useEffect, useState } from "react";

interface CurrencyState {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const useCurrencyStore = create<CurrencyState>((set) => ({
  currency: "USD",
  setCurrency: (currencyToSet: Currency) => {
    if (canUseDOM) {
      window.localStorage.setItem("currency", currencyToSet);
    }
    set({ currency: currencyToSet });
  },
}));

export const useCurrency = () => {
  const { currency, setCurrency } = useCurrencyStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const storedCurrency = window.localStorage.getItem("currency") as Currency | null;
      if (storedCurrency) {
        setCurrency(storedCurrency);
      }
    }
  }, [isClient, setCurrency]);

  return { currency, setCurrency };
};
