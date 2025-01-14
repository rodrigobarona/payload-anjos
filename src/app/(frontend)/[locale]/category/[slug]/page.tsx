import { ProductList } from "@/globals/(ecommerce)/ProductList/Component";
import { Locale } from "@/i18n/config";
import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  try {
    const payload = await getPayload({ config });
    const locale = (await getLocale()) as Locale;
    const { slug } = await params;
    const { color, size } = await searchParams;
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
        ...(color && { "variants.color": { equals: color } }),
        ...(size && { "variants.size": { equals: size } }),
      },
    });

    if (categories.length === 0) {
      notFound();
    }

    return <ProductList filteredProducts={products} title={categories[0].title} category={categories[0]} />;
  } catch (error) {
    notFound();
  }
};

export default CategoryPage;
