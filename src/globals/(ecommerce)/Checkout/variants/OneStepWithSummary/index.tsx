import { getCustomer } from "@/utilities/getCustomer";
import { CheckoutForm } from "./components/CheckoutForm";
import { OrderSummary } from "./components/OrderSummary";
import { getCachedGlobal } from "@/utilities/getGlobals";

import { Locale } from "@/i18n/config";

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
  // const { price, label } = await getCachedGlobal("dpd", locale, 1)();

  // Pobieram kazdego kuriera z globalnych ustawien recznie, bo nie ma endpointu do pobrania wszystkich dostaw

  // tworze taka tablice dla metod dostaw, wylaczajac te ktore sa disabled, a potem przekazuje do CheckoutForm (klienta)
  // utworzyc customowy endpoint do obliczania kosztow dostawy? (zaleznie od wagi, wielkosci, itp)

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
      </div>
    </div>
  );
};
