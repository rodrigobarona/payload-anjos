"use client";
import { useEffect, useState } from "react";
import { cn } from "@/utilities/cn";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Input,
  Radio,
  RadioGroup,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";

import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Product, ProductDetail } from "@/payload-types";
import Image from "next/image";
import RichText from "@/components/RichText";
import { formatPrice } from "@/utilities/formatPrices";
import { useLocale, useTranslations } from "next-intl";
import { PriceClient } from "@/components/(ecommerce)/PriceClient";

export const WithImageGalleryExpandableDetails = ({
  product,
  productSettings,
}: {
  product: Product;
  productSettings: ProductDetail;
}) => {
  const filledVariants = product.variants?.map((variant) => ({
    color: product.colors?.find((color) => {
      return color.slug === variant.color;
    }),
    size: product.sizes?.find((size) => size.slug === variant.size),
    slug: variant.variantSlug,
    stock: variant.stock,
    image: typeof variant.image !== "string" ? variant.image : null,
  }));
  const locale = useLocale();

  const [selectedVariant, setSelectedVariant] = useState(filledVariants ? filledVariants[0] : null);
  const [quantity, setQuantity] = useState(1);

  const maxQuantity = selectedVariant?.stock ?? product.stock ?? 999;

  const minQuantity = 1;

  const handleIncreaseQuantity = () => {
    console.log(quantity, maxQuantity);
    if (quantity < maxQuantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > minQuantity) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleChangeColor = (id: string) => {
    const matchingVariant = filledVariants?.filter(
      (variant) => variant.color?.id === id && variant.stock > 0,
    );
    const closestVariant = matchingVariant?.find((variant) => variant.size?.id === selectedVariant?.size?.id);

    if (closestVariant) {
      setSelectedVariant(closestVariant);
    } else if (matchingVariant) {
      setSelectedVariant(matchingVariant[0]);
    }
  };

  const findAvailableSizeVariant = (sizeID: string) => {
    const matchingVariant = filledVariants?.find((variant) => {
      return variant.color?.id === selectedVariant?.color?.id && variant.size?.id === sizeID;
    });
    if (matchingVariant && matchingVariant.stock > 0) {
      return matchingVariant;
    }
  };

  const handleChangeSize = (id: string) => {
    const matchingVariant = findAvailableSizeVariant(id);
    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
    }
  };

  const isColorAvailable = (colorID: string) => {
    const isAvailable = filledVariants?.find((variant) => {
      return variant.color?.id === colorID && variant.stock > 0;
    });
    return Boolean(isAvailable);
  };

  const isProductAvailable = !Boolean(
    (product.enableVariants && (!selectedVariant || selectedVariant.stock === 0)) ||
      (!product.enableVariants && product.stock === 0),
  );

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    setSelectedTab(0);
    if (quantity > maxQuantity) {
      setQuantity(maxQuantity);
    }
    if (quantity < minQuantity) {
      setQuantity(minQuantity);
    }
  }, [selectedVariant, minQuantity, maxQuantity]);

  const t = useTranslations("ProductDetails");

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}

          <TabGroup
            defaultIndex={0}
            selectedIndex={selectedTab}
            onChange={(index) => {
              setSelectedTab(index);
            }}
            className="flex flex-col-reverse"
          >
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <TabList className="grid grid-cols-4 gap-6">
                {product.enableVariants && selectedVariant?.image && (
                  <Tab className="focus:ring-3 focus:outline-hidden group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:ring-indigo-500/50 focus:ring-offset-4">
                    <span className="sr-only">{selectedVariant.image.alt}</span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <Image
                        alt={selectedVariant.image.alt}
                        src={selectedVariant.image.url ?? ""}
                        width={selectedVariant.image.width ?? 512}
                        height={selectedVariant.image.height ?? 512}
                        className="size-full object-cover"
                      />
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-indigo-500"
                    />
                  </Tab>
                )}
                {product.images.map(
                  (image) =>
                    typeof image !== "string" && (
                      <Tab
                        key={image.id}
                        className="focus:ring-3 focus:outline-hidden group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:ring-indigo-500/50 focus:ring-offset-4"
                      >
                        <span className="sr-only">{image.alt}</span>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <Image
                            alt={image.alt}
                            src={image.url ?? ""}
                            width={image.width ?? 512}
                            height={image.height ?? 512}
                            className="size-full object-cover"
                          />
                        </span>
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-indigo-500"
                        />
                      </Tab>
                    ),
                )}
              </TabList>
            </div>

            <TabPanels>
              {product.enableVariants && selectedVariant?.image && (
                <TabPanel>
                  <Image
                    alt={selectedVariant.image.alt}
                    src={selectedVariant.image.url ?? ""}
                    width={selectedVariant.image.width ?? 512}
                    height={selectedVariant.image.height ?? 512}
                    className="aspect-square w-full object-cover sm:rounded-lg"
                  />
                </TabPanel>
              )}
              {product.images.map(
                (image) =>
                  typeof image !== "string" && (
                    <TabPanel key={image.id}>
                      <Image
                        alt={image.alt}
                        src={image.url ?? ""}
                        width={image.width ?? 512}
                        height={image.height ?? 512}
                        className="aspect-square w-full object-cover sm:rounded-lg"
                      />
                    </TabPanel>
                  ),
              )}
            </TabPanels>
          </TabGroup>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.title}</h1>

            <div className="mt-3">
              <h2 className="sr-only">{t("product-info")}</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                <PriceClient
                  pricing={
                    (product.enableVariants && product.enableVariantPrices && product.variants
                      ? product.variants[0].pricing
                      : product.pricing) ?? []
                  }
                />
              </p>
            </div>

            {/* Reviews */}

            {productSettings.reviewsEnabled && (
              <>
                <div className="mt-3">
                  <h3 className="sr-only">{t("reviews")}</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          aria-hidden="true"
                          className={cn(
                            // product.rating > rating ? "text-indigo-500" : "text-gray-300",
                            "text-indigo-500", // temporary
                            "size-5 shrink-0",
                          )}
                        />
                      ))}
                    </div>
                    <p className="sr-only">{/* {product.rating} - temporary disabled*/}5 out of 5 stars</p>
                  </div>
                </div>
              </>
            )}

            {product.description && (
              <div className="mt-6">
                <h3 className="sr-only">{t("description")}</h3>

                <RichText className="space-y-6 text-base text-gray-700" data={product.description} />
              </div>
            )}

            <form className="mt-6">
              {/* Colors */}
              {product.variants && product.enableVariants && product.variantsType !== "sizes" && (
                <div>
                  <h3 className="text-sm font-medium text-gray-600">{t("color")}</h3>

                  <fieldset aria-label={t("choose-color")} className="mt-2">
                    <RadioGroup
                      value={selectedVariant?.color?.id}
                      onChange={handleChangeColor}
                      className="flex items-center gap-x-3"
                    >
                      {product.colors &&
                        product.colors.map((color) => {
                          const isAvailable = isColorAvailable(color.id ?? "");
                          return (
                            <Radio
                              key={color.id}
                              value={color.id}
                              aria-label={color.label}
                              disabled={!isAvailable}
                              className={cn(
                                "ring-gray-500",
                                "focus:outline-hidden data-[focus]:data-[checked]:ring-3 relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 data-[checked]:ring-2 data-[focus]:data-[checked]:ring-offset-1",
                                !isAvailable && "cursor-not-allowed opacity-25",
                              )}
                            >
                              <span
                                aria-hidden="true"
                                style={{ background: color.colorValue ?? "" }}
                                className={cn("size-8 rounded-full border border-black/10")}
                              />
                            </Radio>
                          );
                        })}
                    </RadioGroup>
                  </fieldset>
                </div>
              )}

              {/* Size picker */}
              {product.variants && product.enableVariants && product.variantsType !== "colors" && (
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">{t("size")}</h2>
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      {t("sizing-chart")}
                    </a>
                  </div>

                  <fieldset aria-label={t("choose-size")} className="mt-2">
                    <RadioGroup
                      defaultValue={selectedVariant?.size?.id}
                      value={selectedVariant?.size?.id}
                      onChange={handleChangeSize}
                      className="grid grid-cols-3 gap-3 sm:grid-cols-6"
                    >
                      {product.sizes &&
                        product.sizes.map((size) => {
                          const matchingVariant = findAvailableSizeVariant(size.id || "");

                          return (
                            <Radio
                              key={
                                matchingVariant
                                  ? `${matchingVariant?.size?.id}-${matchingVariant?.color?.id}`
                                  : `${size.id}-unavailable`
                              }
                              value={matchingVariant ? matchingVariant?.size?.id : `${size.id}-unavailable`}
                              disabled={!matchingVariant}
                              className={cn(
                                matchingVariant
                                  ? "focus:outline-hidden cursor-pointer"
                                  : "cursor-not-allowed opacity-25",
                                "flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-3 text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 data-[checked]:border-transparent data-[checked]:bg-indigo-600 data-[checked]:text-white data-[focus]:ring-2 data-[focus]:ring-indigo-500 data-[focus]:ring-offset-2 data-[checked]:hover:bg-indigo-700 sm:flex-1",
                              )}
                            >
                              {size.label}
                            </Radio>
                          );
                        })}
                    </RadioGroup>
                  </fieldset>
                </div>
              )}

              <div className="mt-10 grid grid-cols-2 gap-y-4 sm:flex">
                <button
                  type="submit"
                  disabled={!isProductAvailable}
                  className={cn(
                    "focus:outline-hidden col-span-2 row-start-2 flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full",
                    !isProductAvailable && "cursor-not-allowed opacity-25",
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(selectedVariant);
                  }}
                >
                  {isProductAvailable ? t("add-to-cart") : t("product-unavailable")}
                </button>

                <div className="flex">
                  <div className="flex w-fit items-center border border-gray-200 sm:ml-4">
                    <button
                      type="button"
                      className="cursor-pointer p-2"
                      disabled={quantity <= minQuantity}
                      onClick={handleDecreaseQuantity}
                    >
                      <MinusIcon width={20} height={20} />
                    </button>
                    <Input
                      type="number"
                      className={`mx-auto h-full w-full min-w-10 max-w-16 p-2 text-center outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                      value={quantity}
                      min={1}
                      max={selectedVariant?.stock || product?.stock || 999}
                      onKeyDown={(e) => {
                        const key = e.key;

                        const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

                        if (!/^[0-9]$/.test(key) && !allowedKeys.includes(key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const quantityFromInput = Number(e.target.value);
                        if (quantityFromInput > maxQuantity) {
                          setQuantity(maxQuantity);
                        } else if (quantityFromInput < minQuantity) {
                          setQuantity(minQuantity);
                        } else {
                          setQuantity(quantityFromInput);
                        }
                      }}
                    />
                    <button
                      className="cursor-pointer p-2"
                      type="button"
                      disabled={quantity >= maxQuantity}
                      onClick={handleIncreaseQuantity}
                    >
                      <PlusIcon width={20} height={20} />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="ml-4 flex w-fit items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon aria-hidden="true" className="size-6 shrink-0" />
                    <span className="sr-only">{t("add-to-favs")}</span>
                  </button>
                </div>
              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                {t("additional-details")}
              </h2>

              <div className="divide-gray-360 divide-y border-t">
                {product.details &&
                  product.details.map((detail) => (
                    <Disclosure key={detail.id} as="div">
                      <h3>
                        <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                          <span className="text-sm font-medium text-gray-900 group-data-[open]:text-indigo-600">
                            {detail.title}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="block size-6 text-gray-400 group-hover:text-gray-500 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="hidden size-6 text-indigo-400 group-hover:text-indigo-500 group-data-[open]:block"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pb-6">
                        <RichText
                          className="list-disc space-y-1 pl-5 text-sm/6 text-gray-700 marker:text-gray-300"
                          data={detail.content}
                        />
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
