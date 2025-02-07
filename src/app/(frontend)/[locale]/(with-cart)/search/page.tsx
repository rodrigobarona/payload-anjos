import { getTranslations } from "next-intl/server";
import { getPayload } from "payload";

import { WithInlinePrice } from "@/globals/(ecommerce)/Layout/ProductList/variants/listings/WithInlinePrice";
import config from "@payload-config";

const SearchPage = async ({ searchParams }: { searchParams: Promise<{ search: string }> }) => {
  const { search } = await searchParams;
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
      <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {t("results")} {search}
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
        <WithInlinePrice products={products} />
      </div>
    </main>
  );
};
export default SearchPage;
