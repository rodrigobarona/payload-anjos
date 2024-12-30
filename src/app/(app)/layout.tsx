import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PayloadCMS Boilerplate",
  description: "PayloadCMS Boilerplate",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="twp">{children}</body>
    </html>
  );
}
