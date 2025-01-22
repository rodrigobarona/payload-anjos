import { getPayload } from "payload";
import config from "@payload-config";
import { Cart } from "@/stores/CartStore/types";
import { Locale } from "@/i18n/config";

type Total = Record<string, number>;

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config });
    const { cart, locale }: { cart: Cart | undefined; locale: Locale } = await req.json();
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

    const totalFormatted =
      total &&
      Object.entries(total).map(([currency, value]) => ({
        currency,
        value: parseFloat(value.toFixed(2)),
      }));

    const productsWithTotal = {
      filledProducts,
      total: totalFormatted,
      totalQuantity: filledProducts.reduce((acc, product) => acc + (product?.quantity ?? 0), 0),
    };

    return Response.json({ status: 200, productsWithTotal });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 500, message: "Internal server error" });
  }
}
