import { getPayload } from "payload";

import { type Locale } from "@/i18n/config";
import { type Order } from "@/payload-types";
import config from "@/payload.config";

export const getOrderProducts = async (orderProducts: Order["products"], locale: Locale) => {
  const payload = await getPayload({ config });
  return (
    orderProducts &&
    (await Promise.all(
      orderProducts.map(async (product) => {
        const filledProduct = await payload.findByID({
          collection: "products",
          id: product.id ?? "",
          locale,
        });
        return {
          ...product,
          ...filledProduct,
        };
      }),
    ))
  );
};
