import { ProductList } from "@/globals/(ecommerce)/ProductList/Component";
import { Locale } from "@/i18n/config";
import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPayload, Sort } from "payload";

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
    const { color, size, sortBy } = await searchParams;
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
    let sortQuery: Sort = "bought";
    switch (sortBy) {
      case "priceasc":
        sortQuery = ["variants.pricing[0].value", "pricing.value"];
        break;
      case "pricedesc":
        sortQuery = ["-variants.pricing[0].value", "-pricing.value"];
        break;
      case "newest":
        sortQuery = ["-createdAt"];
        break;
      default:
        sortQuery = "-bought";
        break;
    }

    const { docs: products } = await payload.find({
      collection: "products",
      depth: 2,
      locale,
      where: {
        "categoriesArr.category": {
          equals: categories[0].id,
        },
        ...(color && !size && { "variants.color": { in: colorArr } }),
        ...(size && !color && { "variants.size": { in: sizeArr } }),
        ...(size &&
          color && { and: [{ "variants.size": { in: sizeArr } }, { "variants.color": { in: colorArr } }] }),
      },
      sort: sortQuery,
    });

    return <ProductList filteredProducts={products} title={categories[0].title} category={categories[0]} />;
  } catch (error) {
    console.log(error);
    notFound();
  }
};

export default CategoryPage;
