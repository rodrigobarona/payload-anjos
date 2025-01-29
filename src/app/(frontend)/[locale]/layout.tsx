// eslint-disable-next-line
import { GeistMono } from "geist/font/mono";
// eslint-disable-next-line
import { GeistSans } from "geist/font/sans";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import React from "react";

import "./globals.css";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { Footer } from "@/globals/Footer/Component";
import { Header } from "@/globals/Header/Component";
import { type Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { Providers } from "@/providers";
import { InitTheme } from "@/providers/Theme/InitTheme";
import { getServerSideURL } from "@/utilities/getURL";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { cn } from "src/utilities/cn";

import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, "twp")}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="max-w-screen overflow-x-clip lg:overflow-y-auto">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            {/* <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            /> */}
            {isEnabled && <LivePreviewListener />}

            <Header />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: "summary_large_image",
    creator: "@payloadcms",
  },
};
