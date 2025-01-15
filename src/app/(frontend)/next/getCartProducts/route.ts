import { draftMode } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { NextRequest } from "next/server";
import { Cart } from "@/stores/CartStore/types";
import { FilledVariant } from "@/globals/(ecommerce)/ProductDetails/types";

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
          images: [product.images[0]],
          variants: [
            {
              ...variant,
              color: product.colors?.find((color) => color.slug === variant.color),
              size: product.sizes?.find((size) => size.slug === variant.size),
              slug: variant.variantSlug,
              stock: variant.stock,
              image: typeof variant.image !== "string" ? variant.image : null,
              pricing: variant.pricing,
            },
          ],
          quantity: cartProduct ? cartProduct.quantity : 1,
        };
      });
  });

  console.log(filledProducts);

  return Response.json({ status: 200, filledProducts });
}
