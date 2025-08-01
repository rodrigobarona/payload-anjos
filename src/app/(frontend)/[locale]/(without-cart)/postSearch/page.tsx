import { setRequestLocale } from "next-intl/server";
import { getPayload } from "payload";
import React from "react";

import { type CardPostData } from "@/components/Card";
import { CollectionArchive } from "@/components/CollectionArchive";
import { Search } from "@/components/search/Component";
import { type Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import config from "@payload-config";

import PageClient from "./page.client";

import type { Metadata } from "next/types";

// Search pages are inherently dynamic due to search parameters
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Args = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q: string;
  }>;
};

export default async function Page({ params, searchParams: searchParamsPromise }: Args) {
  const { locale } = await params;
  const { q: query } = await searchParamsPromise;

  // Enable static rendering
  setRequestLocale(locale);

  console.log(query);
  const payload = await getPayload({ config });

  const posts = await payload.find({
    collection: "search",
    depth: 1,
    limit: 12,
    locale: locale as Locale,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                "meta.description": {
                  like: query,
                },
              },
              {
                "meta.title": {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  });

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Search</h1>

          <div className="mx-auto max-w-200">
            <Search />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs as CardPostData[]} />
      ) : (
        <div className="container">No results found.</div>
      )}
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Ecommerce Template Search`,
  };
}
