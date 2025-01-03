"use client";
import { cn } from "@/utilities/cn";
import React from "react";


import type { AccordionBlock as AccordionBlockProps } from "@/payload-types";
import { spacingTopClasses, spacingBottomClasses } from "@/blocks/globals";

import RichText from "@/components/RichText";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const AccordionBlock = ({
  spacingBottom,
  spacingTop,
  title,
  items,
}: AccordionBlockProps) => {
  return (
    <section
      className={cn(
        "container",
        spacingTopClasses[spacingTop || "medium"],
        spacingBottomClasses[spacingBottom || "medium"],
      )}
    >
      {title && <RichText data={title} className="mb-6" />}
      <Accordion type="single" collapsible>
        {items.map((item, index) => (
          <AccordionItem key={item.id ?? index} value={item.id ?? index.toString()}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
                <RichText data={item.content} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
