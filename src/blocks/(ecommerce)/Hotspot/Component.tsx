/* eslint-disable */
// only temporary for now TODO: remove it
import { getPayload } from "payload";

import RichText from "@/components/RichText";
import { WithInlinePrice } from "@/globals/(ecommerce)/Layout/ProductList/variants/listings/WithInlinePrice";
import { type HotspotBlock as HotspotBlockProps, type Product } from "@/payload-types";
import config from "@payload-config";
import { ReactNode } from "react";
import { cn } from "@/utilities/cn";
import {
  paddingBottomClasses,
  paddingTopClasses,
  spacingBottomClasses,
  spacingTopClasses,
} from "@/blocks/globals";

export const HotspotBlock = async ({
  appearance,
  type,
  category,
  limit,
  paddingBottom,
  paddingTop,
  spacingBottom,
  spacingTop,
  subcategory,
  title,
  sort,
  products,
}: HotspotBlockProps) => {
  const payload = await getPayload({ config });

  let productsToShow: Product[] = [];

  console.log(products);

  switch (type) {
    case "category":
      const { docs: categoryProducts } = await payload.find({
        collection: "products",
        depth: 2,
        where: {
          "categoriesArr.category": {
            equals: typeof category === "string" ? category : category?.id,
          },
        },
        limit: limit ?? 4,
        sort: sort?.split(",") ?? ["-bought"],
      });
      productsToShow = categoryProducts;
      break;
    case "subcategory":
      const { docs: subcategoryProducts } = await payload.find({
        collection: "products",
        depth: 2,
        where: {
          "categoriesArr.subcategories": {
            exists: typeof subcategory === "string" ? subcategory : subcategory?.id,
          },
        },
        limit: limit ?? 4,
        sort: sort?.split(",") ?? ["-bought"],
      });
      productsToShow = subcategoryProducts;
    case "manual":
      productsToShow = products && products.every((product) => typeof product !== "string") ? products : [];
      break;
  }
  console.log(type);
  console.log(productsToShow);

  let HotspotComponent: ReactNode | null = null;

  switch (appearance) {
    case "default": {
      HotspotComponent = <WithInlinePrice products={productsToShow} />;
      break;
    }
  }

  return (
    <section
      className={cn(
        "container",
        spacingTopClasses[spacingTop ?? "medium"],
        spacingBottomClasses[spacingBottom ?? "medium"],
        paddingTopClasses[paddingTop ?? "medium"],
        paddingBottomClasses[paddingBottom ?? "medium"],
      )}
    >
      {title && <RichText data={title} />}
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
        {HotspotComponent}
      </div>
    </section>
  );
};
