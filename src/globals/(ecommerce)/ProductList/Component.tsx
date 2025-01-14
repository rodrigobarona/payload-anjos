import { Product, ProductCategory } from "@/payload-types";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/config";
import WithInlinePrice from "./variants/WithInlinePrice";

export const ProductListing = ({ products }: { products: Product[] }) => {
  console.log(products);
  const locale = useLocale() as Locale;
  return <WithInlinePrice products={products} locale={locale} />;
};
