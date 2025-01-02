import { getCachedGlobal } from "@/utils/payload/getGlobals";
import Link from "next/link";
import React from "react";

import type { Footer } from "@/payload-types";

import { ThemeSelector } from "@/providers/Theme/ThemeSelector";
import { CMSLink } from "@/components/payload/CMSLink";
import { Logo } from "@/components/payload/Logo";

export async function Footer() {
  const footerData: Footer = await getCachedGlobal("footer", 1)();

  const navItems = footerData?.navItems || [];

  return (
    <footer className="mt-auto border-t border-border bg-black text-white dark:bg-card">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col gap-4 md:flex-row">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />;
            })}
          </nav>
        </div>
      </div>
    </footer>
  );
}
