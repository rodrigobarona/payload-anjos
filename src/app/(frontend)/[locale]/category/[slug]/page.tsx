import { CategoryListing } from "@/globals/(ecommerce)/CategoryPage/Component";
import { Locale } from "@/i18n/config";
import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

const CategoryPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  try {
    const payload = await getPayload({ config });
    const locale = (await getLocale()) as Locale;
    const { slug } = await params;
    const { docs: categories } = await payload.find({
      collection: "productCategories",
      depth: 1,
      locale,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    const { docs: products } = await payload.find({
      collection: "products",
      depth: 2,
      locale,
      where: {
        "categoriesArr.category": {
          equals: categories[0].id,
        },
      },
    });

    if (categories.length === 0) {
      notFound();
    }

    return <CategoryListing products={products} category={categories[0]} />;
  } catch (error) {
    notFound();
  }
};

export default CategoryPage;
