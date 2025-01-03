"use client";
import { cn } from "@/utilities/cn";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProps,
} from "@/components/ui/carousel";
import AutoplayPlugin from "embla-carousel-autoplay";
import AutoScrollPlugin from "embla-carousel-auto-scroll";

import type { CarouselBlock as CarouselBlockProps } from "@/payload-types";
import {
  spacingTopClasses,
  spacingBottomClasses,
  paddingTopClasses,
  paddingBottomClasses,
} from "@/blocks/globals";
import Image from "next/image";
import Link from "next/link";
import RichText from "@/components/RichText";

export const CarouselBlock: React.FC<CarouselBlockProps> = ({
  type,
  slides,
  autoplay,
  spacingBottom,
  spacingTop,
  paddingBottom,
  paddingTop,
  title,
}) => {
  const plugins = {
    logo: [
      AutoScrollPlugin({
        speed: 3,
      }),
    ],
    default: [
      ...(autoplay && autoplay !== 0
        ? [
            AutoplayPlugin({
              delay: autoplay,
            }),
          ]
        : []),
    ],
  };

  const options: { [key: string]: Partial<CarouselProps["opts"]> } = {
    logo: {
      loop: true,
      watchDrag: false,
    },
    default: {
      loop: true,
    },
  };

  return (
    <section
      className={cn(
        "container",
        spacingTopClasses[spacingTop || "medium"],
        spacingBottomClasses[spacingBottom || "medium"],
        paddingTopClasses[paddingTop || "medium"],
        paddingBottomClasses[paddingBottom || "medium"],
      )}
    >
      {title && <RichText data={title} className="mb-6" />}
      <Carousel opts={options[type]} plugins={plugins[type]}>
        <CarouselContent>
          {slides?.map((slide) => (
            <CarouselItem
              key={slide.id}
              className={cn("basis-full md:basis-[50%] lg:basis-[33.33%] 2xl:basis-[25%]")}
            >
              {typeof slide.image !== "string" && slide.image.url && (
                <>
                  {slide.link &&
                  (slide.link.url ||
                    (typeof slide.link.reference?.value !== "string" && slide.link.reference?.value.slug)) ? (
                    <Link
                      // @ts-ignore - reference.value is not a string! TypeScript doesn't know that, it was checked above
                      href={slide.link.url || `/${slide.link.reference?.value.slug}`}
                      target={slide.link.newTab ? "_blank" : "_self"}
                    >
                      <Image
                        src={slide.image.url}
                        width={slide.image.width || 256}
                        height={slide.image.height || 256}
                        alt={slide.image.alt}
                      />
                    </Link>
                  ) : (
                    <Image
                      src={slide.image.url}
                      width={slide.image.width || 256}
                      height={slide.image.height || 256}
                      alt={slide.image.alt}
                    />
                  )}
                </>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        {type === "default" && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </section>
  );
};
