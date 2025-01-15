"use client";
import { useCurrency } from "@/providers/Currency";
import { formatPrice } from "@/utilities/formatPrices";
import { useLocale } from "next-intl";

export const PriceClient = ({
  pricing,
}: {
  pricing: {
    value: number;
    currency: "USD" | "EUR" | "GBP" | "PLN";
    id?: string | null;
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
