import { getPayload } from "payload";
import config from "@payload-config";
import { getCustomer } from "@/utilities/getCustomer";

import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n/config";
import { redirect } from "@/i18n/routing";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/utilities/formatPrices";

export const WithSidebarOrders = async () => {
  const payload = await getPayload({ config });
  const user = await getCustomer();
  const locale = (await getLocale()) as Locale;

  if (!user) {
    redirect({ locale, href: "/login" });
  }

  const orders = await payload.find({
    collection: "orders",
    where: {
      customer: {
        equals: user?.id,
      },
    },
    pagination: false,
  });

  return (
    <div className="flex flex-col gap-4">
      {orders.docs.map((order) => (
        <Card key={order.id} className="flex p-4">
          <div className="flex flex-col gap-2">
            <p>{order.orderDetails?.status}</p>
            <p>{order.createdAt.split("T")[0]}</p>
            <p className="text-xs">Nr: {order.id}</p>
            <p>
              {formatPrice(order.orderDetails?.total ?? 0, order.orderDetails?.currency ?? "PLN", locale)}
            </p>
          </div>
          <div>
            <p>
              {order.products?.map(
                (product) =>
                  `${product.productName} ${product.color} ${product.size} x ${product.quantity}, `,
              )}{" "}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};
