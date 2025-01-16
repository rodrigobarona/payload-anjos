import { draftMode } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { NextRequest } from "next/server";
import { Cart } from "@/stores/CartStore/types";
import { FilledVariant } from "@/globals/(ecommerce)/ProductDetails/types";

type Total = Record<string, number>;

export async function POST(req: Request) {
  const payload = await getPayload({ config });
  const cart: Cart | undefined = await req.json();
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
    select: {
      title: true,
      price: true,
      images: true,
      variants: true,
      enableVariants: true,
      enableVariantPrices: true,
      colors: true,
      sizes: true,
      pricing: true,
    },
  });

  const filledProducts = products.flatMap((product) => {
    return product.variants
      ?.filter((variant) => {
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
    } else if (product.enableVariantPrices) {
      product.variants?.[0]?.pricing?.forEach((price) => {
        acc[price.currency] = (acc[price.currency] ?? 0) + price.value * product.quantity;
      });
    }
    return acc;
  }, {});

  const totalFormatted =
    total &&
    Object.entries(total).map(([currency, value]) => ({
      currency,
      value: parseFloat(value.toFixed(2)),
    }));

  const productsWithTotal = {
    filledProducts,
    total: totalFormatted,
  };

  console.log(totalFormatted);

  return Response.json({ status: 200, productsWithTotal });
}
