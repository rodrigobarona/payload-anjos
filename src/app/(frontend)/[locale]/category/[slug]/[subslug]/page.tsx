import { ProductList } from "@/globals/(ecommerce)/ProductList/Component";
import { Locale } from "@/i18n/config";
import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

const SubcategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ subslug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  try {
    const payload = await getPayload({ config });
    const locale = (await getLocale()) as Locale;
    const { color, size } = await searchParams;
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

    const { docs: products } = await payload.find({
      collection: "products",
      depth: 2,
      locale,
      where: {
        "categoriesArr.subcategories": {
          equals: subcategories[0].id,
        },
      },
      ...(color && { "variants.color": { equals: color } }),
      ...(size && { "variants.size": { equals: size } }),
    });

    if (subcategories.length === 0) {
      notFound();
    }

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
