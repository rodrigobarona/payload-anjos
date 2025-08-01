import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPayload } from "payload";

import { WithInlinePrice } from "@/globals/(ecommerce)/Layout/ProductList/variants/listings/WithInlinePrice";
import { routing } from "@/i18n/routing";
import config from "@payload-config";

// Search pages are inherently dynamic due to search parameters
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const SearchPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ search: string }>;
}) => {
  const { locale } = await params;
  const { search } = await searchParams;

  // Enable static rendering
  setRequestLocale(locale);

  const payload = await getPayload({ config });
  // TODO: pagination for more products
  const { docs: products } = search
    ? await payload.find({
        collection: "products",
        where: {
          or: [
            {
              title: {
                contains: search,
              },
            },
            {
              slug: {
                contains: search,
              },
            },
          ],
        },
        pagination: false,
      })
    : { docs: [] };

  const t = await getTranslations("Search");

  return (
    <main className="container">
      <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-gray-200 pt-24 pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {t("results")} {search}
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-24 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
        <WithInlinePrice products={products} />
      </div>
    </main>
  );
};
export default SearchPage;
