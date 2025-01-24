import { Product, ProductCategory, ProductSubCategory } from "@/payload-types";
import { Locale } from "@/i18n/config";
import WithInlinePrice from "./variants/listings/WithInlinePrice";
import { getLocale } from "next-intl/server";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { WithSidebar } from "./variants/filters/WithSidebar/WithSidebar";

import None from "./variants/filters/None";
import { notFound } from "next/navigation";
import { ListingBreadcrumbs } from "@/components/(ecommerce)/ListingBreadcrumbs";
import config from "@payload-config";
import { getPayload } from "payload";

export const ProductList = async ({
  filteredProducts,
  title,
  category,
  subcategory,
  searchParams,
}: {
  filteredProducts: Product[];
  title: string;
  category?: ProductCategory;
  subcategory?: ProductSubCategory;
  searchParams: {
    size: string[];
    color: string[];
    sortBy: string;
  };
}) => {
  try {
    const locale = (await getLocale()) as Locale;
    const { productList } = await getCachedGlobal("shopLayout", locale, 1)();

    let ProductDetailsComponent: typeof WithSidebar | typeof None = None;
    switch (productList.filters) {
      case "withSidebar":
        ProductDetailsComponent = WithSidebar;
        break;
      default:
        ProductDetailsComponent = None;
    }

    const payload = await getPayload({ config });

    const { docs: allProducts } = await payload.find({
      collection: "products",
      depth: 2,
      locale,
      where: {
        or: [
          {
            "categoriesArr.category": {
              equals: category?.id,
            },
          },
          {
            "categoriesArr.subcategories": {
              equals: subcategory?.id,
            },
          },
        ],
      },
    });

    return (
      <div>
        {category && <ListingBreadcrumbs category={category} />}
        {subcategory && typeof subcategory.category !== "string" && (
          <ListingBreadcrumbs category={subcategory.category} subcategory={subcategory} />
        )}
        <ProductDetailsComponent
          products={allProducts}
          title={title}
          category={category}
          searchParams={searchParams}
        >
          <WithInlinePrice products={filteredProducts} locale={locale} />
        </ProductDetailsComponent>
      </div>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
};
