"use client";
import { useLocale } from "next-intl";

import { useCurrency } from "@/stores/Currency";
import { type Currency } from "@/stores/Currency/types";
import { formatPrice } from "@/utilities/formatPrices";

export const PriceClient = ({
  pricing,
}: {
  pricing: {
    value: number;
    currency: Currency | string;
  }[];
}) => {
  const { currency } = useCurrency();
  const locale = useLocale();
  const price =
    pricing.length > 0
      ? (pricing.find((price) => price.currency === currency)?.value ?? pricing[0].value)
      : 0;

  return <>{formatPrice(price, currency, locale)}</>;
};
