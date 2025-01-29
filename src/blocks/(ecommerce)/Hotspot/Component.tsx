import { getPayload } from "payload";

import RichText from "@/components/RichText";
import WithInlinePrice from "@/globals/(ecommerce)/Layout/ProductList/variants/listings/WithInlinePrice";
import { type HotspotBlock as HotspotBlockProps, type Product } from "@/payload-types";
import config from "@payload-config";

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
      });
      productsToShow = categoryProducts;
      break;
    case "subcategory":
      const { docs: subcategoryProducts } = await payload.find({
        collection: "products",
        depth: 2,
        where: {
          "categoriesArr.subcategories": {
            contains: typeof subcategory === "string" ? subcategory : subcategory?.id,
          },
        },
        limit: limit ?? 4,
      });
      productsToShow = subcategoryProducts;
  }

  return (
    <section className="container">
      {title && <RichText data={title} />}
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
        <WithInlinePrice products={productsToShow} locale="en" />
      </div>
    </section>
  );
};
