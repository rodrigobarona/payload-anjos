import { getPayload } from "payload";
import config from "@payload-config";
import { Cart } from "@/stores/CartStore/types";
import { Country } from "@/globals/(ecommerce)/Couriers/utils/countryList";
import { getCouriersArray } from "@/globals/(ecommerce)/Couriers/utils/couriersConfig";
import { Locale } from "@/i18n/config";
import { getFilledProducts } from "@/lib/getFilledProducts";
import { getTotal } from "@/lib/getTotal";
import { getTotalWeight } from "@/lib/getTotalWeight";
import { CheckoutFormData } from "@/schemas/checkoutForm.schema";
import { Currency } from "@/stores/Currency/types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { getStripePaymentURL } from "@/lib/paywalls/getStripePaymentURL";

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config });
    const {
      cart,
      selectedCountry,
      checkoutData,
      locale,
      currency,
    }: {
      cart: Cart | undefined;
      selectedCountry: Country;
      locale: Locale;
      checkoutData: CheckoutFormData;
      currency: Currency;
    } = await req.json();
    if (!cart) {
      return Response.json({ status: 200 });
    }

    const { docs: products } = await payload.find({
      collection: "products",
      where: {
        id: {
          in: cart.map((product) => product.id),
        },
      },
      locale,
      select: {
        title: true,
        price: true,
        images: true,
        variants: true,
        enableVariants: true,
        enableVariantPrices: true,
        colors: true,
        slug: true,
        stock: true,
        sizes: true,
        weight: true,
        pricing: true,
      },
    });

    const filledProducts = getFilledProducts(products, cart);
    // would be useful for other than stripe paywalls, total does not include shipping cost!
    // const total = getTotal(filledProducts);
    const totalWeight = getTotalWeight(filledProducts, cart);
    const couriers = await getCouriersArray(locale, true);

    const courier = couriers.find((courier) => courier.slug === checkoutData.deliveryMethod);
    const shippingCost = courier?.deliveryZones
      ?.find((zone) => zone.countries.includes(selectedCountry))
      ?.range?.find((range) => range.weightFrom <= totalWeight && range.weightTo >= totalWeight)
      ?.pricing.find((pricing) => pricing.currency === currency)?.value;

    if (!shippingCost) {
      return Response.json({ status: 400, message: "Shipping cost not found" });
    }

    const paywalls = await getCachedGlobal("paywalls", locale, 1)();

    let redirectURL: string | null = null;

    try {
      switch (paywalls.paywall) {
        case "stripe":
          redirectURL = await getStripePaymentURL(
            filledProducts,
            shippingCost,
            courier.title,
            currency,
            locale,
            paywalls?.stripe?.secret ?? "",
          );
          break;

        default:
          break;
      }
    } catch (error) {
      return Response.json({ status: 500, message: "Error while creating payment" });
    }

    if (!redirectURL) {
      return Response.json({ status: 500, message: "Error while creating payment" });
    }

    return Response.json({ status: 200, url: redirectURL });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 500, message: "Internal server error" });
  }
}
