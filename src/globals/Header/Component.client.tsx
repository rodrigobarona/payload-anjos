"use client";

import { ReactNode } from "react";

import type { Header } from "@/payload-types";

import { DefaultHeader } from "./variants/DefaultHeader";
import { FloatingHeader } from "./variants/FloatingHeader";
import { useTheme } from "@/providers/Theme";

interface HeaderClientProps {
  data: Header;
}

export const HeaderClient = ({ data }: HeaderClientProps) => {
  const { theme } = useTheme();

  let header: ReactNode = null;

  switch (data.type) {
    case "default":
      header = <DefaultHeader data={data} theme={theme?.toString() ?? null} />;
      break;
    case "floating":
      header = <FloatingHeader data={data} theme={theme?.toString() ?? null} />;
      break;
    default:
      header = <DefaultHeader data={data} theme={theme?.toString() ?? null} />;
      break;
  }

  return header;
};
