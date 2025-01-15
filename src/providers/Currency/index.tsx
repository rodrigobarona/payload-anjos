"use client";

import { createContext, useCallback, useContext, useState } from "react";

import canUseDOM from "@/utilities/canUseDOM";

export interface ContextType {
  currency: Currency;
  setCurrency: (currency: Currency | null) => void;
}

const initialContext: ContextType = {
  currency: "PLN",
  setCurrency: () => null,
};

const CurrencyContext = createContext(initialContext);

export const CurrencyProvider = ({
  defaultCurrency,
  children,
}: {
  defaultCurrency: Currency;
  children: React.ReactNode;
}) => {
  const [currency, setCurrencyState] = useState<Currency>(
    canUseDOM ? ((window.localStorage.getItem("currency") as Currency) ?? defaultCurrency) : defaultCurrency,
  );

  const setCurrency = useCallback((currencyToSet: Currency) => {
    canUseDOM && window.localStorage.setItem("currency", currencyToSet);
    setCurrencyState(currencyToSet);
  }, []);

  return <CurrencyContext.Provider value={{ currency, setCurrency }}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = (): ContextType => useContext(CurrencyContext);
