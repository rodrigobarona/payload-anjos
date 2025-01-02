"use client";
import { cn } from "@/utils/cn";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoplayPlugin from "embla-carousel-autoplay";

import type { CarouselBlock as CarouselBlockProps } from "@/payload-types";
import { spacingTopClasses, spacingBottomClasses } from "../globals";
import Image from "next/image";
import Link from "next/link";

export const CarouselBlock: React.FC<CarouselBlockProps> = ({
  slides,
  autoplay,
  spacingBottom,
  spacingTop,
}) => {
  return (
    <section
      className={cn(
        "container",
        spacingTopClasses[spacingTop || "medium"],
        spacingBottomClasses[spacingBottom || "medium"],
      )}
    >
      <Carousel
        plugins={
          autoplay
            ? [
                AutoplayPlugin({
                  delay: 5000, // TODO: make this configurable
                }),
              ]
            : []
        }
      >
        <CarouselContent>
          {slides?.map((slide) => (
            <CarouselItem
              key={slide.id}
              className="basis-full md:basis-[50%] lg:basis-[33.33%] 2xl:basis-[25%]"
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
