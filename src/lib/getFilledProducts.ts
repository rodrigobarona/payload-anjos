import { Product } from "@/payload-types";
import { Cart } from "@/stores/CartStore/types";

export const getFilledProducts = (products: Product[], cart: Cart) => {
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
  return filledProducts;
};

export type FilledProduct = ReturnType<typeof getFilledProducts>[number];
