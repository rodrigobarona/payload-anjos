import { ProductDetails } from "@/globals/(ecommerce)/ProductDetails/Component";
import { Locale } from "@/i18n/config";
import config from "@payload-config";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  try {
    const payload = await getPayload({ config });
    const locale = (await getLocale()) as Locale;
    const { slug } = await params;
    const { docs } = await payload.find({
      collection: "products",
      depth: 2,
      locale,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    if (docs.length === 0) {
      notFound();
    }

    return <ProductDetails product={docs[0]} />;
  } catch (error) {
    notFound();
  }
};

export default ProductPage;
