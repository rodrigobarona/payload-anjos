import { getPayload } from "payload";
import config from "@payload-config";
import { Cart } from "@/stores/CartStore/types";
import { Country } from "@/globals/(ecommerce)/Couriers/utils/countryList";
import { getCouriersArray } from "@/globals/(ecommerce)/Couriers/utils/couriersConfig";
import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n/config";

type Total = Record<string, number>;

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config });
    const { cart, selectedCountry }: { cart: Cart | undefined; selectedCountry: Country } = await req.json();
    if (!cart) {
      return Response.json({ status: 200 });
    }
    const locale = (await getLocale()) as Locale;

    const { docs: products } = await payload.find({
      collection: "products",
      where: {
        id: {
          in: cart.map((product) => product.id),
        },
      },
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

    const filledProducts = products.flatMap((product) => {
      if (!product.variants || product.variants.length === 0) {
        const cartProduct = cart.find((cartProduct) => cartProduct.id === product.id);
        return cartProduct
          ? [
              {
                ...product,
                image: typeof product.images[0] !== "string" ? product.images[0] : null,
                slug: product.slug,
                enableVariantPrices: product.enableVariantPrices,
                variant: null as any, // Type assertion
                stock: product.stock,
                pricing: product.pricing,
                quantity: cartProduct.quantity,
              },
            ]
          : [];
      }

      return product.variants
        .filter((variant) => {
          return cart.some((cartProduct) => {
            return cartProduct.id === product.id && cartProduct.choosenVariantSlug === variant.variantSlug;
          });
        })
        .map((variant) => {
          const cartProduct = cart.find(
            (cartProduct) =>
              cartProduct.id === product.id && cartProduct.choosenVariantSlug === variant.variantSlug,
          );

          return {
            ...product,
            image: typeof product.images[0] !== "string" ? product.images[0] : null,
            slug: product.slug,
            enableVariantPrices: product.enableVariantPrices,
            variant: {
              ...variant,
              color: product.colors?.find((color) => color.slug === variant.color),
              size: product.sizes?.find((size) => size.slug === variant.size),
              slug: variant.variantSlug,
              stock: variant.stock,
              image: typeof variant.image !== "string" ? variant.image : null,
              pricing: variant.pricing,
            },
            quantity: cartProduct ? cartProduct.quantity : 1,
          };
        });
    });

    const total = filledProducts.reduce<Total>((acc, product) => {
      if (!product) return acc;
      if (!product.enableVariantPrices) {
        product.pricing?.forEach((price) => {
          acc[price.currency] = (acc[price.currency] ?? 0) + price.value * product.quantity;
        });
      } else if (product.enableVariantPrices && product.enableVariants) {
        product.variant?.pricing?.forEach((price) => {
          acc[price.currency] = (acc[price.currency] ?? 0) + price.value * product.quantity;
        });
      }
      return acc;
    }, {});

    const totalWeight = filledProducts.reduce((acc, product) => {
      if (product.enableVariantWeights && product.variants) {
        const variantWeight = product.variants
          .filter((variant) =>
            cart.some(
              (cartProduct) =>
                cartProduct.id === product.id && cartProduct.choosenVariantSlug === variant.variantSlug,
            ),
          )
          .reduce((varAcc, variant) => varAcc + (variant.weight ?? 0), 0);

        return acc + variantWeight;
      }

      return acc + (product.weight ?? 0);
    }, 0);

    const totalFormatted =
      total &&
      Object.entries(total).map(([currency, value]) => ({
        currency,
        value: parseFloat(value.toFixed(2)),
      }));

    const couriers = await getCouriersArray(locale, true);
    const filledCouriers = couriers
      .filter((courier) => courier.deliveryZones?.find((zone) => zone.countries.includes(selectedCountry)))
      .map((courier) => {
        const deliveryZone = courier.deliveryZones?.find((zone) => zone.countries.includes(selectedCountry));
        const deliveryZoneWithRange = {
          ...deliveryZone,
          range: deliveryZone?.range?.find(
            (range) => range.weightFrom <= totalWeight && range.weightTo >= totalWeight,
          ),
        };

        const calculatedPrice = deliveryZoneWithRange?.range?.pricing.map((prices) => {
          const freeShippingValue = deliveryZoneWithRange.freeShipping?.find(
            (freeShipping) => freeShipping.currency === prices.currency,
          )?.value;
          const totalPriceInCurrency = totalFormatted.find(
            (price) => price.currency === prices.currency,
          )?.value;
          if (!freeShippingValue || !totalPriceInCurrency) {
            return prices;
          } else {
            return {
              ...prices,
              value: totalPriceInCurrency >= freeShippingValue ? 0 : prices.value,
            };
          }
        });

        return {
          slug: courier.slug,
          title: courier.title,
          turnaround: courier.turnaround,
          pricing: calculatedPrice,
        };
      });

    const productsWithTotalAndCouriers = {
      filledProducts: filledProducts,
      total: totalFormatted,
      couriers: filledCouriers,
      totalQuantity: filledProducts.reduce((acc, product) => acc + (product?.quantity ?? 0), 0),
    };

    // console.log(totalWeight);

    return Response.json({ status: 200, productsWithTotalAndCouriers });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 500, message: "Internal server error" });
  }
}
