import { useCurrency } from "@/stores/Currency";
import { formatPrice } from "@/utilities/formatPrices";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { InPostGeowidget } from "@/components/(ecommerce)/InPostGeowidget";
import { CheckoutFormData } from "@/schemas/checkoutForm.schema";
import { useFormContext, useWatch } from "react-hook-form";
import { X } from "lucide-react";
import { cn } from "@/utilities/cn";

export const DeliveryMethod = ({
  title,
  turnaround,
  price,
  variant,
  geowidgetToken,
  ...props
}: {
  title: string;
  turnaround: string;

  price: number;
  variant: string;
  geowidgetToken?: string;
  [key: string]: any;
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
    default:
      Logo = <></>;
  }

  console.log(form.getValues());

  const pickupPointID = useWatch({ control: form.control, name: "shipping.pickupPointID" });
  const pickupPointAddress = useWatch({ control: form.control, name: "shipping.pickupPointAddress" });
  const deliveryMethod = useWatch({ control: form.control, name: "deliveryMethod" });

  switch (variant) {
    case "inpost-pickup":
      Additional = (
        <div className="mt-2 flex h-fit w-full flex-row-reverse">
          <Button
            type="button"
            onClick={() => setDialogOpen(true)}
            variant="tailwind"
            className="ml-auto w-fit"
            {...props}
          >
            {t("choose-pickup")}
          </Button>
          <div className={cn(dialogOpen ? "block" : "hidden")}>
            <div
              onClick={() => setDialogOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            ></div>
            <div className="fixed left-[50%] top-[50%] z-50 flex h-[60dvh] w-[80vw] translate-x-[-50%] translate-y-[-50%] flex-col gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
              <h3 className="text-lg font-semibold leading-none tracking-tight">{t("choose-pickup")}</h3>
              <InPostGeowidget
                token={geowidgetToken}
                setPickupPoint={(event) => {
                  form.setValue("shipping.pickupPointID", event.detail.name);
                  form.setValue(
                    "shipping.pickupPointAddress",
                    `${event.detail.address_details.street} ${event.detail.address_details.building_number}, ${event.detail.address_details.post_code} ${event.detail.address_details.city}`,
                  );
                  setDialogOpen(false);
                }}
              />
              <div
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                onClick={() => setDialogOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">{t("close")}</span>
              </div>
            </div>
          </div>
          {pickupPointID && (
            <p className="mr-auto flex items-center text-sm">
              {pickupPointID}, {pickupPointAddress}
            </p>
          )}
        </div>
      );
      break;
    default:
      Additional = <></>;
  }

  const locale = useLocale();
  const { currency } = useCurrency();

  return (
    <div className="ml-3 flex flex-1 flex-col">
      <span className="flex flex-1 items-center gap-3">
        {Logo}
        <div>
          <span className="block text-sm font-medium text-gray-900">{title}</span>
          <span className="block items-center text-sm text-gray-500">{turnaround}</span>
        </div>
        <span className="ml-auto text-right text-sm font-medium text-gray-900">
          {formatPrice(price, currency, locale)}
        </span>
      </span>
      {deliveryMethod === variant && Additional}
    </div>
  );
};
