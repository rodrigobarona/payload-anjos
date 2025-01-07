"use client";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

import type { Header } from "@/payload-types";

import { DefaultHeader } from "./variants/DefaultHeader";
import { FloatingHeader } from "./variants/FloatingHeader";

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

  let header: ReactNode = null;

  switch (data.type) {
    case "default":
      header = <DefaultHeader data={data} theme={theme} />;
      break;
    case "floating":
      header = <FloatingHeader data={data} theme={theme} />;
      break;
    default:
      header = <DefaultHeader data={data} theme={theme} />;
      break;
  }

  return header;
};
