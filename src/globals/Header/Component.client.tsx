"use client";

import { ReactNode } from "react";

import type { Header } from "@/payload-types";

import { DefaultHeader } from "./variants/DefaultHeader";
import { FloatingHeader } from "./variants/FloatingHeader";

interface HeaderClientProps {
  data: Header;
  disableCart?: boolean;
}

export const HeaderClient = ({ data, disableCart }: HeaderClientProps) => {
  let header: ReactNode = null;

  switch (data.type) {
    case "default":
      header = <DefaultHeader disableCart={disableCart} data={data} />;
      break;
    case "floating":
      header = <FloatingHeader data={data} />;
      break;
    default:
      header = <DefaultHeader disableCart={disableCart} data={data} />;
      break;
  }

  return header;
};
