"use client";
import { useEffect, useState } from "react";
// import MenuButton from "@/ui/atoms/menuButton";
// import LinkButton from "@/ui/atoms/linkButton";
import Image from "next/image";
// import NavbarList from "../components/navbarList";

import Link from "next/link";
import { cn } from "@/utilities/cn";
import { CMSLink } from "@/components/Link";
import { HeaderNav } from "../Nav";
import type { Header } from "@/payload-types";
import { Logo } from "@/components/Logo/Logo";

export const FloatingHeader = ({ data, theme }: { data: Header; theme: string | null }) => {
  const [isMenuOpened, setisMenuOpened] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const [scrollDown, setScrollDown] = useState(false);

  const toggleMenu = () => {
    setisMenuOpened((menuState) => !menuState);
    document.body.classList.toggle("overflow-hidden");
  };

  useEffect(() => {
    let lastScrollValue = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > lastScrollValue && scrollTop > 300) {
        setScrollDown(true);
      } else if (scrollTop < lastScrollValue) {
        setScrollDown(false);
      }

      setScrollValue(scrollTop);
      lastScrollValue = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const classes = cn(
    `fixed left-1/2 flex w-screen -translate-x-1/2 justify-center md:px-12 z-10 transition-transform`,
    `${scrollValue > 0 && !isMenuOpened ? "md:translate-y-6" : ""}`,
    `${scrollDown ? "-translate-y-full md:-translate-y-full" : ""}`,
    { ...(theme ? { "data-theme": theme } : {}) },
  );

  return (
    <header className={classes}>
      <div className={`header ${scrollValue > 0 ? "scrolled" : ""} ${isMenuOpened ? "opened" : ""} `}>
        <Link href="/" className="mr-auto">
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
        {/* <MenuButton onClick={toggleMenu} isMenuOpened={isMenuOpened} /> */}
        <nav
          className={`absolute left-1/2 top-0 -z-10 flex origin-bottom transition-opacity duration-300 ${isMenuOpened ? "opacity-100" : "scale-y-0 opacity-0"} h-dvh w-screen -translate-x-1/2 flex-col items-start justify-between bg-white p-8 pb-16 md:p-12 lg:static lg:h-auto lg:w-fit lg:translate-x-0 lg:scale-100 lg:flex-row lg:bg-transparent lg:p-0 lg:opacity-100`}
        >
          <HeaderNav data={data} />
        </nav>
        <CMSLink className="ml-auto hidden md:flex" />
        <div className="backdrop_blur absolute left-1/2 -z-30 h-full w-full -translate-x-1/2" />
      </div>
    </header>
  );
};
