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
import { getCustomer } from "@/utilities/getCustomer";

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
    const total = getTotal(filledProducts);
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

    const user = await getCustomer();

    filledProducts.forEach((product) => {
      if (product.enableVariants && product.variant && product.variants) {
        const variant = product.variant;
        if (variant.stock) {
          const newStock = variant.stock - product.quantity;
          payload.update({
            collection: "products",
            id: product.id,
            data: {
              variants: product.variants?.map((v) => {
                if (v.variantSlug === variant.variantSlug) {
                  return {
                    ...v,
                    stock: newStock,
                  };
                }
                return v;
              }),
            },
          });
        }
      } else {
        if (product.stock) {
          const newStock = product.stock - product.quantity;
          payload.update({
            collection: "products",
            id: product.id,
            data: {
              stock: newStock,
            },
          });
        }
      }
    });

    const order = await payload.create({
      collection: "orders",
      data: {
        customer: user?.id,
        extractedFromStock: true,
        products: filledProducts.map((product) => ({
          id: product.id,
          product: product.id,
          productName: product.title,
          quantity: product.quantity,
          hasVariant: product.enableVariants && product.variant ? true : false,
          variantSlug: product.variant.variantSlug ?? undefined,
          color: product.variant.color?.label ?? undefined,
          size: product.variant.size?.label ?? undefined,
        })),
        date: new Date().toISOString(),
        invoice: {
          address:
            checkoutData.individualInvoice && checkoutData.invoice
              ? checkoutData.invoice.address
              : checkoutData.shipping.address,
          city:
            checkoutData.individualInvoice && checkoutData.invoice
              ? checkoutData.invoice.city
              : checkoutData.shipping.city,
          country:
            checkoutData.individualInvoice && checkoutData.invoice
              ? (checkoutData.invoice.country as Country)
              : (checkoutData.shipping.country as Country),
          isCompany: checkoutData.buyerType === "company",
          name:
            checkoutData.individualInvoice && checkoutData.invoice
              ? checkoutData.invoice.name
              : checkoutData.shipping.name,
          postalCode:
            checkoutData.individualInvoice && checkoutData.invoice
              ? checkoutData.invoice.postalCode
              : checkoutData.shipping.postalCode,
          region:
            checkoutData.individualInvoice && checkoutData.invoice
              ? checkoutData.invoice.region
              : checkoutData.shipping.region,
          tin: checkoutData.buyerType === "company" ? checkoutData.invoice?.tin : undefined,
        },
        orderDetails: {
          shipping: courier.slug,
          shippingCost,
          status: "pending",
          total: total.find((price) => price.currency === currency)?.value,
          currency: currency,
        },
        shippingAddress: {
          name: checkoutData.shipping.name,
          address: checkoutData.shipping.address,
          city: checkoutData.shipping.city,
          country: checkoutData.shipping.country as Country,
          region: checkoutData.shipping.region,
          postalCode: checkoutData.shipping.postalCode,
          email: checkoutData.shipping.email,
          phone: checkoutData.shipping.phone,
          pickupPointAddress: checkoutData.shipping.pickupPointAddress,
          pickupPointID: checkoutData.shipping.pickupPointID,
        },
      },
    });

    // TODO: Handle stock changes

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
            order.id,
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
