"use client";
import { Button } from "@/components/ui/button";
import { Customer } from "@/payload-types";
import { cn } from "@/utilities/cn";
import { useState } from "react";
import { AddNewAddressDialog } from "../../Checkout/variants/OneStepWithSummary/components/AddNewAddressDialog";
import { Country } from "@/globals/(ecommerce)/Couriers/utils/countryList";
import axios from "axios";
import { useTranslations } from "next-intl";

export const OrdersData = ({ user }: { user: Customer }) => {
  const [selectedShipping, setSelectedShipping] = useState(
    user?.shippings?.find((shipping) => shipping.default) || user?.shippings?.[0],
  );
  const [shippings, setShippings] = useState(user.shippings || []);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);

  const t = useTranslations("Account.orders-data");

  const setDefaultAddress = async () => {
    if (selectedShipping && user.shippings) {
      const updatedShippings = user.shippings.map((shipping) => {
        return {
          ...shipping,
          default: shipping.id === selectedShipping.id,
        };
      });

      try {
        const { data } = await axios.patch<{ doc: Customer }>(`/api/customers/${user?.id}`, {
          shippings: updatedShippings,
        });
        console.log(data);
        if (data && data.doc.shippings) {
          setShippings(data.doc.shippings);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section className="no-prose">
      <AddNewAddressDialog
        open={addressDialogOpen}
        setOpen={setAddressDialogOpen}
        user={user}
        setShipping={(shipping) => {
          setShippings((prevState) => [
            ...prevState,
            {
              ...shipping,
              country: shipping.country as Country,
            },
          ]);
        }}
      />
      <h2 className="mb-8 text-xl font-bold">{t("title")}</h2>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {shippings
          .sort((a, b) => {
            if (a.default === b.default) return 0;
            return a.default ? -1 : 1;
          })
          .map((shipping) => (
            <div
              onClick={() => {
                setSelectedShipping({
                  ...shipping,
                  id: shipping.id ? shipping.id : undefined,
                });
              }}
              key={shipping.id}
              className={cn(
                "group relative flex cursor-pointer rounded-lg border border-gray-300 border-transparent bg-white p-4 shadow-sm ring-2 ring-gray-200 focus:outline-none",
                shipping.id === selectedShipping?.id && "ring-main-500",
              )}
            >
              <span className="flex flex-1">
                <span className="flex w-full flex-col">
                  <span className="block text-left text-sm font-medium text-gray-900">{shipping.name}</span>
                  <span className="mt-1 flex items-center text-sm text-gray-500">{shipping.address}</span>
                  <span className="mt-1 text-left text-sm font-medium text-gray-500">
                    {shipping.postalCode}, {shipping.city}, {shipping.country}
                  </span>
                  <span className="mt-1 flex items-center text-sm text-gray-500">{shipping.phone}</span>
                  <span className="mt-1 flex items-center text-sm text-gray-500">{shipping.email}</span>
                </span>
              </span>
            </div>
          ))}
      </div>
      <div className="mt-6 flex flex-col gap-6 md:flex-row">
        <Button variant="tailwindOutline" onClick={() => setAddressDialogOpen(true)}>
          {t("add-new")}
        </Button>
        <Button variant="tailwind" onClick={setDefaultAddress}>
          {t("set-as-default")}
        </Button>
      </div>
    </section>
  );
};
