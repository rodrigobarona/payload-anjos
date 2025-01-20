"use client";

import { cn } from "@/utilities/cn";
import { useLocale } from "next-intl";
import { memo, useEffect } from "react";

export const InPostGeowidget = memo(
  ({
    token,
    setPickupPoint,
    className,
  }: {
    token?: string;
    setPickupPoint: (event: CustomEvent) => void;
    className?: string;
  }) => {
    const locale = useLocale();

    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://sandbox-easy-geowidget-sdk.easypack24.net/inpost-geowidget.js";
      script.defer = true;
      document.head.append(script);

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://sandbox-easy-geowidget-sdk.easypack24.net/inpost-geowidget.css";
      document.head.append(link);

      return () => {
        document.head.removeChild(script);
        document.head.removeChild(link);
      };
    }, []);

    const handleMapEvent = (event: CustomEvent) => {
      console.log(event.detail);
      setPickupPoint(event);
    };

    useEffect(() => {
      document.addEventListener("onpointselect", handleMapEvent);

      return () => {
        document.removeEventListener("onpointselect", handleMapEvent);
      };
    }, []);

    return (
      // @ts-expect-error - inpost-geowidget is not a valid HTML element, but it will be rendered by the script
      <inpost-geowidget
        className={cn("flex-1", className)}
        onpoint="onpointselect"
        token={token}
        language={["pl", "en", "uk"].includes(locale) ? locale : "en"}
        config="parcelCollect"
      />
    );
  },
);
