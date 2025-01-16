"use client";
import { PriceClient } from "@/components/(ecommerce)/PriceClient";
import { Product } from "@/payload-types";
import { FilledVariant } from "../../../types";

export const PriceWithContext = ({
  product,
  selectedVariant,
}: {
  product: Product;
  selectedVariant?: FilledVariant;
}) => {
  return (
    <PriceClient
      pricing={
        (product.enableVariants && product.enableVariantPrices && product.variants && selectedVariant
          ? selectedVariant.pricing
          : product.pricing) ?? []
      }
    />
  );
};
