import { getCustomer } from "@/utilities/getCustomer";
import { CheckoutForm } from "./components/CheckoutForm";
import { OrderSummary } from "./components/OrderSummary";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n/config";
import { InPostGeowidget } from "@/components/(ecommerce)/InPostGeowidget";

const products = [
  {
    id: 1,
    title: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Black",
    size: "Large",
    imageSrc: "https://tailwindui.com/plus/img/ecommerce-images/checkout-page-02-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  // More products...
];

export const OneStepWithSummary = async ({ locale }: { locale: Locale }) => {
  const user = await getCustomer();
  const { geowidgetToken } = await getCachedGlobal("inpost", locale, 1)();
  const deliveries = [
    { slug: "inpost-pickup", title: "InPost Paczkomaty", price: 16, turnaround: "1-2 dni robocze" },
  ];
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>
        <CheckoutForm geowidgetToken={geowidgetToken ?? undefined} deliveryMethods={deliveries} user={user}>
          <OrderSummary products={products} />
        </CheckoutForm>
        {/* {geowidgetToken && <InPostGeowidget setPickupPoint={() => {}} token={geowidgetToken} />} */}
      </div>
    </div>
  );
};
