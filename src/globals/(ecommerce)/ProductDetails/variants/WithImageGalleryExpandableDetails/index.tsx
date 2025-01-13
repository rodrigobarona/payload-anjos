"use client";
import { useState } from "react";
import { cn } from "@/utilities/cn";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
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
// type product not any, switch later

// const product = {
//   name: "Zip Tote Basket",
//   price: "$140",
//   rating: 4,
//   images: [
//     {
//       id: 1,
//       name: "Angled view",
//       src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-03-product-01.jpg",
//       alt: "Angled front view with bag zipped and handles upright.",
//     },
//     {
//       id: 2,
//       name: "Angled view",
//       src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-03-product-01.jpg",
//       alt: "Angled front view with bag zipped and handles upright.",
//     },
//     // More images...
//   ],
//   colors: [
//     { name: "Washed Black", bgColor: "bg-gray-700", selectedColor: "ring-gray-700" },
//     { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
//     { name: "Washed Gray", bgColor: "bg-gray-500", selectedColor: "ring-gray-500" },
//   ],
//   description: `
//     <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
//   `,
//   details: [
//     {
//       name: "Features",
//       items: [
//         "Multiple strap configurations",
//         "Spacious interior with top zip",
//         "Leather handle and tabs",
//         "Interior dividers",
//         "Stainless strap loops",
//         "Double stitched construction",
//         "Water-resistant",
//       ],
//     },
//     // More sections...
//   ],
// };

export const WithImageGalleryExpandableDetails = ({
  product,
  productSettings,
}: {
  product: Product;
  productSettings: ProductDetail;
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);

  const [selectedVariant, setSelectedVariant] = useState(product.variants ? product.variants[0] : null);

  const handleChangeColor = () => {};

  const handleChangeSize = () => {};

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <TabGroup className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <TabList className="grid grid-cols-4 gap-6">
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
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {product.pricing ? product.pricing[0].value : 0}
              </p>
            </div>

            {/* Reviews */}
            {productSettings.reviewsEnabled && (
              <>
                <div className="mt-3">
                  <h3 className="sr-only">Reviews</h3>
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
                {product.description && (
                  <div className="mt-6">
                    <h3 className="sr-only">Description</h3>

                    <RichText className="space-y-6 text-base text-gray-700" data={product.description} />
                  </div>
                )}
              </>
            )}

            <form className="mt-6">
              {/* Colors */}
              {product.variants && product.enableVariants && product.variantsType !== "sizes" && (
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Color</h3>

                  <fieldset aria-label="Choose a color" className="mt-2">
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="flex items-center gap-x-3"
                    >
                      {product.colors &&
                        product.colors.map((color) => {
                          return (
                            <Radio
                              key={color.id}
                              value={color}
                              aria-label={color.label}
                              className={cn(
                                // color.selectedColor,
                                "ring-gray-500",
                                "focus:outline-hidden data-[focus]:data-[checked]:ring-3 relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 data-[checked]:ring-2 data-[focus]:data-[checked]:ring-offset-1",
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
              {product.variants && product.enableVariants && product.variantsType !== "sizes" && (
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">Size</h2>
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      See sizing chart
                    </a>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-2">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-3 gap-3 sm:grid-cols-6"
                    >
                      {product.sizes &&
                        product.sizes.map((size) => (
                          <Radio
                            key={size.id}
                            value={size}
                            // also stock check here
                            disabled={false}
                            className={cn(
                              //there was stock check
                              true ? "focus:outline-hidden cursor-pointer" : "cursor-not-allowed opacity-25",
                              "flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-3 text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 data-[checked]:border-transparent data-[checked]:bg-indigo-600 data-[checked]:text-white data-[focus]:ring-2 data-[focus]:ring-indigo-500 data-[focus]:ring-offset-2 data-[checked]:hover:bg-indigo-700 sm:flex-1",
                            )}
                          >
                            {size.label}
                          </Radio>
                        ))}
                    </RadioGroup>
                  </fieldset>
                </div>
              )}

              <div className="mt-10 flex">
                <button
                  type="submit"
                  className="focus:outline-hidden flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to bag
                </button>

                <button
                  type="button"
                  className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon aria-hidden="true" className="size-6 shrink-0" />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="divide-y divide-gray-200 border-t">
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
