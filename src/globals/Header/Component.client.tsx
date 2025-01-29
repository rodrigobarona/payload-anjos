"use client";

import { type ReactNode } from "react";

import { useTheme } from "@/providers/Theme";

import { DefaultHeader } from "./variants/DefaultHeader";
import { FloatingHeader } from "./variants/FloatingHeader";

import type { Header } from "@/payload-types";



type HeaderClientProps = {
  data: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
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
