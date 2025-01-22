"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { InPostGeowidget } from "@/components/(ecommerce)/InPostGeowidget";
import { CheckoutFormData } from "@/schemas/checkoutForm.schema";
import { useFormContext, useWatch } from "react-hook-form";
import { PriceClient } from "@/components/(ecommerce)/PriceClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const DeliveryMethod = ({
  title,
  turnaround,
  pricing,
  variant,
  geowidgetToken,
}: {
  title: string;
  turnaround: string;
  pricing?: {
    value: number;
    currency: string;
    id?: string | null;
  }[];
  variant: string;
  geowidgetToken?: string;
}) => {
  let Logo: ReactNode;
  let Additional: ReactNode;
  const t = useTranslations("DeliveryMethods");
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useFormContext<CheckoutFormData>();

  switch (variant) {
    case "inpost-pickup":
      Logo = (
        <Image
          src="/paczkomat.png"
          alt={t("inpost-pickup")}
          width={359}
          height={277}
          className="block aspect-[31/24] max-h-12 w-fit"
        />
      );
      break;
    case "inpost-courier":
      Logo = (
        <Image
          src="/inpost_courier.png"
          alt={t("inpost-courier")}
          width={359}
          height={277}
          className="block aspect-[31/24] max-h-12 w-fit"
        />
      );
      break;
    default:
      Logo = null;
  }

  const pickupPointID = useWatch({ control: form.control, name: "shipping.pickupPointID" });
  const pickupPointAddress = useWatch({ control: form.control, name: "shipping.pickupPointAddress" });
  const deliveryMethod = useWatch({ control: form.control, name: "deliveryMethod" });

  const onPointSelect = (event: CustomEvent) => {
    form.setValue("shipping.pickupPointID", event.detail.name);
    form.setValue(
      "shipping.pickupPointAddress",
      `${event.detail.address_details.street ?? ""} ${event.detail.address_details.building_number ?? ""}${event.detail.address_details.building_number || event.detail.address_details.street ? ", " : ""}${event.detail.address_details.post_code} ${event.detail.address_details.city}`,
    );
    setDialogOpen(false);
  };

  switch (variant) {
    case "inpost-pickup":
      Additional = deliveryMethod === variant && (
        <div className="mt-2 flex flex-row-reverse">
          <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
            <DialogTrigger asChild>
              <Button type="button" variant="tailwind" className="ml-auto w-fit">
                {t("choose-pickup")}
              </Button>
            </DialogTrigger>
            <DialogContent className="flex h-[75dvh] w-[95vw] max-w-none flex-col sm:w-[80vw]">
              <DialogHeader>
                <DialogTitle>
                  <h3 className="text-lg font-semibold leading-none tracking-tight">{t("choose-pickup")}</h3>
                </DialogTitle>
              </DialogHeader>
              <InPostGeowidget token={geowidgetToken} onPointSelect={onPointSelect} />
            </DialogContent>
          </Dialog>

          {pickupPointID && (
            <p className="mr-auto flex items-center text-sm">
              {pickupPointID}, {pickupPointAddress}
            </p>
          )}
        </div>
      );
      break;
    default:
      Additional = null;
  }

  return (
    <div className="ml-3 flex flex-1 flex-col">
      <span className="flex flex-1 items-center gap-3">
        {Logo}
        <div>
          <span className="block text-sm font-medium text-gray-900">{title}</span>
          <span className="block items-center text-sm text-gray-500">{turnaround}</span>
        </div>
        <span className="ml-auto text-right text-sm font-medium text-gray-900">
          <PriceClient pricing={pricing ?? []} />
        </span>
      </span>
      {Additional}
    </div>
  );
};
