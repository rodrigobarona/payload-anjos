import { Locale } from "@/i18n/config";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { getLocale } from "next-intl/server";

const ProductDetails = async () => {
  const locale = (await getLocale()) as Locale;
  const productDetailsData = await getCachedGlobal("productDetails", locale, 1)();
  return <div>{productDetailsData.text}</div>;
};
export default ProductDetails;
