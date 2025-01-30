import Image from "next/image";
import { useTranslations } from "next-intl";
import { type ReactNode } from "react";

import { PriceClient } from "@/components/(ecommerce)/PriceClient";
import { Link } from "@/i18n/routing";
import { type Product } from "@/payload-types";
import { type Currency } from "@/stores/Currency/types";

const getPriceRange = (variants: Product["variants"], enableVariantPrices: boolean) => {
  if (!variants || !enableVariantPrices) return null;

  const allPrices = variants.flatMap((variant) => variant.pricing ?? []);

  const groupedPrices = allPrices.reduce(
    (acc, currentPrice) => {
      if (!acc[currentPrice.currency]) {
        acc[currentPrice.currency] = [];
      }

      // temporary, TODO: fix typings
      // eslint-disable-next-line
      acc[currentPrice.currency].push({
        ...currentPrice,
        id: currentPrice.id ?? undefined,
      });
      return acc;
    },
    {} as Record<Currency, { value: number; currency: Currency; id?: string }[]>,
  );

  const priceRanges: { value: number; currency: Currency; id?: string }[][] = [];
  const minPrices: { value: number; currency: Currency; id?: string }[] = [];
  const maxPrices: { value: number; currency: Currency; id?: string }[] = [];

  for (const currency in groupedPrices) {
    const prices = groupedPrices[currency as Currency];
    const sortedPrices = prices.sort((a, b) => a.value - b.value);

    const minPrice = sortedPrices[0];
    const maxPrice = sortedPrices[sortedPrices.length - 1];

    minPrices.push(minPrice);
    maxPrices.push(maxPrice);
  }

  priceRanges.push(minPrices);
  priceRanges.push(maxPrices);

  return priceRanges;
};

export const WithInlinePrice = ({ products }: { products: Product[] }) => {
  const t = useTranslations("ProductList");
  return (
    <>
      {products.map((product) => {
        if (typeof product.images[0] !== "string") {
          const priceRange = getPriceRange(product.variants, product.enableVariantPrices ?? false);

          let pricingComponent: ReactNode;

          if (priceRange?.length === 2) {
            pricingComponent = (
              <>
                <PriceClient pricing={priceRange[0]} />
                <span className="mx-1">-</span>
                <PriceClient pricing={priceRange[1]} />
              </>
            );
          } else if (priceRange?.length === 1) {
            pricingComponent = <PriceClient pricing={priceRange[0]} />;
          } else if (!product.enableVariantPrices && product.pricing) {
            pricingComponent = <PriceClient pricing={product.pricing} />;
          }

          return (
            <div key={product.id} className="group relative">
              <Image
                alt={product.images[0].alt}
                src={product.images[0].url ?? ""}
                width={product.images[0].width ?? 512}
                height={product.images[0].height ?? 512}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div className="w-3/5">
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.slug}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {product.enableVariants && product.variants
                      ? `${product.variants.length} ${product.variants.length > 1 ? t("variants-plural") : t("variants-singular")}`
                      : ""}
                  </p>
                </div>
                <p className="flex w-2/5 flex-wrap justify-end text-sm font-medium text-gray-900">
                  {pricingComponent}
                </p>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};
