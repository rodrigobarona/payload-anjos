import "./globals.css";

import type { Metadata } from "next";
import { Providers } from "@/providers";
import { Header } from "@/components/payload/Header/Component";
import { Footer } from "@/components/payload/Footer/Component";
import { InitTheme } from "@/providers/Theme/InitTheme";

export const metadata: Metadata = {
  title: "PayloadCMS Boilerplate",
  description: "PayloadCMS Boilerplate",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <InitTheme />
      </head>
      <body className="twp">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
