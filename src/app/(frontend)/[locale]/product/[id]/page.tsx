import { ProductDetails } from "@/globals/(ecommerce)/ProductDetails/Component";
import config from "@payload-config";
import { notFound } from "next/navigation";
import { getPayload } from "payload";

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  try {
    const payload = await getPayload({ config });
    const { id } = await params;
    const product = await payload.findByID({
      id,
      collection: "products",
      depth: 2,
    });
    return <ProductDetails product={product} />;
  } catch (error) {
    notFound();
  }
};

export default ProductPage;
