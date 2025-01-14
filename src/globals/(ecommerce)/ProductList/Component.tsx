import { Product, ProductCategory, ProductSubCategory } from "@/payload-types";
import { Locale } from "@/i18n/config";
import WithInlinePrice from "./variants/listings/WithInlinePrice";
import { getLocale } from "next-intl/server";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { WithSidebar } from "./variants/filters/WithSidebar";

import None from "./variants/filters/None";
import { notFound } from "next/navigation";
import { ListingBreadcrumbs } from "@/components/(ecommerce)/ListingBreadcrumbs";

export const ProductList = async ({
  products,
  title,
  category,
  subcategory,
}: {
  products: Product[];
  title: string;
  category?: ProductCategory;
  subcategory?: ProductSubCategory;
}) => {
  try {
    const locale = (await getLocale()) as Locale;
    const productListData = await getCachedGlobal("productList", locale, 1)();

    let ProductDetailsComponent: typeof WithSidebar | typeof None = None;
    switch (productListData.filters) {
      case "withSidebar":
        ProductDetailsComponent = WithSidebar;
        break;
      default:
        ProductDetailsComponent = None;
    }

    const productColors = products.map((product) => product.colors);
    const productSizes = products.map((product) => product.sizes);

    return (
      <div>
        {category && <ListingBreadcrumbs category={category} />}
        {subcategory && typeof subcategory.category !== "string" && (
          <ListingBreadcrumbs category={subcategory.category} subcategory={subcategory} />
        )}
        <ProductDetailsComponent title={title} category={category}>
          <WithInlinePrice products={products} locale={locale} />
        </ProductDetailsComponent>
      </div>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
};
