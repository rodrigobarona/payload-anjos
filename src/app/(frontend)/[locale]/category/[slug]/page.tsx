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
  searchParams: Promise<{ [key: string]: string | undefined }>;
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

    if (!categories[0]) {
      notFound();
    }

    const colorArr = color ? color.split(",") : [];
    const sizeArr = size ? size.split(",") : [];

    const { docs: products } = await payload.find({
      collection: "products",
      depth: 2,
      locale,
      where: {
        "categoriesArr.category": {
          equals: categories[0].id,
        },
        ...(color && !size && { and: [{ "variants.color": { in: colorArr } }] }),
        ...(size && !color && { "variants.size": { in: sizeArr } }),
        ...(size &&
          color && { and: [{ "variants.size": { in: sizeArr } }, { "variants.color": { in: colorArr } }] }),
      },
    });

    return <ProductList filteredProducts={products} title={categories[0].title} category={categories[0]} />;
  } catch (error) {
    notFound();
  }
};

export default CategoryPage;
