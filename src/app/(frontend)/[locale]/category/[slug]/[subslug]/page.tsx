import { ProductList } from "@/globals/(ecommerce)/ProductList/Component";
import { Locale } from "@/i18n/config";
import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

const SubcategoryPage = async ({ params }: { params: Promise<{ subslug: string }> }) => {
  try {
    const payload = await getPayload({ config });
    const locale = (await getLocale()) as Locale;
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
    });

    if (subcategories.length === 0) {
      notFound();
    }

    return <ProductList products={products} title={subcategories[0].title} subcategory={subcategories[0]} />;
  } catch (error) {
    console.log(error);
    notFound();
  }
};

export default SubcategoryPage;
