"use client";
import { PriceClient } from "@/components/(ecommerce)/PriceClient";
import { Product } from "@/payload-types";
import { useProductContext } from "../context/ProductContext";

export const PriceWithContext = ({ product }: { product: Product }) => {
  const { selectedVariant } = useProductContext();
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
