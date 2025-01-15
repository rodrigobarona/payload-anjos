import "server-only";

import { cn } from "@/utilities/cn";
import { Disclosure, DisclosureButton, DisclosurePanel, Tab, TabPanel } from "@headlessui/react";

import { StarIcon } from "@heroicons/react/20/solid";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Product, ProductDetail } from "@/payload-types";
import Image from "next/image";
import RichText from "@/components/RichText";
import { useTranslations } from "next-intl";

import { FilledVariant } from "../../types";
import { ProductForm } from "./components/ProductForm";
import { ProductProvider } from "./context/ProductContext";
import { ProductGallery } from "./components/ProductGallery";
import { PriceWithContext } from "./components/PriceWithContext";

export const WithImageGalleryExpandableDetails = ({
  product,
  productSettings,
}: {
  product: Product;
  productSettings: ProductDetail;
}) => {
  const filledVariants: FilledVariant[] | undefined = product.variants?.map((variant) => ({
    color: product.colors?.find((color) => {
      return color.slug === variant.color;
    }),
    size: product.sizes?.find((size) => size.slug === variant.size),
    slug: variant.variantSlug,
    stock: variant.stock,
    image: typeof variant.image !== "string" ? variant.image : null,
    pricing: variant.pricing,
  }));

  const t = useTranslations("ProductDetails");

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <ProductProvider filledVariants={filledVariants}>
            <ProductGallery
              product={product}
              tabs={product.images.map(
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
            >
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
            </ProductGallery>

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.title}</h1>

              <div className="mt-3">
                <h2 className="sr-only">{t("product-info")}</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  <PriceWithContext product={product} />
                </p>
              </div>

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

              <ProductForm product={product} filledVariants={filledVariants} />

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
          </ProductProvider>
        </div>
      </div>
    </div>
  );
};
