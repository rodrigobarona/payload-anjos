import { FilledProduct } from "./getFilledProducts";

type Total = Record<string, number>;

export const getTotal = (filledProducts: FilledProduct[]) => {
  const total = filledProducts.reduce<Total>((acc, product) => {
    if (!product) return acc;
    if (!product.enableVariantPrices) {
      product.pricing?.forEach((price) => {
        acc[price.currency] = (acc[price.currency] ?? 0) + price.value * product.quantity;
      });
    } else if (product.enableVariantPrices && product.enableVariants) {
      product.variant?.pricing?.forEach((price) => {
        acc[price.currency] = (acc[price.currency] ?? 0) + price.value * product.quantity;
      });
    }
    return acc;
  }, {});

  const totalFormatted =
    total &&
    Object.entries(total).map(([currency, value]) => ({
      currency,
      value: parseFloat(value.toFixed(2)),
    }));

  return totalFormatted;
};
