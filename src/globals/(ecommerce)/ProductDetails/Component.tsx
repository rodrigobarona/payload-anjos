import { getCachedGlobal } from "@/utilities/getGlobals";

const ProductDetails = async () => {
  const productDetailsData = await getCachedGlobal("productDetails", 1)();
  return <div>{productDetailsData.text}</div>;
};
export default ProductDetails;
