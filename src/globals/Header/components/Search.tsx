"use client";
import axios from "axios";
import debounce from "lodash.debounce";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { type Where } from "payload";
import { stringify } from "qs-esm";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { PriceClient } from "@/components/(ecommerce)/PriceClient";
import { Media } from "@/components/Media";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSearchInput,
  CommandSeparator,
} from "@/components/ui/command";
import { type Locale } from "@/i18n/config";
import { useRouter, usePathname, Link } from "@/i18n/routing";
import { type ProductCategory, type Product } from "@/payload-types";

export const Search = () => {
  const t = useTranslations("Search");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as Locale;
  const [resultProducts, setResultProducts] = useState<Product[]>([]);
  const [resultCategories, setResultCategories] = useState<ProductCategory[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = () => {
    setIsOpen(false);
  };

  const fetchProductsAndCategories = debounce(async (value: string) => {
    try {
      const where: Where = {
        or: [
          {
            title: {
              contains: value,
            },
          },
          {
            slug: {
              contains: value,
            },
          },
        ],
      };

      const stringifiedQuery = stringify(
        {
          where,
        },
        { addQueryPrefix: true },
      );

      const { data: productData } = await axios.get<{ docs: Product[] }>(
        `/api/products${stringifiedQuery}&locale=${locale}&limit=5`,
        {
          withCredentials: true,
        },
      );

      const { data: categoriesData } = await axios.get<{ docs: ProductCategory[] }>(
        `/api/productCategories${stringifiedQuery}&locale=${locale}&limit=5`,
        {
          withCredentials: true,
        },
      );

      const products = productData.docs;
      const categories = categoriesData.docs;

      setResultProducts(products);
      setResultCategories(categories);
      console.log(products, categories);
    } catch (error) {
      console.log(error);
    }
  }, 300);

  useEffect(() => {
    void fetchProductsAndCategories("");
  }, [pathname, fetchProductsAndCategories, router, searchParams]);

  const handleSearchChange = async (value: string) => {
    if (pathname === "/search") {
      const params = new URLSearchParams(searchParams);
      params.set("search", value);
      router.push(`?${params.toString()}`);
      setSearchValue(value);
      return;
    }
    setSearchValue(value);
    await fetchProductsAndCategories(value);
  };

  return (
    <Command
      ref={searchRef}
      className="group absolute left-1/2 top-full h-fit w-screen max-w-[550px] -translate-x-1/2 overflow-visible border-b-0 px-4 shadow-md lg:top-1/2 lg:w-fit lg:min-w-[450px] lg:-translate-y-1/2 lg:rounded-lg lg:px-0 xl:w-1/2"
    >
      <CommandSearchInput
        onFocus={() => setIsOpen(true)}
        onValueChange={handleSearchChange}
        value={searchValue}
        searchValue={searchValue}
        placeholder={t("search")}
        className="h-fit border-b-0 py-2"
      />
      <CommandList
        className={twMerge(
          "absolute left-0 top-full h-fit max-h-[650px] w-full -translate-y-[4px] rounded-b-lg bg-white px-4 shadow-lg lg:px-0",
          isOpen ? "block" : "hidden",
        )}
      >
        <CommandEmpty>{t("no-results")}</CommandEmpty>
        <CommandGroup heading={t("products")}>
          {resultProducts.map((product) => (
            <CommandItem asChild className="cursor-pointer" key={product.id}>
              <Link
                onClick={handleItemClick}
                className="flex items-center gap-3"
                href={`/product/${product.slug}`}
              >
                <Media className="h-16 w-16" resource={product.images[0]} />
                <p className="mr-auto">{product.title}</p>
                <PriceClient pricing={product.pricing ?? []} />
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t("categories")}>
          {resultCategories.map((category) => (
            <CommandItem asChild className="cursor-pointer" key={category.id}>
              <Link onClick={handleItemClick} href={`/category/${category.slug}`}>
                {category.title}
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
