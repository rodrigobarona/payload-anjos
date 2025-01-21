"use client";
import { useCurrency } from "@/stores/Currency";
import { Currency } from "@/stores/Currency/types";
import { formatPrice } from "@/utilities/formatPrices";
import { useLocale } from "next-intl";

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
