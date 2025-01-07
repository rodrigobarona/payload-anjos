"use client";
import { Logo } from "@/components/Logo/Logo";
import { Header } from "@/payload-types";
import { cn } from "@/utilities/cn";
import Image from "next/image";
import Link from "next/link";
import { CMSLink } from "@/components/Link";

export const DefaultHeader = ({ data, theme }: { data: Header; theme: string | null }) => {
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
        <nav className="flex items-center gap-3">
          {data.navItems &&
            data.navItems.map(({ link }, i) => {
              return <CMSLink key={i} {...link} appearance="link" className="text-black lg:text-white" />;
            })}
        </nav>
      </div>
    </header>
  );
};
