import { cn } from "@/utilities/cn";
import React from "react";
import RichText from "@/components/RichText";

import type { ContentBlock as ContentBlockProps } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import {
  spacingTopClasses,
  spacingBottomClasses,
  getCenteringClasses,
  paddingBottomClasses,
  paddingTopClasses,
} from "@/blocks/globals";

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props;

  const colsSpanClasses = {
    oneSixth: "2",
    oneThird: "4",
    half: "6",
    twoThirds: "8",
    fiveSixth: "10",
    full: "12",
  };

  const isSingleRadius = !props.specifiedRadius && props.radius && props.radiusAll;
  const isMultiRadius = props.specifiedRadius && props.radius && !isSingleRadius;

  const backgroundStyle =
    props.background && props.alignment && props.alignment !== "center"
      ? { background: props.background }
      : {};

  return (
    <section
      className={cn(
        "container relative px-0",
        spacingTopClasses[props["spacingTop"] || "medium"],
        spacingBottomClasses[props["spacingBottom"] || "medium"],
        paddingTopClasses[props["paddingTop"] || "medium"],
        paddingBottomClasses[props["paddingBottom"] || "medium"],
        getCenteringClasses(props.alignment || undefined),
        isSingleRadius && props.radiusAll,
        isMultiRadius &&
          `${props.radiusTopLeft} ${props.radiusTopRight} ${props.radiusBottomRight} ${props.radiusBottomLeft}`,
      )}
      style={{
        ...backgroundStyle,
      }}
    >
      {(!props.alignment || props.alignment === null || props.alignment === "center") && (
        <div
          style={props.background ? { background: props.background } : {}}
          className="absolute left-1/2 top-1/2 -z-10 h-full w-screen -translate-x-1/2 -translate-y-1/2"
        />
      )}
      <div className="grid grid-cols-4 gap-y-8 lg:grid-cols-12">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size, enableProse } = col;

            return (
              <div
                className={cn(
                  `col-span-4 px-8 lg:col-span-${colsSpanClasses[size!]}`,
                  {
                    "md:col-span-2": size !== "full",
                  },
                  props.alignment !== "center" ? "lg:first:pl-0 lg:last:pr-0" : "",
                  paddingTopClasses[col["paddingTop"] || "medium"],
                  paddingBottomClasses[col["paddingBottom"] || "medium"],
                )}
                style={col.background ? { background: col.background } : {}}
                key={index}
              >
                {richText && <RichText data={richText} enableProse={enableProse ?? false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            );
          })}
      </div>
    </section>
  );
};
