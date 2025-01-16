"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ReactNode, useEffect, useState } from "react";
import { useProductContext } from "../stores/ProductContext";
import { Product } from "@/payload-types";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const ProductGallery = ({
  product,
  tabs,
  children,
}: {
  product: Product;
  tabs: ReactNode;
  children: ReactNode;
}) => {
  const { quantity, selectedVariant, setSelectedVariant, setQuantity } = useProductContext();
  const [selectedTab, setSelectedTab] = useState(0);

  const maxQuantity = selectedVariant?.stock ?? product.stock ?? 999;
  const minQuantity = 1;

  useEffect(() => {
    setSelectedTab(0);
    if (quantity > maxQuantity) {
      setQuantity(maxQuantity);
    }
    if (quantity < minQuantity) {
      setQuantity(minQuantity);
    }
  }, [selectedVariant, minQuantity, maxQuantity]);

  return (
    <TabGroup
      defaultIndex={0}
      selectedIndex={selectedTab}
      onChange={(index) => {
        setSelectedTab(index);
      }}
      className="flex flex-col-reverse"
    >
      {/* Image selector - client */}
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-6">
          {/* This has to be on client and recieve state */}
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
          {children}
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
        {tabs}
      </TabPanels>
    </TabGroup>
  );
};
