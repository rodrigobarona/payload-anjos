"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCurrency } from "..";
import { currencyOptions } from "@/utilities/currencies";

export const CurrencySelector = () => {
  const { setCurrency, currency } = useCurrency();

  const onCurrencyChange = (currencyToSet: Currency) => {
    setCurrency(currencyToSet);
  };

  return (
    <Select onValueChange={onCurrencyChange} defaultValue={currency ?? ""}>
      <SelectTrigger
        aria-label="Select a currency"
        className="w-auto gap-2 border-none bg-transparent pl-0 md:pl-3"
      >
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        {currencyOptions.map((currencyOption) => (
          <SelectItem key={currencyOption.value} value={currencyOption.value}>
            {currencyOption.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
