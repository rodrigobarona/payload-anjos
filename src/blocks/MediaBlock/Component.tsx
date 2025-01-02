import type { StaticImageData } from "next/image";

import { cn } from "@/utils/cn";
import React from "react";
import RichText from "@/components/payload/richText";

import type { MediaBlock as MediaBlockProps } from "@/payload-types";

import { Media } from "@/components/payload/Media";
import { spacingTopClasses, spacingBottomClasses } from "../globals";

type Props = MediaBlockProps & {
  breakout?: boolean;
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  imgClassName?: string;
  staticImage?: StaticImageData;
  disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props;

  let caption;
  if (media && typeof media === "object") caption = media.caption;

  return (
    <div
      className={cn(
        "",
        {
          container: enableGutter,
        },
        className,
        spacingTopClasses[props["spacingTop"] || "medium"],
        spacingBottomClasses[props["spacingBottom"] || "medium"],
      )}
    >
      <Media
        imgClassName={cn("border border-border rounded-[0.8rem]", imgClassName)}
        resource={media}
        src={staticImage}
      />
      {caption && (
        <div
          className={cn(
            "mt-6",
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  );
};
