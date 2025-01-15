import { ProductList } from "@/globals/(ecommerce)/ProductList/Component";
import { Locale } from "@/i18n/config";
import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPayload, Sort } from "payload";

const SubcategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ subslug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  try {
    const payload = await getPayload({ config });
    const locale = (await getLocale()) as Locale;
    const { color, size, sortBy } = await searchParams;
    const { subslug } = await params;
    const { docs: subcategories } = await payload.find({
      collection: "productSubCategories",
      depth: 1,
      locale,
      where: {
        slug: {
          equals: subslug,
        },
      },
    });

    if (!subcategories[0]) {
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
        "categoriesArr.subcategories": {
          equals: subcategories[0].id,
        },
      },
      ...(color && !size && { and: [{ "variants.color": { in: colorArr } }] }),
      ...(size && !size && { "variants.size": { in: sizeArr } }),
      ...(size &&
        color && { and: [{ "variants.size": { in: sizeArr } }, { "variants.color": { in: colorArr } }] }),
      sort: sortQuery,
    });

    return (
      <ProductList
        filteredProducts={products}
        title={subcategories[0].title}
        subcategory={subcategories[0]}
      />
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
};

export default SubcategoryPage;
