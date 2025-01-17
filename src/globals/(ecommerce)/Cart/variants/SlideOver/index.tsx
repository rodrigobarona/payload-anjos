"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCartState } from "../../stores/CartStateStore";
import { useCart } from "@/stores/CartStore";
import axios from "axios";
import { FilledVariant } from "@/globals/(ecommerce)/ProductDetails/types";
import { Media, Product } from "@/payload-types";
import { PriceClient } from "@/components/(ecommerce)/PriceClient";
import Image from "next/image";
import { Currency } from "@/stores/Currency/types";
import { QuantityInput } from "@/components/(ecommerce)/QuantityInput";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type ProductWithFilledVariants = Omit<Product, "variants"> & {
  variant: FilledVariant | undefined;
  image: Media | null;
  quantity: number;
};

export const SlideOver = () => {
  const { isOpen, setCartState, toggleCart } = useCartState();

  const { cart, updateCart, setCart, removeFromCart } = useCart();

  const [cartProducts, setCartProducts] = useState<ProductWithFilledVariants[]>([]);
  const [total, setTotal] = useState<
    {
      currency: Currency;
      value: number;
    }[]
  >([]);

  // TODO: Little refactor + consider debouncing.
  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const { data } = await axios.post<{
          status: number;
          productsWithTotal: {
            filledProducts: ProductWithFilledVariants[];
            total: {
              currency: Currency;
              value: number;
            }[];
            totalQuantity: number;
          };
        }>("/next/getCartProducts", cart);
        const { filledProducts, total } = data.productsWithTotal;
        setCartProducts(filledProducts);
        setTotal(total);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartProducts();
  }, [cart]);

  const setCartQuantity = (quantity: number, productID: string, productVariantSlug: string | undefined) => {
    setCart([
      ...(cart?.filter((cartProduct) => cartProduct.id !== productID) ?? []),
      {
        id: productID,
        quantity,
        choosenVariantSlug: productVariantSlug,
      },
    ]);
  };

  const updateCartQuantity = (delta: number, productID: string, productVariantSlug: string | undefined) => {
    updateCart([
      {
        id: productID,
        quantity: delta,
        choosenVariantSlug: productVariantSlug,
      },
    ]);
  };

  const t = useTranslations("Cart");

  return (
    <Dialog open={isOpen} onClose={toggleCart} className="relative z-[100]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">{t("title")}</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setCartState(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">{t("close-panel")}</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cartProducts.map((product) => (
                          <li
                            key={`${product.id}-${product.variant && product.variant.slug}`}
                            className="flex py-6"
                          >
                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              {product.variant && product.variant.image && product.variant.image.url ? (
                                <Image
                                  alt={product.variant.image.alt}
                                  src={product.variant.image.url}
                                  width={96}
                                  height={96}
                                  className="size-full object-cover"
                                />
                              ) : product.image && product.image.url ? (
                                <Image
                                  alt={product.image.alt}
                                  src={product.image.url}
                                  width={96}
                                  height={96}
                                  className="size-full object-cover"
                                />
                              ) : null}
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a
                                      href={`/product/${product.slug}${product.enableVariants && product?.variant?.slug ? `?variant=${product.variant.slug}` : ""}`}
                                    >
                                      {product.title}
                                    </a>
                                  </h3>
                                  <p className="ml-4">
                                    <PriceClient
                                      pricing={
                                        product.enableVariantPrices
                                          ? ((product.variant &&
                                              product.variant.pricing &&
                                              product.variant.pricing.map((p) => ({
                                                ...p,
                                                value: p.value * product.quantity,
                                              }))) ??
                                            [])
                                          : product.pricing
                                            ? product.pricing.map((p) => ({
                                                ...p,
                                                value: p.value * product.quantity,
                                              }))
                                            : []
                                      }
                                    />
                                  </p>
                                </div>
                                <p>
                                  {product.enableVariants &&
                                    product.variant &&
                                    product.variant.color?.label &&
                                    `${product.variant.color.label}${product.variant.size?.label ? ", " : ""}`}
                                  {product.enableVariants && product.variant && product.variant.size?.label}
                                </p>
                              </div>

                              <div className="flex flex-1 items-end justify-between text-sm">
                                <QuantityInput
                                  quantity={product.quantity}
                                  inputVariant="cart"
                                  setQuantity={(quantity) => {
                                    setCartQuantity(quantity, product.id, product.variant?.slug ?? undefined);
                                  }}
                                  updateQuantity={(delta) => {
                                    updateCartQuantity(delta, product.id, product.variant?.slug ?? undefined);
                                  }}
                                  maxQuantity={
                                    product.enableVariants
                                      ? (product.variant?.stock ?? 0)
                                      : (product.stock ?? 0)
                                  }
                                  minQuantity={1}
                                />

                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      removeFromCart(
                                        product.id,
                                        (product.variant && product.variant.slug) ?? undefined,
                                      );
                                    }}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    {t("remove")}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>{t("subtotal")}</p>
                    <p>
                      <PriceClient pricing={total} />
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{t("subtotal-info")}</p>
                  <div className="mt-6">
                    <Link
                      href="/checkout"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      {t("checkout")}
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      {t("or")}{" "}
                      <button
                        type="button"
                        onClick={() => setCartState(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {t("continue-shopping")}
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
