"use client";
import { useCurrency } from "@/providers/Currency";
import { formatPrice } from "@/utilities/formatPrices";
import { useLocale } from "next-intl";

const PriceClient = ({
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
  return <p className="text-sm font-medium text-gray-900">{formatPrice(price, currency, locale)}</p>;
};
export default PriceClient;
