"use client";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import type { Header } from "@/payload-types";

import { Logo } from "@/components/Logo/Logo";
import { HeaderNav } from "./Nav";
import { cn } from "@/utilities/cn";
import Image from "next/image";

interface HeaderClientProps {
  data: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  useEffect(() => {
    setHeaderTheme(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme]);

  return (
    <header
      className={cn(
        "container relative z-20",
        { ...(theme ? { "data-theme": theme } : {}) },
        data.sticky && `sticky top-0`,
      )}
    >
      <div className="flex justify-between py-8">
        <Link href="/">
          {data.logo && typeof data.logo !== "string" && data.logo.url && data.logo.alt ? (
            <Image
              src={data.logo.url}
              alt={data.logo.alt}
              width={data.logo.width ?? 256}
              height={data.logo.height ?? 256}
            />
          ) : (
            <Logo />
          )}
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  );
};
