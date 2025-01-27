import { getPayload } from "payload";
import config from "@payload-config";
import { getCustomer } from "@/utilities/getCustomer";

import { getLocale, getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/config";
import { Link, redirect } from "@/i18n/routing";

import { formatPrice } from "@/utilities/formatPrices";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { formatDateTime } from "@/utilities/formatDateTime";

export const WithSidebarOrders = async () => {
  const payload = await getPayload({ config });
  const user = await getCustomer();
  const locale = (await getLocale()) as Locale;

  if (!user) {
    redirect({ locale, href: "/login" });
  }
  const t = await getTranslations("Account.orders");

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
        <Link href={`/account/orders/${order.id}`} key={order.id}>
          <Card className="flex flex-col bg-gray-50 sm:flex-row">
            <div className="flex flex-col gap-2 bg-gray-100 p-4 sm:w-1/3 sm:pr-8">
              {t.rich(order.orderDetails.status, {
                yellow: (chunks) => <p className="font-medium text-yellow-600">{chunks}</p>,
                green: (chunks) => <p className="font-medium text-green-600">{chunks}</p>,
                red: (chunks) => <p className="font-medium text-red-600">{chunks}</p>,
              })}
              <p className="text-sm">{formatDateTime(order.createdAt, "EU")}</p>
              <p className="text-xs">Nr: {order.id}</p>
              <p className="font-medium">
                {formatPrice(order.orderDetails?.total ?? 0, order.orderDetails?.currency ?? "PLN", locale)}
              </p>
            </div>
            <div className="flex items-center gap-2 overflow-y-auto p-4 sm:pl-8">
              {order.products?.map((product) => {
                const hasVariant = product.hasVariant && product.variantSlug;
                const variantImage =
                  typeof product.product !== "string" &&
                  product.product &&
                  hasVariant &&
                  product.product.variants?.find((variant) => variant.variantSlug === product.variantSlug)
                    ?.image;

                const productImage =
                  product.product &&
                  typeof product.product !== "string" &&
                  typeof product.product.images[0] !== "string" &&
                  product.product.images[0];

                const image = variantImage && typeof variantImage !== "string" ? variantImage : productImage;

                return (
                  image && (
                    <Image
                      key={`${product.id}-${product.variantSlug}`}
                      src={image.url ?? ""}
                      alt={product.productName ?? ""}
                      width={image.width ?? 50}
                      height={image.height ?? 50}
                      title={`${product.productName} ${product.color} ${product.size} x ${product.quantity}`}
                      className="aspect-square w-20 rounded-xl border object-cover shadow-sm"
                    />
                  )
                );
              })}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
