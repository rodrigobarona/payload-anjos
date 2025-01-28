import { Currency } from "@/stores/Currency/types";
import { FilledProduct } from "../getFilledProducts";
import { Locale } from "@/i18n/config";
import Stripe from "stripe";

export const getStripePaymentURL = async (
  filledProducts: FilledProduct[],
  shippingCost: number,
  shippingLabel: string,
  currency: Currency,
  locale: Locale,
  apiKey: string,
  orderID: string,
) => {
  const stripe = new Stripe(apiKey);

  const stripeMappedProducts = filledProducts.map((product) => {
    const productPrice = product.enableVariantPrices
      ? product.variant?.pricing?.find((price) => price.currency === currency)?.value
      : product.pricing?.find((price) => price.currency === currency)?.value;

    if (!productPrice) {
      console.log("error");
      throw new Error("Product price not found");
    }

    // TODO: Images
    // const productImage =
    //   product.enableVariants && product.variant.image?.url
    //     ? product.variant.image.url
    //     : (product.image?.url ?? "");

    // console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}${productImage}`);

    const description = [
      product.enableVariants && product.variant?.color?.label,
      product.enableVariants && product.variant?.size?.label,
    ]
      .filter(Boolean)
      .join(", ");

    return {
      price_data: {
        currency: currency.toLowerCase(),
        product_data: {
          name: product.title,
          description: description,
          //   images: [`${process.env.NEXT_PUBLIC_SERVER_URL}${productImage}`],
        },
        unit_amount: productPrice * 100,
      },
      quantity: product.quantity,
    };
  });
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: stripeMappedProducts,
      mode: "payment",
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: shippingCost * 100,
              currency: currency.toLowerCase(),
            },
            display_name: shippingLabel,
          },
        },
      ],
      client_reference_id: orderID,
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${locale}/order/${orderID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${locale}/order/${orderID}?cancelled=true`,
    });

    return session.url;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
